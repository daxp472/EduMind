const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            'login', 'logout',
            'summary_created', 'quiz_generated', 'quiz_completed',
            'flashcard_created', 'study_session_started', 'study_session_ended',
            'achievement_earned', 'profile_updated', 'material_uploaded',
            'note_added', 'link_clicked'
        ]
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    pointValue: {
        type: Number,
        default: 0
    },
    source: {
        type: String,
        enum: ['web', 'mobile', 'api'],
        default: 'web'
    },
    ipAddress: String,
    userAgent: String
}, {
    timestamps: true
});

// Index for analytics queries
ActivitySchema.index({ user: 1, action: 1, createdAt: -1 });

module.exports = mongoose.model('Activity', ActivitySchema);
