const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    source: {
        type: {
            type: String,
            enum: ['note', 'file', 'text', 'url', 'youtube'],
            required: true
        },
        sourceId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'source.model'
        },
        model: {
            type: String,
            enum: ['StudyMaterial', 'AIRequest'],
            default: 'StudyMaterial'
        },
        // YouTube specific metadata
        videoId: String,
        videoUrl: String,
        channelName: String,
        duration: String
    },
    metadata: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    },
    tags: [String],
    isFavorite: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

summarySchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Summary', summarySchema);
