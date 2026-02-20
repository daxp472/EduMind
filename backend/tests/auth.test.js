const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toContain('email sent');
    });

    it('should not register a user with an existing email', async () => {
        await User.create({
            name: 'Existing User',
            email: 'test@example.com',
            password: 'password123'
        });

        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Duplicate User',
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(400);
        expect(res.body.success).toBe(false);
    });

    it('should login an existing user', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Login User',
                email: 'login@example.com',
                password: 'password123'
            });

        // Note: In real app, we might need to manually verify email in DB if logic requires it
        // For now, let's assume login works if user exists (check your actual controller logic)

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'login@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
