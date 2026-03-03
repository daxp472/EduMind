const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

// Global API Rate Limiter
// 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: 'error',
        message: 'Too many requests from this IP, please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        logger.warn('Global rate limit hit: %s %s from IP: %s', req.method, req.url, req.ip);
        res.status(options.statusCode).send(options.message);
    }
});

// Auth Rate Limiter (Stricter for brute force protection)
// 10 login/signup attempts per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        status: 'error',
        message: 'Too many authentication attempts. Please try again later.'
    },
    handler: (req, res, next, options) => {
        logger.error('Auth rate limit hit: %s %s from IP: %s', req.method, req.url, req.ip);
        res.status(options.statusCode).send(options.message);
    }
});

module.exports = {
    globalLimiter,
    authLimiter
};
