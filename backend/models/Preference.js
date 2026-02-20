const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    // UI Settings
    theme: {
        type: String,
        enum: ['light', 'dark', 'system'],
        default: 'dark'
    },
    sidebarCollapsed: {
        type: Boolean,
        default: false
    },
    compactMode: {
        type: Boolean,
        default: false
    },
    // AI Tool Preferences
    preferredAIService: {
        type: String,
        enum: ['openai', 'google', 'anthropic', 'mock'],
        default: 'openai'
    },
    defaultSummaryLength: {
        type: String,
        enum: ['short', 'medium', 'long'],
        default: 'medium'
    },
    defaultSummaryType: {
        type: String,
        enum: ['general', 'academic', 'executive', 'bullet-points', 'presentation'],
        default: 'general'
    },
    // Notifications
    notifications: {
        browser: { type: Boolean, default: true },
        email: { type: Boolean, default: true },
        marketing: { type: Boolean, default: false }
    },
    // Accessibility
    fontSize: {
        type: String,
        enum: ['small', 'medium', 'large'],
        default: 'medium'
    },
    highContrast: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Preference', PreferenceSchema);
