const axios = require('axios');
const pdf = require('pdf-parse');
const User = require('../models/User');
const AIRequest = require('../models/AIRequest');
const aiConfig = require('../config/ai');

// Generic function to call different AI services
const callAIService = async (service, tool, params) => {
  const startTime = Date.now();

  // If file is PDF, extract text first for better processing
  if (params.file && params.file.mimetype === 'application/pdf') {
    try {
      const data = await pdf(params.file.buffer);
      // Truncate to avoid token limits (approx 15k chars ≈ 4k tokens)
      params.extractedText = data.text.slice(0, 15000);
    } catch (err) {
      console.error('PDF parsing failed, falling back to raw buffer:', err);
    }
  }

  switch (service.name) {
    case 'OpenAI':
      return await callOpenAI(service, tool, params, startTime);
    case 'Gemini':
      return await callGemini(service, tool, params, startTime);
    case 'Grok':
      return await callGrok(service, tool, params, startTime);
    default:
      throw new Error(`Unsupported AI service: ${service.name}`);
  }
};

// Build prompt for each tool
const buildPrompt = (tool, params) => {
  const content = params.text || params.extractedText || '';

  switch (tool) {
    case 'summarize':
      if (params.type === 'presentation') {
        return `Transform the following content into a professional SLIDE-BY-SLIDE presentation outline.
        Structure it exactly for a 10-slide deck including:
        1. Title Slide (Team, Members, Contact, Problem)
        2. Problem Overview (Background, Significance, Impact)
        3. Pain Point Analysis (Detailed challenges)
        4. Proposed Solution (Innovative approach, Stack, Impact)
        5. Roadmap & Plan (Timeline, Milestones, Methodology)
        ...and other relevant slides based on the content.
        Maintain a high-fidelity, professional tone suitable for a hackathon pitch.
        
        Content:\n\n${content}`;
      }
      return `Transform the following content into a professional, high-fidelity ${params.length || 'medium'} synthesis. 
      If the content looks like a proposal, pitch deck, or academic paper, maintain a structured professional format (e.g., Executive Summary, Key Challenges, Proposed Strategy).
      Synthesis Type: ${params.type || 'General Intelligence'}
      
      Content:\n\n${content}`;
    case 'quiz':
      return `Generate exactly ${params.numQuestions} ${params.difficulty}-level multiple choice quiz questions from the following content. Return ONLY a valid JSON array with no extra text. Each item must have: "question" (string), "options" (array of 4 strings), "correctAnswer" (0-indexed number).\n\nContent:\n${content}`;
    case 'tutor':
      return `You are a helpful AI tutor. Answer the following question clearly and educationally:\n\nQuestion: ${params.question}\n\nContext: ${params.context || content || 'No additional context provided'}`;
    case 'study-planner':
      return `Create a detailed weekly study plan. Return ONLY a valid JSON object with no extra text. The object must have a "weeks" array where each week has "weekNumber", "focus", and "dailySchedule" (array of { "day", "subject", "duration", "topics" }).\n\nSubjects: ${Array.isArray(params.subjects) ? params.subjects.join(', ') : params.subjects}\nAvailable time: ${params.timeAvailable} hours per week\nGoals: ${params.goals || 'General mastery of subjects'}`;
    case 'flashcards':
      return `Generate exactly ${params.numCards} flashcards from the following content. Return ONLY a valid JSON array with no extra text. Each item must have "front" (question/term) and "back" (answer/definition).\n\nContent:\n${content}`;
    default:
      throw new Error(`Unsupported tool: ${tool}`);
  }
};

// Parse AI text response into structured data
const parseResponse = (tool, rawText) => {
  switch (tool) {
    case 'summarize':
      return { summary: rawText.trim() };
    case 'quiz': {
      try {
        const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return { questions: JSON.parse(cleaned) };
      } catch (e) {
        return { questions: [] };
      }
    }
    case 'tutor':
      return { answer: rawText.trim() };
    case 'study-planner': {
      try {
        const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return { plan: JSON.parse(cleaned) };
      } catch (e) {
        return { plan: rawText.trim() };
      }
    }
    case 'flashcards': {
      try {
        const cleaned = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        return { flashcards: JSON.parse(cleaned) };
      } catch (e) {
        return { flashcards: [] };
      }
    }
    default:
      return { content: rawText.trim() };
  }
};

// Call OpenAI API
const callOpenAI = async (service, tool, params, startTime) => {
  const prompt = buildPrompt(tool, params);
  const messages = [{ role: 'user', content: [{ type: 'text', text: prompt }] }];

  // Add image if provided
  if (params.file && params.file.mimetype.startsWith('image/')) {
    messages[0].content.push({
      type: 'image_url',
      image_url: { url: `data:${params.file.mimetype};base64,${params.file.buffer.toString('base64')}` }
    });
  }

  const response = await axios.post(
    `${service.baseUrl}/chat/completions`,
    {
      model: service.model,
      messages: messages,
      temperature: 0.7
    },
    {
      headers: {
        'Authorization': `Bearer ${service.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 60000
    }
  );

  const rawText = response.data.choices[0].message.content;
  const result = parseResponse(tool, rawText);

  return {
    ...result,
    tokensUsed: response.data.usage?.total_tokens || 0,
    processingTime: Date.now() - startTime
  };
};

// Call Gemini API
const callGemini = async (service, tool, params, startTime) => {
  const prompt = buildPrompt(tool, params);
  const parts = [{ text: prompt }];

  // Add file if provided (multimodal)
  if (params.file) {
    parts.push({
      inline_data: {
        mime_type: params.file.mimetype,
        data: params.file.buffer.toString('base64')
      }
    });
  }

  const response = await axios.post(
    `${service.baseUrl}/models/${service.model}:generateContent?key=${service.apiKey}`,
    {
      contents: [{ parts }],
      generationConfig: { temperature: 0.7 }
    },
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 60000
    }
  );

  if (!response.data.candidates || !response.data.candidates[0].content) {
    throw new Error('Gemini failed to generate content or content was blocked');
  }

  const rawText = response.data.candidates[0].content.parts[0].text;
  const result = parseResponse(tool, rawText);

  return {
    ...result,
    tokensUsed: response.data.usageMetadata?.totalTokenCount || 0,
    processingTime: Date.now() - startTime
  };
};

// Call Grok API (OpenAI-compatible)
const callGrok = async (service, tool, params, startTime) => {
  const prompt = buildPrompt(tool, params);

  const response = await axios.post(
    `${service.baseUrl}/chat/completions`,
    {
      model: service.model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    },
    {
      headers: {
        'Authorization': `Bearer ${service.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    }
  );

  const rawText = response.data.choices[0].message.content;
  const result = parseResponse(tool, rawText);

  return {
    ...result,
    tokensUsed: response.data.usage?.total_tokens || 0,
    processingTime: Date.now() - startTime
  };
};

// Helper: try all AI services with fallback
const tryAIServices = async (tool, params) => {
  const activeServices = aiConfig.getActiveServices();
  let lastError = null;

  for (let i = 0; i < activeServices.length; i++) {
    const service = activeServices[i];
    try {
      const result = await callAIService(service, tool, params);
      return { result, serviceName: service.name };
    } catch (err) {
      lastError = err;
      const isQuotaError = err.response && err.response.status === 429;
      const errorMsg = isQuotaError ? 'Quota Exceeded (429)' : err.message;
      console.log(`AI service ${service.name} failed: ${errorMsg}. Trying next...`);
    }
  }

  // Fallback to high-quality Mock Mode if enabled or as last resort for local dev
  if (process.env.NODE_ENV === 'development' || process.env.ENABLE_MOCK_AI === 'true') {
    console.log(`All AI services failed. Triggering "EduMind Neural Mock" fallback for tool: ${tool}`);
    const mockResult = getMockResponse(tool, params);
    return { result: mockResult, serviceName: 'EduMind-Mock' };
  }

  throw lastError || new Error('All AI services failed');
};

// Helper: get mock response with a bit more context awareness
const getMockResponse = (tool, params) => {
  const startTime = Date.now();
  let data = {};
  const inputSnippet = (params.text || params.extractedText || '').slice(0, 500);

  switch (tool) {
    case 'summarize':
      data = { summary: `[EDU-NEURAL SYNTHESIS - LOCALIZED FALLBACK]\n\nAnalysis of: "${inputSnippet}..."\n\nExecutive Overview:\nThe provided documentation outlines a strategic framework centered on ${inputSnippet.split(' ').slice(0, 5).join(' ')}. The primary objective appears to be the modernization of operational workflows through intelligent system integration.\n\nKey Strategic Pillars:\n1. Efficiency & Scalability: The system prioritizes high-throughput processing and elastic infrastructure.\n2. Integration Protocols: Emphasis is placed on seamless connectivity between disjointed modules.\n3. Implementation Roadmap: Requires a multi-phase roll-out involving research, design, and iterative validation.` };
      break;
    case 'quiz':
      data = {
        questions: [
          { question: "What is the primary objective based on the provided context?", options: ["Neural Integration", "Workflow Modernization", "Latency Reduction", "All of the above"], correctAnswer: 3 },
          { question: "Which protocol is emphasized for secure data flow?", options: ["Sovereignty Protocol", "Encryption Node", "Neural Buffer", "HTTP/2"], correctAnswer: 0 }
        ]
      };
      break;
    case 'flashcards':
      data = {
        flashcards: [
          { front: "Synthesis Objective", back: "Modernization of operational workflows through intelligent system integration." },
          { front: "Protocol 7", back: "The standard security layer for cross-module AI connectivity." }
        ]
      };
      break;
    case 'study-planner':
      data = { plan: { weeks: [{ weekNumber: 1, focus: "Foundational Concepts", dailySchedule: [{ day: "Monday", subject: "Core Theory", duration: "2h", topics: ["Introduction", "Syntax"] }] }] } };
      break;
    case 'tutor':
      data = { answer: "I am the EduMind localized tutor. Currently operating in fallback mode. Your inquiry regarding '" + (params.question || 'this topic') + "' highlights a critical area of the study material." };
      break;
  }

  return {
    ...data,
    tokensUsed: 0,
    processingTime: Date.now() - startTime
  };
};

// @desc    Get AI Request History
// @route   GET /api/ai/history
// @access  Private
exports.getAIHistory = async (req, res, next) => {
  try {
    const history = await AIRequest.find({
      user: req.user.id,
      success: true
    })
      .sort('-createdAt')
      .limit(20);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving history'
    });
  }
};

// @desc    Summarize text or file
// @route   POST /api/ai/summarize
// @access  Private/Guest
exports.summarizeText = async (req, res, next) => {
  try {
    const { text, type = 'general', length = 'medium' } = req.body;
    const file = req.file;

    if (!text && !file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text or upload a file to summarize'
      });
    }

    const { result, serviceName } = await tryAIServices('summarize', { text, type, length, file });

    // Log the request
    await AIRequest.create({
      user: req.user.id === 'guest' ? null : req.user.id,
      tool: 'summarizer',
      input: file ? `[File: ${file.originalname}] ${text || ''}` : text,
      output: result.summary,
      aiService: serviceName,
      tokensUsed: result.tokensUsed || 0,
      processingTime: result.processingTime || 0,
      success: true
    });

    // Track activity for logged-in users
    if (req.user.id !== 'guest') {
      const user = await User.findById(req.user.id);
      if (user) {
        await user.addActivity({
          type: 'ai_tool_used',
          title: 'AI Summarizer Used',
          description: `Summarized ${file ? 'document' : type + ' text'} (${length} length)`,
          timestamp: Date.now()
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        summary: result.summary,
        aiService: serviceName
      }
    });
  } catch (err) {
    try {
      await AIRequest.create({
        user: req.user.id === 'guest' ? null : req.user.id,
        tool: 'summarizer',
        input: req.file ? `[File: ${req.file.originalname}]` : req.body.text,
        aiService: 'unknown',
        success: false,
        error: err.message
      });
    } catch (logErr) {
      console.error('Failed to log AI request error:', logErr);
    }

    res.status(500).json({
      success: false,
      message: err.message.includes('No AI services') ? err.message : 'Server error generating summary'
    });
  }
};

// @desc    Generate quiz questions
// @route   POST /api/ai/generate-quiz
// @access  Private/Guest
exports.generateQuiz = async (req, res, next) => {
  try {
    const { text, numQuestions = 5, difficulty = 'medium' } = req.body;

    if (!text || text.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text to generate quiz from (minimum 10 characters)'
      });
    }

    const { result, serviceName } = await tryAIServices('quiz', { text, numQuestions, difficulty });

    await AIRequest.create({
      user: req.user.id === 'guest' ? null : req.user.id,
      tool: 'quiz-generator',
      input: text,
      output: JSON.stringify(result.questions),
      aiService: serviceName,
      tokensUsed: result.tokensUsed || 0,
      processingTime: result.processingTime || 0,
      success: true
    });

    if (req.user.id !== 'guest') {
      const user = await User.findById(req.user.id);
      if (user) {
        await user.addActivity({
          type: 'ai_tool_used',
          title: 'Quiz Generator Used',
          description: `Generated ${numQuestions} question quiz (${difficulty} difficulty)`,
          timestamp: Date.now()
        });
      }
    }

    res.status(200).json({
      success: true,
      data: {
        questions: result.questions,
        aiService: serviceName
      }
    });
  } catch (err) {
    try {
      await AIRequest.create({
        user: req.user.id === 'guest' ? null : req.user.id,
        tool: 'quiz-generator',
        input: req.body.text,
        aiService: 'unknown',
        success: false,
        error: err.message
      });
    } catch (logErr) {
      console.error('Failed to log AI request error:', logErr);
    }

    res.status(500).json({
      success: false,
      message: err.message.includes('No AI services') ? err.message : 'Server error generating quiz'
    });
  }
};

// @desc    AI Tutor (kept for route compatibility, but not exposed in frontend yet)
// @route   POST /api/ai/tutor
// @access  Private/Guest
exports.aiTutor = async (req, res, next) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a question for the AI tutor'
      });
    }

    const { result, serviceName } = await tryAIServices('tutor', { question, context });

    await AIRequest.create({
      user: req.user.id === 'guest' ? null : req.user.id,
      tool: 'tutor',
      input: question,
      output: result.answer,
      aiService: serviceName,
      tokensUsed: result.tokensUsed || 0,
      processingTime: result.processingTime || 0,
      success: true
    });

    res.status(200).json({
      success: true,
      data: {
        answer: result.answer,
        aiService: serviceName
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message.includes('No AI services') ? err.message : 'Server error during AI tutoring'
    });
  }
};

// @desc    Study Planner
// @route   POST /api/ai/study-planner
// @access  Private
exports.studyPlanner = async (req, res, next) => {
  try {
    const { subjects, timeAvailable, goals } = req.body;

    if (!subjects || !timeAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subjects and time available for study planning'
      });
    }

    const { result, serviceName } = await tryAIServices('study-planner', { subjects, timeAvailable, goals });

    await AIRequest.create({
      user: req.user.id,
      tool: 'study-planner',
      input: JSON.stringify({ subjects, timeAvailable, goals }),
      output: JSON.stringify(result.plan),
      aiService: serviceName,
      tokensUsed: result.tokensUsed || 0,
      processingTime: result.processingTime || 0,
      success: true
    });

    const user = await User.findById(req.user.id);
    if (user) {
      await user.addActivity({
        type: 'ai_tool_used',
        title: 'Study Planner Used',
        description: `Created study plan for: ${Array.isArray(subjects) ? subjects.join(', ') : subjects}`,
        timestamp: Date.now()
      });
    }

    res.status(200).json({
      success: true,
      data: {
        plan: result.plan,
        aiService: serviceName
      }
    });
  } catch (err) {
    try {
      await AIRequest.create({
        user: req.user.id,
        tool: 'study-planner',
        input: JSON.stringify(req.body),
        aiService: 'unknown',
        success: false,
        error: err.message
      });
    } catch (logErr) {
      console.error('Failed to log AI request error:', logErr);
    }

    res.status(500).json({
      success: false,
      message: err.message.includes('No AI services') ? err.message : 'Server error during study planning'
    });
  }
};

// @desc    Flashcard Generator
// @route   POST /api/ai/flashcards
// @access  Private
exports.generateFlashcards = async (req, res, next) => {
  try {
    const { text, numCards = 10 } = req.body;

    if (!text || text.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text to generate flashcards from (minimum 10 characters)'
      });
    }

    const { result, serviceName } = await tryAIServices('flashcards', { text, numCards });

    await AIRequest.create({
      user: req.user.id,
      tool: 'flashcard-generator',
      input: text,
      output: JSON.stringify(result.flashcards),
      aiService: serviceName,
      tokensUsed: result.tokensUsed || 0,
      processingTime: result.processingTime || 0,
      success: true
    });

    const user = await User.findById(req.user.id);
    if (user) {
      await user.addActivity({
        type: 'ai_tool_used',
        title: 'Flashcard Generator Used',
        description: `Generated ${numCards} flashcards`,
        timestamp: Date.now()
      });
    }

    res.status(200).json({
      success: true,
      data: {
        flashcards: result.flashcards,
        aiService: serviceName
      }
    });
  } catch (err) {
    try {
      await AIRequest.create({
        user: req.user.id,
        tool: 'flashcard-generator',
        input: req.body.text,
        aiService: 'unknown',
        success: false,
        error: err.message
      });
    } catch (logErr) {
      console.error('Failed to log AI request error:', logErr);
    }

    res.status(500).json({
      success: false,
      message: err.message.includes('No AI services') ? err.message : 'Server error during flashcard generation'
    });
  }
};