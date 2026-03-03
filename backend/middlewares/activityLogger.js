const UserActivity = require('../models/UserActivity');
const logger = require('../utils/logger');

/**
 * Middleware to log user activity to the database.
 * Usage: router.get('/path', logActivity('ACTION_TYPE', 'tool_name'), controller)
 */
const logActivity = (actionType, toolName = 'general') => {
    return async (req, res, next) => {
        // We'll log after the response is sent to avoid blocking
        res.on('finish', async () => {
            try {
                if (req.user || (actionType === 'LOGIN' && res.statusCode === 200) || (actionType === 'SIGNUP' && res.statusCode === 201)) {
                    const userId = req.user ? req.user.id : (res.locals.userId || null);

                    if (userId) {
                        await UserActivity.create({
                            userId,
                            actionType,
                            toolName,
                            ipAddress: req.ip,
                            userAgent: req.headers['user-agent'],
                            metadata: {
                                statusCode: res.statusCode,
                                method: req.method,
                                path: req.path
                            }
                        });
                    }
                }
            } catch (error) {
                logger.error('Failed to log user activity:', error);
            }
        });
        next();
    };
};

module.exports = logActivity;
