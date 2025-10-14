# EduMind Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/edumind/edumind-backend" alt="License" />
  <img src="https://img.shields.io/github/last-commit/edumind/edumind-backend" alt="Last Commit" />
  <img src="https://img.shields.io/github/issues/edumind/edumind-backend" alt="Issues" />
</p>

EduMind is an AI-powered learning platform backend built with Node.js, Express, and MongoDB. It provides a comprehensive RESTful API for educational applications with features like AI-powered tools, user management, study materials, and analytics.

## 🌟 Features

- **User Authentication** - Secure registration, login, and JWT-based authentication
- **Email Verification** - Email verification workflow with Nodemailer
- **5-Tier Subscription System** - Guest, Free, Student, Pro, and Ultra plans
- **AI-Powered Tools** - Integration with OpenAI, Gemini, and Grok with fallback mechanism
- **Study Management** - Study materials, groups, calendar, and timer
- **Analytics & Insights** - Learning analytics, progress tracking, and performance insights
- **Rate Limiting** - Usage-based rate limiting based on subscription plans
- **Security** - Password hashing, input validation, CORS protection, and Helmet security

## 🚀 Getting Started

### Prerequisites

- Node.js >= 14.x
- MongoDB >= 4.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/edumind/edumind-backend.git
cd edumind-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/edumind

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Email Configuration (for production)
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_EMAIL=your-email@example.com
SMTP_PASSWORD=your-email-password
FROM_NAME=EduMind
FROM_EMAIL=noreply@edumind.com

# AI Service API Keys
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
GROK_API_KEY=your-grok-api-key

# Rate Limiting (5-tier subscription system)
GUEST_PLAN_LIMIT=5
FREE_PLAN_LIMIT=50
STUDENT_PLAN_LIMIT=500
PRO_PLAN_LIMIT=2000
ULTRA_PLAN_LIMIT=10000
```

5. Start the development server:
```bash
npm run dev
```

6. For production:
```bash
npm start
```

### Subscription Management

The system automatically checks for expired subscriptions and downgrades users as needed. To run this check manually:

```bash
npm run check-subscriptions
```

For production environments, set up a cron job to run this script daily:

```bash
# Add to crontab (runs daily at 2:00 AM)
0 2 * * * cd /path/to/edumind-backend && npm run check-subscriptions
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:resettoken` - Reset password
- `GET /api/auth/verifyemail/:verificationtoken` - Verify email

### AI Tools
- `POST /api/ai/summarize` - Generate text summary (Guest access)
- `POST /api/ai/generate-quiz` - Generate quiz questions (Guest access)
- `POST /api/ai/tutor` - AI tutor assistance (Guest access)
- `POST /api/ai/study-planner` - Study planning (Authenticated)
- `POST /api/ai/flashcards` - Flashcard generation (Authenticated)

### Study Materials
- `GET /api/study/materials` - Get all study materials
- `GET /api/study/materials/:id` - Get single study material
- `POST /api/study/materials` - Create study material
- `PUT /api/study/materials/:id` - Update study material
- `DELETE /api/study/materials/:id` - Delete study material

### Study Groups
- `GET /api/study/groups` - Get study groups
- `POST /api/study/groups` - Create study group
- `POST /api/study/groups/:id/join` - Join study group

### Study Calendar
- `GET /api/study/calendar` - Get study calendar
- `POST /api/study/calendar` - Add calendar event

### Study Timer
- `GET /api/study/timer` - Get study sessions
- `POST /api/study/timer/start` - Start study session
- `PUT /api/study/timer/:id/end` - End study session

### Analytics
- `GET /api/analytics/learning` - Get learning analytics
- `GET /api/analytics/reports` - Get progress reports
- `GET /api/analytics/insights` - Get performance insights
- `GET /api/analytics/learning-paths` - Get learning paths

## 🛡️ Security

EduMind implements several security measures:
- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- HTTP headers security with Helmet
- Rate limiting to prevent abuse
- Email verification for account security

## 📈 Rate Limiting

The API implements usage-based rate limiting with 5 subscription tiers:
- **Guest**: 5 requests per month
- **Free**: 50 requests per month
- **Student**: 500 requests per month
- **Pro**: 2000 requests per month
- **Ultra**: 10000 requests per month

## 🤝 Contributing

We welcome contributions to EduMind! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔐 Security

For security-related issues, please refer to our [Security Policy](SECURITY.md).

## 📞 Support

If you have any questions or need help, please [open an issue](https://github.com/edumind/edumind-backend/issues) on GitHub.

## 🙏 Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [OpenAI](https://openai.com/)
- [Google Gemini](https://ai.google/)
- [X.AI Grok](https://x.ai/)

---
<p align="center">Made with ❤️ for education</p>