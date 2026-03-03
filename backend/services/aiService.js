const OpenAI = require('openai');
const geminiService = require('./geminiService');
const AIUsage = require('../models/AIUsage');
const logger = require('../utils/logger');

/**
 * Production-grade AI Service Wrapper
 * Handles: Multi-provider routing (Gemini primary), monitoring, and success/failure tracking.
 */
class AIService {
    constructor() {
        // OpenAI initialized but only used if explicitly requested or as fallback (disabled by default)
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        this.useGemini = true; // Gemini is the primary provider
    }

    /**
     * Agnostic chat completion wrapper
     */
    async chatCompletion(userId, toolType, options) {
        // If Gemini is enabled and we aren't explicitly forcing OpenAI
        if (this.useGemini && options.provider !== 'openai') {
            return this.callGemini(userId, toolType, options);
        }

        // Fallback or explicit OpenAI call
        return this.callOpenAI(userId, toolType, options);
    }

    /**
     * Call Gemini Service
     */
    async callGemini(userId, toolType, options) {
        try {
            // Extract prompt from OpenAI-style messages array if present
            let prompt = options.prompt;
            if (options.messages && options.messages.length > 0) {
                prompt = options.messages[options.messages.length - 1].content;
                // If content is an array (OpenAI multimodal format), extract text
                if (Array.isArray(prompt)) {
                    prompt = prompt.find(p => p.type === 'text')?.text || '';
                }
            }

            const response = await geminiService.generateContent(userId, toolType, prompt, {
                model: options.model === 'gpt-4o' ? 'gemini-1.5-flash' : options.model
            });

            // Return OpenAI-compatible response structure to minimize controller changes
            return {
                choices: [{
                    message: {
                        content: response.text
                    }
                }],
                usage: {
                    prompt_tokens: response.usage.inputTokens,
                    completion_tokens: response.usage.outputTokens,
                    total_tokens: response.usage.totalTokens
                },
                provider: 'gemini'
            };
        } catch (error) {
            // If Gemini fails, we could implement auto-fallback to OpenAI here if desired
            // For now, as per requirements: Gemini will be the ONLY provider until launch.
            throw error;
        }
    }

    /**
     * Call OpenAI Service
     */
    async callOpenAI(userId, toolType, options) {
        const startTime = Date.now();
        let usageRecord = {
            userId,
            toolType,
            provider: 'openai',
            modelName: options.model || 'gpt-4o',
            status: 'success'
        };

        try {
            const response = await this.openai.chat.completions.create(options);

            const latencyMs = Date.now() - startTime;
            const { prompt_tokens, completion_tokens, total_tokens } = response.usage;

            usageRecord = {
                ...usageRecord,
                inputTokens: prompt_tokens,
                outputTokens: completion_tokens,
                totalTokens: total_tokens,
                latencyMs,
                estimatedCost: this.estimateCost(options.model, prompt_tokens, completion_tokens)
            };

            await AIUsage.create(usageRecord);

            return {
                ...response,
                provider: 'openai'
            };
        } catch (error) {
            const latencyMs = Date.now() - startTime;
            await AIUsage.create({
                ...usageRecord,
                status: 'failure',
                errorMessage: error.message,
                latencyMs
            });

            logger.error('OpenAI Service Error (%s): %s', toolType, error.message);
            throw error;
        }
    }

    /**
     * Basic cost estimation logic
     */
    estimateCost(model, input, output) {
        const pricing = {
            'gpt-4o': { input: 0.005 / 1000, output: 0.015 / 1000 },
            'gpt-3.5-turbo': { input: 0.0005 / 1000, output: 0.0015 / 1000 }
        };

        const cost = pricing[model] || pricing['gpt-4o'];
        return (input * cost.input) + (output * cost.output);
    }
}

module.exports = new AIService();
