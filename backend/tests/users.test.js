const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('User Endpoints', () => {
    let token;
    let userId;

    beforeEach(async () => {
        const user = await User.create({
            name: 'User Test Admin',
            email: 'admin@example.com',
            password: 'password123'
        });
        token = user.getSignedJwtToken();
        userId = user._id;
    });

    it('should fetch current user profile via users/ profile route if exists', async () => {
        const res = await request(app)
            .get('/api/auth/me') // Relying on auth/me for now as secondary check
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
    });
});
