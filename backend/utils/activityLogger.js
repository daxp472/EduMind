const Activity = require('../models/Activity');
const User = require('../models/User');

/**
 * Log a user activity to the database
 * @param {string} userId - ID of the user
 * @param {string} action - Type of action (from Activity model enum)
 * @param {string} title - Human readable title
 * @param {string} description - Optional detailed description
 * @param {Object} metadata - Optional additional data
 * @param {number} points - Optional gamification points
 */
const logActivity = async (userId, action, title, description = '', metadata = {}, points = 0) => {
    try {
        // Create activity record
        const activity = await Activity.create({
            user: userId,
            action,
            title,
            description,
            metadata,
            pointValue: points
        });

        // Also add to User's recentActivity array for legacy support/quick access
        await User.findByIdAndUpdate(userId, {
            $push: {
                recentActivity: {
                    $each: [{
                        type: action,
                        title,
                        description,
                        timestamp: Date.now()
                    }],
                    $slice: -50 // Keep only last 50
                }
            }
        });

        return activity;
    } catch (err) {
        console.error(`Error logging activity: ${err.message}`);
        // Don't throw - logging shouldn't crash the main process
    }
};

module.exports = logActivity;
