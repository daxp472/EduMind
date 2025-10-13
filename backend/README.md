# EduMind Backend API

This is the backend API for EduMind, an AI-powered learning platform built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, password reset)
- AI service integration with fallback mechanism (OpenAI, Gemini, Grok)
- Usage limits based on subscription plans
- Study material management
- AI-powered learning tools:
  - Text summarization
  - Quiz generation
  - AI tutoring
  - Study planning
  - Flashcard generation
  - Essay analysis
  - Concept mapping
  - Language tutoring
  - Math solving
  - Research assistance

## Prerequisites

- Node.js v14 or higher
- MongoDB database
- API keys for AI services (OpenAI, Gemini, Grok)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
5. Update the `.env` file with your configuration

## Usage

### Development

```
npm run dev
```

### Production

```
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update user details
- `PUT /api/auth/updatepassword` - Update password

### AI Tools
- `POST /api/ai/summarize` - Generate text summary
- `POST /api/ai/generate-quiz` - Generate quiz questions

### Study Materials
- `GET /api/study/materials` - Get all study materials
- `GET /api/study/materials/:id` - Get single study material
- `POST /api/study/materials` - Create study material
- `PUT /api/study/materials/:id` - Update study material
- `DELETE /api/study/materials/:id` - Delete study material

### Admin (requires admin role)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id/plan` - Update user subscription plan

## Subscription Plans

- **Free**: 100 AI requests per month
- **Student**: 500 AI requests per month
- **Premium**: 2000 AI requests per month

## AI Service Fallback

The system automatically tries different AI services in case one fails:
1. OpenAI (primary)
2. Gemini (secondary)
3. Grok (tertiary)

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT