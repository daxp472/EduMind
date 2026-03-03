const UserActivity = require('../models/UserActivity');
const User = require('../models/User');

/**
 * Log a user activity to the database (Normalized)
 * @param {string} userId - ID of the user
 * @param {string} actionType - Type of action (from UserActivity model enum)
 * @param {string} toolName - Tool associated with activity
 * @param {Object} metadata - Optional additional data
 * @param {string} sourceId - Optional related record ID
 */
const logActivity = async (userId, actionType, toolName = 'general', metadata = {}, sourceId = null) => {
    try {
        // Create activity record in the NEW unified model
        const activity = await UserActivity.create({
            userId,
            actionType: actionType.toUpperCase(),
            toolName,
            metadata,
            sourceId
        });

        // Sync to User's recentActivity array for high-speed dashboard access
        await User.findByIdAndUpdate(userId, {
            $push: {
                recentActivity: {
                    $each: [{
                        type: actionType.toLowerCase(), // Maintain lowercase for frontend compatibility if needed
                        title: `${actionType.replace('_', ' ')} Registered`,
                        timestamp: Date.now()
                    }],
                    $slice: -50
                }
            }
        });

        return activity;
    } catch (err) {
        // No console.logs in production paths - using logger if available
        const logger = require('./logger');
        if (logger) logger.error(`Error logging activity: ${err.message}`);
    }
};

module.exports = logActivity;
