const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // Aggregated totals
    totals: {
        studyHours: { type: Number, default: 0 },
        quizzesCompleted: { type: Number, default: 0 },
        summariesGenerated: { type: Number, default: 0 },
        flashcardsAnalyzed: { type: Number, default: 0 }
    },
    // Performance metrics
    averageQuizScore: { type: Number, default: 0 },
    retentionRate: { type: Number, default: 0 }, // Hypothetical metric based on flashcard/quiz performance

    // Topic mastery (maps topic name to a mastery level 0-100)
    masteryLevels: {
        type: Map,
        of: Number,
        default: {}
    },

    // Time distribution (e.g., how many hours per day of the week)
    weeklyActivity: {
        type: [Number], // 0-6 index for Sun-Sat
        default: [0, 0, 0, 0, 0, 0, 0]
    },

    // Best performance time (hour of day 0-23)
    peakPerformanceHour: {
        type: Number,
        default: 9
    },

    lastCalculated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
