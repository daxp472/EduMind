const mongoose = require('mongoose');

const userActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    actionType: {
        type: String,
        required: true,
        enum: [
            'LOGIN',
            'LOGOUT',
            'SIGNUP',
            'SUMMARY_CREATED',
            'QUIZ_GENERATED',
            'FLASHCARD_CREATED',
            'QUIZ_ATTEMPTED',
            'STUDY_SESSION_STARTED',
            'PAYMENT_ATTEMPTED',
            'PAYMENT_SUCCESS',
            'NOTE_CREATED',
            'NOTE_UPDATED',
            'NOTE_DELETED',
            'PROFILE_UPDATE',
            'PASSWORD_CHANGE',
            'ACHIEVEMENT_EARNED',
            'FILE_UPLOADED',
            'LINK_CLICKED'
        ],
        index: true
    },
    toolName: {
        type: String,
        enum: ['summarizer', 'quiz_forge', 'ai_tutor', 'study_planner', 'math_solver', 'essay_analyzer', 'general'],
        default: 'general'
    },
    sourceId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ipAddress: String,
    userAgent: String,
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    }
});

// Compound index for analytics queries
userActivitySchema.index({ userId: 1, actionType: 1, createdAt: -1 });

module.exports = mongoose.model('UserActivity', userActivitySchema);
