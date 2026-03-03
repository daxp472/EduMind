const AIUsage = require('../models/AIUsage');
const User = require('../models/User');
const AI_LIMITS = require('../config/aiLimits');
const logger = require('../utils/logger');

/**
 * AI Usage Guard Middleware
 * Enforces plan-based AI limits BEFORE calling any AI provider.
 */
const aiUsageGuard = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const toolType = req.baseUrl.split('/').pop() || req.path.split('/').pop();

        // 1. Fetch User and Plan details
        // If user is guest, req.user will have necessary fields from auth middleware
        const user = req.user.id === 'guest' ? req.user : await User.findById(userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const plan = user.subscriptionPlan || 'guest';
        const limits = AI_LIMITS[plan] || AI_LIMITS.guest;

        // 2. Check Monthly Quota
        // We use the usageCount and resetUsageAt logic from the User model for monthly quotas
        if (user.id !== 'guest') {
            const dbUser = user instanceof User ? user : await User.findById(user.id);
            if (dbUser.resetUsageIfNeeded()) {
                await dbUser.save();
            }

            if (dbUser.hasExceededUsageLimit()) {
                logger.warn('AI Quota Exceeded for User: %s (Plan: %s)', userId, plan);

                // Log blocked attempt for auditability
                await AIUsage.create({
                    userId,
                    toolType,
                    status: 'failure',
                    errorMessage: 'QUOTA_EXCEEDED',
                    metadata: { plan }
                });

                return res.status(429).json({
                    success: false,
                    errorCode: 'QUOTA_EXCEEDED',
                    message: 'Monthly AI usage quota exceeded for your plan. Please upgrade for more access.'
                });
            }
        } else {
            // Guest logic
            if (user.usageCount >= limits.monthlyTotal) {
                // Log blocked attempt
                await AIUsage.create({
                    userId: null,
                    toolType,
                    status: 'failure',
                    errorMessage: 'QUOTA_EXCEEDED',
                    metadata: { plan: 'guest' }
                });

                return res.status(429).json({
                    success: false,
                    errorCode: 'QUOTA_EXCEEDED',
                    message: 'Guest usage limit exceeded. Please register for more access.'
                });
            }
        }

        // 3. Check Per-Tool Rate Limit (Short-term window)
        // Count successful AI requests for this user and tool in the last window
        const windowStart = new Date(Date.now() - limits.perToolWindowMs);
        const recentUsageCount = await AIUsage.countDocuments({
            userId: user.id === 'guest' ? null : userId,
            toolType: { $regex: new RegExp(toolType, 'i') }, // Robust tool matching
            status: 'success',
            createdAt: { $gte: windowStart }
        });

        if (recentUsageCount >= limits.perToolMax) {
            logger.warn('AI Rate Limit Hit for User: %s, Tool: %s (Plan: %s)', userId, toolType, plan);

            // Log blocked attempt
            await AIUsage.create({
                userId: user.id === 'guest' ? null : userId,
                toolType,
                status: 'failure',
                errorMessage: 'RATE_LIMIT_EXCEEDED',
                metadata: { plan }
            });

            return res.status(429).json({
                success: false,
                errorCode: 'RATE_LIMIT_EXCEEDED',
                message: 'You are using this tool too frequently. Please wait a moment before trying again.'
            });
        }

        // 4. Pass metadata to controller
        res.locals.aiPlan = plan;
        res.locals.aiLimits = limits;

        next();
    } catch (err) {
        logger.error('AI Usage Guard Error: %s', err.message);
        res.status(500).json({ success: false, message: 'Internal server error during usage verification' });
    }
};

module.exports = aiUsageGuard;
