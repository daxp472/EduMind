const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const aiRoutes = require('./routes/ai');
const studyRoutes = require('./routes/study');
const analyticsRoutes = require('./routes/analytics');
const academicRoutes = require('./routes/academic');
const achievementsRoutes = require('./routes/achievements');
const activityRoutes = require('./routes/activity');
const studySessionsRoutes = require('./routes/studySessions');
const preferenceRoutes = require('./routes/preference');

// Initialize app
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection (only if not in test mode, or handled in setup)
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edumind')
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('MongoDB connection error:', err));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/study', studyRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/achievements', achievementsRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/study-sessions', studySessionsRoutes);
app.use('/api/preferences', preferenceRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'EduMind backend is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') {
        console.error(err.stack);
    }
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
