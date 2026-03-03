const axios = require('axios');
const pdf = require('pdf-parse');
const User = require('../models/User');
const Summary = require('../models/Summary');
const Quiz = require('../models/Quiz');
const Flashcard = require('../models/Flashcard');
const AIUsage = require('../models/AIUsage');
const UserActivity = require('../models/UserActivity');
const aiService = require('../services/aiService');
const logger = require('../utils/logger');
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
        Maintain a high-fidelity, professional tone suitable for a pitch or proposal.
        
        Content:\n\n${content}`;
      }
      if (params.type === 'academic') {
        return `Execute a high-fidelity academic synthesis of the following material. 
        Focus on: 
        - Primary Thesis/Thesis Statement
        - Methodological Approach
        - Critical Data Points & Evidence
        - Conclusions & Implications
        Maintain a formal, scholarly tone.
        
        Content:\n\n${content}`;
      }
      if (params.type === 'executive') {
        return `Produce an executive-level intelligence brief.
        Focus on:
        - High-level Strategic Impact
        - Key Decision Points
        - Resource Implications & ROI
        - Concise Action Items
        Use sharp, professional business language.
        
        Content:\n\n${content}`;
      }
      if (params.type === 'bullet-points') {
        return `Deconstruct the following content into a "Neural Hierarchy" (Structured Bullet Points).
        Use a logical hierarchy with indented supporting points. 
        Focus on structural clarity and info-density.
        
        Content:\n\n${content}`;
      }
      return `Transform the following content into a professional, high-fidelity ${params.length || 'medium'} synthesis. 
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
  const cleanText = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  // Non-JSON tools return direct text
  if (tool === 'summarize') return { summary: cleanText };
  if (tool === 'tutor') return { answer: cleanText };

  // JSON tools (quiz, flashcards, study-planner) need parsing
  try {
    try {
      const parsed = JSON.parse(cleanText);
      return tool === 'quiz' ? { questions: parsed } :
        tool === 'flashcards' ? { flashcards: parsed } :
          tool === 'study-planner' ? { plan: parsed } : { data: parsed };
    } catch (e) {
      // Fallback: Regex extract JSON array or object
      const jsonMatch = cleanText.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return tool === 'quiz' ? { questions: parsed } :
          tool === 'flashcards' ? { flashcards: parsed } :
            tool === 'study-planner' ? { plan: parsed } : { data: parsed };
      }
      throw e;
    }
  } catch (err) {
    console.error(`Failed to parse AI response for ${tool}:`, err);
    // Return empty structures instead of crashing for production stability
    return tool === 'quiz' ? { questions: [] } :
      tool === 'flashcards' ? { flashcards: [] } :
        { error: 'Malformed response', content: cleanText };
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
    const { tool } = req.query;
    const query = {
      user: req.user._id, // Use explicit _id for MongoDB reliability
      success: true
    };

    if (tool) {
      query.tool = tool;
    }

    const history = await AIRequest.find(query)
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

const { YoutubeTranscript } = require('youtube-transcript');

// Helper to extract YouTube ID from URL
const extractYoutubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// ... (existing code: callAIService, buildPrompt, parseResponse, callOpenAI, callGemini, callGrok, tryAIServices, getMockResponse - keeping for internal legacy/tools if needed, but primary is aiService)

// @desc    Summarize text, file, or YouTube video
// @route   POST /api/ai/summarize
// @access  Private/Guest
exports.summarizeText = async (req, res, next) => {
  try {
    const { text, type = 'general', length = 'medium', noteId, summarizeType, youtubeUrl } = req.body;
    const file = req.file;

    let contentToSummarize = text;
    let youtubeMetadata = null;

    // Handle YouTube Video Summarization
    if (summarizeType === 'YOUTUBE_VIDEO' || youtubeUrl) {
      if (!youtubeUrl) {
        return res.status(400).json({ success: false, message: 'Please provide a YouTube URL' });
      }

      const videoId = extractYoutubeId(youtubeUrl);
      if (!videoId) {
        return res.status(400).json({ success: false, message: 'Invalid YouTube URL' });
      }

      try {
        const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
        contentToSummarize = transcriptItems.map(item => item.text).join(' ');

        youtubeMetadata = {
          videoId,
          videoUrl: youtubeUrl,
          type: 'youtube'
        };
      } catch (err) {
        logger.error('YouTube Transcript Error: %s', err.message);
        return res.status(422).json({
          success: false,
          message: 'Could not fetch transcript for this video. Please ensure it has captions enabled.'
        });
      }
    }

    if (!contentToSummarize && !file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text, upload a file, or provide a YouTube URL'
      });
    }

    // Call Secure AI Service (Gemini via aiService)
    const aiResponse = await aiService.chatCompletion(
      req.user.id,
      'summarize',
      {
        model: 'gemini-1.5-flash',
        messages: [{ role: 'user', content: buildPrompt('summarize', { text: contentToSummarize, type, length, file }) }],
        temperature: 0.7
      }
    );

    const result = parseResponse('summarize', aiResponse.choices[0].message.content);

    // Persistent storage for logged-in users
    let savedSummary = null;
    if (req.user.id !== 'guest') {
      const summaryData = {
        user: req.user.id,
        title: youtubeMetadata ? `YouTube Summary: ${youtubeMetadata.videoId}` : `Summary of ${file ? file.originalname : (text ? text.slice(0, 30) + '...' : 'Content')}`,
        content: result.summary,
        source: {
          type: youtubeMetadata ? 'youtube' : (file ? 'file' : (noteId ? 'note' : 'text')),
          sourceId: noteId || null,
          model: (noteId || youtubeMetadata) ? 'StudyMaterial' : 'AIRequest',
          ...youtubeMetadata
        },
        metadata: {
          type,
          length,
          tokens: aiResponse.usage.total_tokens,
          provider: aiResponse.provider
        }
      };

      savedSummary = await Summary.create(summaryData);

      // Log Activity
      await UserActivity.create({
        userId: req.user.id,
        actionType: 'SUMMARY_CREATED',
        toolName: 'summarizer',
        sourceId: savedSummary._id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        metadata: { type, length, source: youtubeMetadata ? 'youtube' : 'text' }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        summary: result.summary,
        summaryId: savedSummary ? savedSummary._id : null
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Generate quiz questions
// @route   POST /api/ai/generate-quiz
// @access  Private/Guest
exports.generateQuiz = async (req, res, next) => {
  try {
    const { text, numQuestions = 5, difficulty = 'medium', sourceId, sourceType = 'text' } = req.body;

    if (!text || text.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text to generate quiz from (minimum 10 characters)'
      });
    }

    // Call Secure AI Service (Gemini via aiService)
    const aiResponse = await aiService.chatCompletion(
      req.user.id,
      'generate-quiz',
      {
        model: 'gemini-1.5-flash',
        messages: [{ role: 'user', content: buildPrompt('quiz', { text, numQuestions, difficulty }) }],
        temperature: 0.7
      }
    );

    const result = parseResponse('quiz', aiResponse.choices[0].message.content);

    // Persistent storage for logged-in users
    let savedQuiz = null;
    if (req.user.id !== 'guest') {
      savedQuiz = await Quiz.create({
        user: req.user.id,
        title: `Quiz on ${text.slice(0, 30)}...`,
        questions: result.questions,
        difficulty,
        source: {
          type: sourceType,
          sourceId: sourceId || null,
          model: sourceType === 'summary' ? 'Summary' : 'StudyMaterial'
        }
      });

      // Log Activity
      await UserActivity.create({
        userId: req.user.id,
        actionType: 'QUIZ_GENERATED',
        toolName: 'quiz_forge',
        sourceId: savedQuiz._id,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        metadata: { numQuestions, difficulty }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        questions: result.questions,
        quizId: savedQuiz ? savedQuiz._id : null
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    AI Tutor
// @route   POST /api/ai/tutor
// @access  Private/Guest
exports.aiTutor = async (req, res, next) => {
  try {
    const { question, context, sourceId } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a question for the AI tutor'
      });
    }

    const aiResponse = await aiService.chatCompletion(
      req.user.id,
      'tutor',
      {
        model: 'gemini-1.5-flash',
        messages: [{ role: 'user', content: buildPrompt('tutor', { question, context }) }],
        temperature: 0.7
      }
    );

    const result = parseResponse('tutor', aiResponse.choices[0].message.content);

    // Activity logging only for registered users
    if (req.user.id !== 'guest') {
      await UserActivity.create({
        userId: req.user.id,
        actionType: 'STUDY_SESSION_STARTED',
        toolName: 'ai_tutor',
        sourceId: sourceId || null,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        metadata: { question: question.slice(0, 50) }
      });
    }

    res.status(200).json({
      success: true,
      data: {
        answer: result.answer
      }
    });
  } catch (err) {
    next(err);
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

    // Call Secure AI Service (Gemini via aiService)
    const aiResponse = await aiService.chatCompletion(
      req.user.id,
      'study-planner',
      {
        model: 'gemini-1.5-flash',
        messages: [{ role: 'user', content: buildPrompt('study-planner', { subjects, timeAvailable, goals }) }],
        temperature: 0.7
      }
    );

    const result = parseResponse('study-planner', aiResponse.choices[0].message.content);

    // Activity logging
    await UserActivity.create({
      userId: req.user.id,
      actionType: 'STUDY_SESSION_STARTED',
      toolName: 'study_planner',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      metadata: { subjects, timeAvailable }
    });

    res.status(200).json({
      success: true,
      data: {
        plan: result.plan
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Flashcard Generator
// @route   POST /api/ai/flashcards
// @access  Private
exports.generateFlashcards = async (req, res, next) => {
  try {
    const { text, numCards = 10, sourceId, sourceType = 'text' } = req.body;

    if (!text || text.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide text to generate flashcards from (minimum 10 characters)'
      });
    }

    const aiResponse = await aiService.chatCompletion(
      req.user.id,
      'flashcards',
      {
        model: 'gemini-1.5-flash',
        messages: [{ role: 'user', content: buildPrompt('flashcards', { text, numCards }) }],
        temperature: 0.7
      }
    );

    const result = parseResponse('flashcards', aiResponse.choices[0].message.content);

    const savedDeck = await Flashcard.create({
      user: req.user.id,
      deckTitle: `Flashcards: ${text.slice(0, 30)}...`,
      cards: result.flashcards,
      source: {
        type: sourceType,
        sourceId: sourceId || null,
        model: sourceType === 'summary' ? 'Summary' : 'StudyMaterial'
      }
    });

    await UserActivity.create({
      userId: req.user.id,
      actionType: 'FLASHCARD_CREATED',
      toolName: 'study_planner',
      sourceId: savedDeck._id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      metadata: { numCards }
    });

    res.status(200).json({
      success: true,
      data: {
        flashcards: result.flashcards,
        deckId: savedDeck._id
      }
    });
  } catch (err) {
    next(err);
  }
};
