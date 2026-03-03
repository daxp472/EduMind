/**
 * AI Usage Limits Configuration
 * Defines the monthly quotas and per-tool rate limits for different subscription plans.
 */

const AI_LIMITS = {
    guest: {
        monthlyTotal: parseInt(process.env.GUEST_PLAN_LIMIT) || 5,
        perToolWindowMs: 15 * 60 * 1000, // 15 minutes
        perToolMax: 3
    },
    free: {
        monthlyTotal: parseInt(process.env.FREE_PLAN_LIMIT) || 100,
        perToolWindowMs: 60 * 60 * 1000, // 1 hour
        perToolMax: 20
    },
    student: {
        monthlyTotal: parseInt(process.env.STUDENT_PLAN_LIMIT) || 1000,
        perToolWindowMs: 60 * 60 * 1000, // 1 hour
        perToolMax: 100
    },
    pro: {
        monthlyTotal: parseInt(process.env.PRO_PLAN_LIMIT) || 5000,
        perToolWindowMs: 60 * 60 * 1000, // 1 hour
        perToolMax: 500
    },
    ultra: {
        monthlyTotal: parseInt(process.env.ULTRA_PLAN_LIMIT) || 20000,
        perToolWindowMs: 60 * 60 * 1000, // 1 hour
        perToolMax: 2000
    }
};

module.exports = AI_LIMITS;
