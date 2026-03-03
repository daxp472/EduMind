const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    answers: [{
        questionIndex: Number,
        selectedOption: Number,
        isCorrect: Boolean
    }],
    weakTopics: [String],
    timeTaken: Number, // in seconds
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

quizResultSchema.index({ user: 1, quiz: 1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
