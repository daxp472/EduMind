const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const { globalLimiter } = require('./middlewares/rateLimiter');
const logger = require('./utils/logger');

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

// Security Middlewares
app.use(helmet()); // Secure HTTP headers
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data Sanitization
app.use(mongoSanitize()); // Against NoSQL Injection
app.use(xss()); // Against XSS

// Prevent Parameter Pollution
app.use(hpp());

// Rate Limiting
app.use('/api', globalLimiter);

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
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
    logger.error(`${err.name}: ${err.message}`, {
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        ip: req.ip
    });

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: process.env.NODE_ENV === 'production' && statusCode === 500
            ? 'Internal Server Error'
            : err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
