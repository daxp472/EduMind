const Analytics = require('../models/Analytics');

/**
 * Update user analytics based on tool usage
 * @param {string} userId - ID of the user
 * @param {string} tool - Tool used (summarizer, quiz, etc.)
 * @param {Object} data - Metrics to update (score, time, topic)
 */
const updateAnalytics = async (userId, tool, data = {}) => {
    try {
        const analytics = await Analytics.findOne({ user: userId });
        if (!analytics) {
            console.warn(`Analytics record not found for user ${userId}`);
            return;
        }

        // Update totals
        if (tool === 'summarizer') {
            analytics.totals.summariesGenerated += 1;
        } else if (tool === 'quiz') {
            analytics.totals.quizzesCompleted += 1;
            if (data.score !== undefined) {
                // Simple running average
                const count = analytics.totals.quizzesCompleted;
                analytics.averageQuizScore = ((analytics.averageQuizScore * (count - 1)) + data.score) / count;
            }
        } else if (tool === 'flashcards') {
            analytics.totals.flashcardsAnalyzed += 1;
        } else if (tool === 'study-planner') {
            // Logic for study planner totals if needed
        }

        // Update topic mastery if topic is provided
        if (data.topic && data.masteryBoost) {
            const currentMastery = analytics.masteryLevels.get(data.topic) || 0;
            analytics.masteryLevels.set(data.topic, Math.min(100, currentMastery + data.masteryBoost));
        }

        // Update weekly activity heatmap
        const dayOfWeek = new Date().getDay(); // 0-6
        analytics.weeklyActivity[dayOfWeek] += 1;

        analytics.lastCalculated = Date.now();
        await analytics.save();

        return analytics;
    } catch (err) {
        console.error(`Error updating analytics: ${err.message}`);
    }
};

module.exports = updateAnalytics;
