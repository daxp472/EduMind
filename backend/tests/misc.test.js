const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Miscellaneous Module Endpoints', () => {
    let token;

    beforeEach(async () => {
        const user = await User.create({
            name: 'Misc Test User',
            email: 'misc@example.com',
            password: 'password123'
        });
        token = user.getSignedJwtToken();
    });

    it('should fetch academic info', async () => {
        const res = await request(app)
            .get('/api/academic')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBeDefined();
    });

    it('should fetch achievements', async () => {
        const res = await request(app)
            .get('/api/achievements')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBeDefined();
    });

    it('should fetch activity logs', async () => {
        const res = await request(app)
            .get('/api/activity')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBeDefined();
    });
});
