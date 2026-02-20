const mongoose = require('mongoose');

const StudySessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    durationMinutes: {
        type: Number,
        default: 0
    },
    focusScore: {
        type: Number, // 1-10 scale
        min: 0,
        max: 10
    },
    mood: {
        type: String,
        enum: ['focused', 'tired', 'distracted', 'excited', 'anxious'],
        default: 'focused'
    },
    notes: {
        type: String,
        trim: true
    },
    materialsUsed: [{
        type: mongoose.Schema.ObjectId,
        ref: 'StudyMaterial'
    }],
    status: {
        type: String,
        enum: ['active', 'paused', 'completed', 'abandoned'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('StudySession', StudySessionSchema);
