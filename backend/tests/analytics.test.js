const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Analytics Endpoints', () => {
    let token;

    beforeEach(async () => {
        const user = await User.create({
            name: 'Analytics Test User',
            email: 'analytics@example.com',
            password: 'password123'
        });
        token = user.getSignedJwtToken();
    });

    it('should fetch learning analytics', async () => {
        const res = await request(app)
            .get('/api/analytics/learning')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });

    it('should fetch performance insights', async () => {
        const res = await request(app)
            .get('/api/analytics/insights')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
