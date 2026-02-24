const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Study Endpoints', () => {
    let token;

    beforeEach(async () => {
        const user = await User.create({
            name: 'Study Test User',
            email: 'study@example.com',
            password: 'password123'
        });
        token = user.getSignedJwtToken();
    });

    it('should fetch all study materials', async () => {
        const res = await request(app)
            .get('/api/study/materials')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should fetch study groups', async () => {
        const res = await request(app)
            .get('/api/study/groups')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
