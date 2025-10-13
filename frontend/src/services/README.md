# EduMind API Service

This directory contains the API service layer for the EduMind frontend application. It provides a clean interface for communicating with the EduMind backend API.

## Structure

- `api.ts` - Main API service file containing all API calls
- `README.md` - This documentation file

## API Endpoints

### Authentication
- `authAPI.register(userData)` - Register a new user
- `authAPI.login(credentials)` - Login user
- `authAPI.getCurrentUser(token)` - Get current user data
- `authAPI.updateDetails(userData, token)` - Update user details
- `authAPI.updatePassword(passwordData, token)` - Update user password

### AI Tools
- `aiAPI.summarizeText(textData, token)` - Generate text summary
- `aiAPI.generateQuiz(quizData, token)` - Generate quiz questions

### Study Materials
- `studyAPI.getMaterials(token)` - Get all study materials
- `studyAPI.getMaterial(id, token)` - Get single study material
- `studyAPI.createMaterial(materialData, token)` - Create study material
- `studyAPI.updateMaterial(id, materialData, token)` - Update study material
- `studyAPI.deleteMaterial(id, token)` - Delete study material

### User Management (Admin only)
- `userAPI.getUsers(token)` - Get all users
- `userAPI.getUser(id, token)` - Get single user
- `userAPI.updateUserPlan(id, planData, token)` - Update user subscription plan

## Usage

### Importing the API service
```typescript
import { authAPI, aiAPI, studyAPI, userAPI } from '../services/api';
```

### Making API calls
```typescript
// Register a new user
const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
const response = await authAPI.register(userData);

// Login user
const credentials = { email: 'john@example.com', password: 'password123' };
const response = await authAPI.login(credentials);

// Get current user
const token = localStorage.getItem('edumind_token');
const response = await authAPI.getCurrentUser(token);

// Generate text summary
const textData = { text: 'Your text here', type: 'bullet', length: 'medium' };
const token = localStorage.getItem('edumind_token');
const response = await aiAPI.summarizeText(textData, token);
```

## Error Handling

All API functions will throw an error with a message if the request fails. It's recommended to wrap API calls in try/catch blocks:

```typescript
try {
  const response = await authAPI.login(credentials);
  // Handle successful response
} catch (error) {
  if (error instanceof Error) {
    // Handle error message
    console.error(error.message);
  }
}
```

## Authentication

Most API endpoints require authentication. The authentication token should be passed as the second parameter to API functions. The token is typically stored in localStorage after login/registration.

## Rate Limiting

The backend implements rate limiting based on user subscription plans:
- Free: 100 requests per month
- Student: 500 requests per month
- Premium: 2000 requests per month

When a user exceeds their limit, API calls will return a 429 (Too Many Requests) status code.