const mongoose = require('mongoose');

const StudyMaterialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  type: {
    type: String,
    required: [true, 'Please specify material type'],
    enum: ['note', 'document', 'presentation', 'other']
  },
  subject: {
    type: String,
    required: [true, 'Please specify subject']
  },
  tags: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('StudyMaterial', StudyMaterialSchema);