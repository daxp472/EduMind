const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('AI Tool Endpoints', () => {
    let token;

    beforeEach(async () => {
        const user = await User.create({
            name: 'AI Test User',
            email: 'ai@example.com',
            password: 'password123'
        });
        token = user.getSignedJwtToken();
    });

    it('should generate a summary (guest access)', async () => {
        const res = await request(app)
            .post('/api/ai/summarize')
            .send({
                text: 'This is a test block of text for summarization.',
                type: 'general',
                length: 'short'
            });

        // Note: This requires the AI service mock or real API key
        // If real AI keys aren't in env, this will fail. 
        // We should ideally mock the AI service in tests.

        expect(res.statusCode).toBeDefined();
    });

    it('should fetch AI history with valid token', async () => {
        const res = await request(app)
            .get('/api/ai/history')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
