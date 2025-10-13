# Contributing to EduMind

Welcome! We're thrilled that you're interested in contributing to EduMind. This document outlines the process for contributing to our project.

## 📋 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat all contributors and users with respect and consideration.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/edumind.git`
3. Create a branch for your feature: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Commit your changes: `git commit -am "Add some feature"`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Create a new Pull Request

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
│   └── server.js            # Entry point
├── src/                     # Frontend source code (React)
│   ├── components/          # Reusable UI components
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   ├── services/            # API service layer
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
└── ...
```

## 🛠️ Development Setup

### Prerequisites
- Node.js >= 14.x
- MongoDB >= 4.x
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/edumind/edumind.git
cd edumind

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Start development servers
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
npm run dev
```

## 🎯 How to Contribute

### Reporting Bugs
Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

### Suggesting Enhancements
We welcome suggestions for new features or improvements. Please include:

- A clear and descriptive title
- Detailed description of the enhancement
- Use cases for the enhancement
- Potential implementation approach

### Code Contributions

#### Pull Request Process
1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes to the interface
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent
4. Your Pull Request will be reviewed by maintainers, who may request changes
5. Once approved, your Pull Request will be merged

#### Coding Standards
- Follow the existing code style
- Write clear, concise commit messages
- Include comments for complex logic
- Write unit tests for new functionality
- Ensure all tests pass before submitting

#### Branch Naming
Use descriptive branch names:
- `feature/new-feature-name` for new features
- `bugfix/issue-description` for bug fixes
- `docs/documentation-update` for documentation changes

## 🧪 Testing

We use a combination of unit tests, integration tests, and end-to-end tests. Before submitting a Pull Request:

1. Run the test suite: `npm test`
2. Ensure all tests pass
3. Add new tests for your changes
4. Update existing tests if necessary

## 📚 Documentation

Good documentation is crucial for any open-source project. When contributing:

- Update README.md if you change functionality
- Add JSDoc/TSDoc comments to new functions
- Write clear commit messages
- Update API documentation for backend changes

## 🎨 Frontend Guidelines

- Follow React best practices
- Use TypeScript for type safety
- Write responsive components
- Ensure accessibility compliance
- Follow the existing styling patterns

## ⚙️ Backend Guidelines

- Follow RESTful API design principles
- Use proper error handling
- Implement logging for debugging
- Follow security best practices
- Write efficient database queries

## 📞 Community

- Join our [Discord](https://discord.gg/edumind) for discussions
- Follow us on [Twitter](https://twitter.com/edumind)
- Check out our [Blog](https://edumind.com/blog) for updates

## 🙏 Thank You!

Thank you for contributing to EduMind! Your efforts help make education more accessible and effective for learners around the world.

---
*Last updated: October 13, 2025*