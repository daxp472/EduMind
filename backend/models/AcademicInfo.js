const mongoose = require('mongoose');

const AcademicInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    institution: {
        type: String,
        trim: true,
        required: true
    },
    major: {
        type: String,
        trim: true
    },
    degree: {
        type: String,
        trim: true
    },
    year: {
        type: String,
        enum: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Masters', 'PhD', 'Self-Taught', 'Other'],
        default: 'Other'
    },
    gpa: {
        type: Number,
        min: 0,
        max: 5.0
    },
    courses: [{
        name: String,
        code: String,
        semester: String,
        grade: String
    }],
    learningStyle: {
        type: String,
        enum: ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic', 'Unspecified'],
        default: 'Unspecified'
    },
    academicGoals: [String],
    examDates: [{
        subject: String,
        date: Date
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('AcademicInfo', AcademicInfoSchema);
