const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    code: {
        type: String,
        required: true,
        unique: false // A code can exist for multiple users, but not duplicated for the same user
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String, // lucide-react icon name or URL
        default: 'Award'
    },
    category: {
        type: String,
        enum: ['streak', 'mastery', 'social', 'hidden', 'milestone'],
        default: 'milestone'
    },
    points: {
        type: Number,
        default: 10
    },
    progress: {
        current: { type: Number, default: 0 },
        target: { type: Number, default: 1 }
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date
    }
}, {
    timestamps: true
});

AchievementSchema.index({ user: 1, code: 1 }, { unique: true });

module.exports = mongoose.model('Achievement', AchievementSchema);
