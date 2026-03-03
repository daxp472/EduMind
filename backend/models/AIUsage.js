const mongoose = require('mongoose');

const aiUsageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    toolType: {
        type: String,
        required: true,
        enum: [
            'summarizer',
            'quiz_generator',
            'ai_tutor',
            'study_planner',
            'essay_analyzer',
            'concept_mapper',
            'language_tutor',
            'math_solver',
            'research_assistant'
        ],
        index: true
    },
    provider: {
        type: String,
        required: true,
        enum: ['openai', 'gemini', 'anthropic', 'system'],
        default: 'openai'
    },
    modelName: String,
    inputTokens: {
        type: Number,
        default: 0
    },
    outputTokens: {
        type: Number,
        default: 0
    },
    totalTokens: {
        type: Number,
        default: 0
    },
    estimatedCost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ['success', 'failure'],
        required: true,
        index: true
    },
    errorMessage: String,
    latencyMs: Number,
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Index for monthly usage reports
aiUsageSchema.index({ userId: 1, createdAt: 1 });
aiUsageSchema.index({ toolType: 1, status: 1 });

module.exports = mongoose.model('AIUsage', aiUsageSchema);
