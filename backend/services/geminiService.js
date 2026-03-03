const { GoogleGenerativeAI } = require('@google/generative-ai');
const AIUsage = require('../models/AIUsage');
const logger = require('../utils/logger');

/**
 * Production-grade Gemini AI Service
 * Handles: Content generation, token counting, latency tracking, and usage logging.
 */
class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    }

    /**
     * Generate content with monitoring and usage tracking
     */
    async generateContent(userId, toolType, prompt, options = {}) {
        const startTime = Date.now();
        const model = this.genAI.getGenerativeModel({ model: options.model || this.modelName });

        let usageRecord = {
            userId,
            toolType,
            provider: 'gemini',
            modelName: options.model || this.modelName,
            status: 'success'
        };

        try {
            // Count input tokens
            const { totalTokens: inputTokens } = await model.countTokens(prompt);

            // Generate content
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const latencyMs = Date.now() - startTime;

            // Count output tokens
            const { totalTokens: outputTokens } = await model.countTokens(text);

            // Update usage record
            usageRecord = {
                ...usageRecord,
                inputTokens,
                outputTokens,
                totalTokens: inputTokens + outputTokens,
                latencyMs,
                estimatedCost: 0 // Gemini Flash is currently very low cost/free within limits
            };

            // Persistent log in DB
            await AIUsage.create(usageRecord);

            return {
                text,
                usage: {
                    inputTokens,
                    outputTokens,
                    totalTokens: inputTokens + outputTokens
                }
            };
        } catch (error) {
            const latencyMs = Date.now() - startTime;

            // Log failure
            await AIUsage.create({
                ...usageRecord,
                status: 'failure',
                errorMessage: error.message,
                latencyMs
            });

            logger.error('Gemini Service Error (%s): %s', toolType, error.message);
            throw error;
        }
    }
}

module.exports = new GeminiService();
