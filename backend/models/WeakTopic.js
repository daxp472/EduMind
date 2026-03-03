const mongoose = require('mongoose');

const weakTopicSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    subject: String,
    occurrenceCount: {
        type: Number,
        default: 1
    },
    lastIdentified: {
        type: Date,
        default: Date.now
    },
    source: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'sourceModel'
    },
    sourceModel: {
        type: String,
        enum: ['QuizResult', 'StudySession'],
        default: 'QuizResult'
    },
    status: {
        type: String,
        enum: ['identified', 'reviewing', 'mastered'],
        default: 'identified'
    }
}, {
    timestamps: true
});

weakTopicSchema.index({ user: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model('WeakTopic', weakTopicSchema);
