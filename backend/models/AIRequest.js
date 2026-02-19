const mongoose = require('mongoose');

const AIRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  tool: {
    type: String,
    required: true,
    enum: [
      'summarizer',
      'quiz-generator',
      'tutor',
      'study-planner',
      'flashcard-generator',
      'essay-analyzer',
      'concept-mapper',
      'language-tutor',
      'math-solver',
      'research-assistant'
    ]
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String
  },
  aiService: {
    type: String,
    required: true
  },
  tokensUsed: {
    type: Number,
    default: 0
  },
  processingTime: {
    type: Number // in milliseconds
  },
  success: {
    type: Boolean,
    default: true
  },
  error: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AIRequest', AIRequestSchema);