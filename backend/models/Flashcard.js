const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    deckTitle: {
        type: String,
        required: true
    },
    cards: [{
        front: { type: String, required: true },
        back: { type: String, required: true },
        difficulty: { type: Number, default: 0 }, // For SRS logic later
        lastReviewed: Date
    }],
    source: {
        type: {
            type: String,
            enum: ['note', 'summary', 'quiz', 'text'],
            required: true
        },
        sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'source.model'
        },
        model: {
            type: String,
            enum: ['StudyMaterial', 'Summary', 'Quiz', 'AIRequest'],
            default: 'StudyMaterial'
        }
    }
}, {
    timestamps: true
});

flashcardSchema.index({ user: 1, deckTitle: 1 });

module.exports = mongoose.model('Flashcard', flashcardSchema);
