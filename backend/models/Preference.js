const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        studyReminders: { type: Boolean, default: true },
        weeklyReports: { type: Boolean, default: false }
    },
    privacy: {
        profileVisibility: {
            type: String,
            enum: ['public', 'private', 'friends'],
            default: 'private'
        },
        dataSharing: { type: Boolean, default: false }
    },
    appearance: {
        theme: {
            type: String,
            enum: ['light', 'dark', 'system'],
            default: 'dark'
        },
        language: { type: String, default: 'en' },
        fontSize: {
            type: String,
            enum: ['small', 'medium', 'large'],
            default: 'medium'
        }
    },
    ai: {
        personalizedRecommendations: { type: Boolean, default: true },
        adaptiveDifficulty: { type: Boolean, default: true },
        contentFiltering: {
            type: String,
            enum: ['low', 'medium', 'high', 'off'],
            default: 'medium'
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Preference', PreferenceSchema);
