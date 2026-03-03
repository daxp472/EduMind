const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    questions: [{
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true }, // Index of correct option
        explanation: String
    }],
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    source: {
        type: {
            type: String,
            enum: ['note', 'summary', 'manual', 'file'],
            required: true
        },
        sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'source.model'
        },
        model: {
            type: String,
            enum: ['StudyMaterial', 'Summary', 'AIRequest'],
            default: 'StudyMaterial'
        }
    },
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
}, {
    timestamps: true
});

quizSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Quiz', quizSchema);
