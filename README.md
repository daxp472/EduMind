# EduMind - AI Powered Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/edumind/edumind" alt="License" />
  <img src="https://img.shields.io/github/last-commit/edumind/edumind" alt="Last Commit" />
  <img src="https://img.shields.io/github/issues/edumind/edumind" alt="Issues" />
</p>

<p align="center">
  <strong>An AI-powered learning platform that transforms education through personalized, adaptive learning experiences.</strong>
</p>

## 📚 About EduMind

EduMind is a next-generation learning platform that leverages artificial intelligence to provide personalized education experiences. Our platform helps students learn more efficiently with AI-powered tools that adapt to individual learning styles and pace.

## 🌟 Key Features

### AI-Powered Learning Tools
- **Smart Summarizer** - Transform lengthy notes into concise summaries
- **Quiz Generator** - Create adaptive quizzes from your content
- **AI Tutor** - Get personalized learning assistance 24/7
- **Study Planner** - AI-optimized study schedules for success
- **Flashcard Generator** - Create digital flashcards from notes
- **Essay Analyzer** - Analyze and improve essay writing
- **Concept Mapper** - Visualize connections between concepts
- **Language Tutor** - Language learning assistance
- **Math Solver** - Step-by-step math problem solving
- **Research Assistant** - AI-powered research support

### Study Management
- **Study Materials** - Organize notes, documents, and resources
- **Study Groups** - Collaborate with peers
- **Study Calendar** - Plan and schedule study sessions
- **Study Timer** - Pomodoro technique with focus tracking
- **Study Goals** - Set and track learning objectives

### Analytics & Insights
- **Learning Analytics** - Track progress and performance
- **Progress Reports** - Detailed learning journey insights
- **Performance Insights** - Identify strengths and weaknesses
- **Learning Paths** - Visualize educational progression

## 🚀 Tech Stack

### Frontend
- [React](https://reactjs.org/) with TypeScript
- [Vite](https://vitejs.dev/) for build tooling
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React Router](https://reactrouter.com/) for navigation
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Hot Toast](https://react-hot-toast.com/) for notifications

### Backend
- [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens](https://jwt.io/) for authentication
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) for password hashing
- [Nodemailer](https://nodemailer.com/) for email services
- Multiple AI service integrations (OpenAI, Gemini, Grok) with fallback mechanism

## 📁 Project Structure

```
project/
├── backend/                 # Backend API (Node.js + Express)
│   ├── controllers/         # Request handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── config/              # Configuration files
│   ├── utils/               # Utility functions
│   ├── test/                # Test files
│   └── server.js            # Entry point
├── src/                     # Frontend source code (React)
│   ├── components/          # Reusable UI components
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   ├── services/            # API service layer
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
└── ...
```

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 14.x
- MongoDB >= 4.x
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/edumind/edumind.git
cd edumind
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

4. Configure environment variables:
- Copy `.env.example` to `.env` in both root and backend directories
- Update the variables with your configuration

5. Start the development servers:
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

## 📡 API Documentation

The backend API is thoroughly documented with all endpoints and usage examples. See [backend/API_DOCS.md](backend/API_DOCS.md) for detailed information.

## 🤝 Contributing

We welcome contributions to EduMind! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔐 Security

For security-related issues, please refer to our [Security Policy](SECURITY.md).

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [OpenAI](https://openai.com/)
- [Google Gemini](https://ai.google/)
- [X.AI Grok](https://x.ai/)

---
<p align="center">Made with ❤️ for education</p>