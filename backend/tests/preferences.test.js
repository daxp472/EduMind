const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Preference = require('../models/Preference');

describe('Preference Endpoints', () => {
    let token;
    let userId;

    beforeEach(async () => {
        const user = await User.create({
            name: 'Pref Test User',
            email: 'pref@example.com',
            password: 'password123'
        });
        userId = user._id;
        token = user.getSignedJwtToken();

        // Ensure preference object exists for the user
        await Preference.create({ user: userId });
    });

    it('should fetch user preferences', async () => {
        const res = await request(app)
            .get('/api/preferences')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('appearance');
    });

    it('should update user preferences', async () => {
        const res = await request(app)
            .put('/api/preferences')
            .set('Authorization', `Bearer ${token}`)
            .send({
                appearance: {
                    theme: 'light',
                    fontSize: 'large'
                }
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.appearance.theme).toEqual('light');
        expect(res.body.data.appearance.fontSize).toEqual('large');
    });
});
