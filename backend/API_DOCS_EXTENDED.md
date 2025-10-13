# EduMind Backend API Documentation (Extended)

## Overview

This document provides comprehensive documentation for all EduMind backend API endpoints, including authentication, AI tools, study features, and analytics.

## Base URL

```
http://localhost:5000/api
```

## Authentication

### Register a New User

```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification email sent. Please check your email."
}
```

### Verify Email

```
GET /auth/verifyemail/:verificationtoken
```

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "user|student|admin",
    "subscriptionPlan": "guest|free|student|pro|ultra",
    "usageCount": 0,
    "usageLimit": 5
  }
}
```

### Get Current User

```
GET /auth/me
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "user|student|admin",
    "subscriptionPlan": "guest|free|student|pro|ultra",
    "usageCount": 0,
    "usageLimit": 5,
    "emailVerified": true,
    "createdAt": "date"
  }
}
```

### Update User Details

```
PUT /auth/updatedetails
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "name": "string",
  "email": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "user|student|admin",
    "subscriptionPlan": "guest|free|student|pro|ultra",
    "usageCount": 0,
    "usageLimit": 5
  }
}
```

### Update Password

```
PUT /auth/updatepassword
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "user|student|admin",
    "subscriptionPlan": "guest|free|student|pro|ultra",
    "usageCount": 0,
    "usageLimit": 5
  }
}
```

### Forgot Password

```
POST /auth/forgotpassword
```

**Request Body:**
```json
{
  "email": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

### Reset Password

```
PUT /auth/resetpassword/:resettoken
```

**Request Body:**
```json
{
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "token": "JWT_TOKEN",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "user|student|admin",
    "subscriptionPlan": "guest|free|student|pro|ultra",
    "usageCount": 0,
    "usageLimit": 5
  }
}
```

## AI Tools

All AI tool endpoints support guest access with limited usage.

### Text Summarization

```
POST /ai/summarize
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN (optional for guests)
```

**Request Body:**
```json
{
  "text": "string",
  "type": "bullet|paragraph|outline",
  "length": "short|medium|detailed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "string",
    "aiService": "OpenAI|Gemini|Grok"
  }
}
```

### Quiz Generation

```
POST /ai/generate-quiz
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN (optional for guests)
```

**Request Body:**
```json
{
  "text": "string",
  "numQuestions": 5,
  "difficulty": "easy|medium|hard"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "question": "string",
        "options": ["string"],
        "correctAnswer": "string"
      }
    ],
    "aiService": "OpenAI|Gemini|Grok"
  }
}
```

### AI Tutor

```
POST /ai/tutor
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN (optional for guests)
```

**Request Body:**
```json
{
  "question": "string",
  "context": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "answer": "string",
    "aiService": "OpenAI|Gemini|Grok"
  }
}
```

### Study Planner

```
POST /ai/study-planner
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "subjects": ["string"],
  "timeAvailable": 10,
  "goals": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "plan": "string",
    "aiService": "OpenAI|Gemini|Grok"
  }
}
```

### Flashcard Generator

```
POST /ai/flashcards
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "text": "string",
  "numCards": 10
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "flashcards": [
      {
        "front": "string",
        "back": "string"
      }
    ],
    "aiService": "OpenAI|Gemini|Grok"
  }
}
```

## Study Materials

Endpoints for managing study materials.

### Get All Study Materials

```
GET /study/materials
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 0,
  "data": [
    {
      "id": "string",
      "title": "string",
      "content": "string",
      "type": "note|document|presentation|other",
      "subject": "string",
      "tags": ["string"],
      "user": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

### Create Study Material

```
POST /study/materials
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "title": "string",
  "content": "string",
  "type": "note|document|presentation|other",
  "subject": "string",
  "tags": ["string"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "type": "note|document|presentation|other",
    "subject": "string",
    "tags": ["string"],
    "user": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Get Study Material

```
GET /study/materials/:id
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "type": "note|document|presentation|other",
    "subject": "string",
    "tags": ["string"],
    "user": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Update Study Material

```
PUT /study/materials/:id
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "title": "string",
  "content": "string",
  "type": "note|document|presentation|other",
  "subject": "string",
  "tags": ["string"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "content": "string",
    "type": "note|document|presentation|other",
    "subject": "string",
    "tags": ["string"],
    "user": "string",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Delete Study Material

```
DELETE /study/materials/:id
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {}
}
```

## Study Groups

Endpoints for managing study groups.

### Get Study Groups

```
GET /study/groups
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 0,
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "subject": "string",
      "createdBy": "string",
      "members": ["string"],
      "createdAt": "date"
    }
  ]
}
```

### Create Study Group

```
POST /study/groups
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "subject": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "subject": "string",
    "createdBy": "string",
    "members": ["string"],
    "createdAt": "date"
  }
}
```

### Join Study Group

```
POST /study/groups/:id/join
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "subject": "string",
    "createdBy": "string",
    "members": ["string"],
    "createdAt": "date"
  }
}
```

## Study Calendar

Endpoints for managing study calendar.

### Get Study Calendar

```
GET /study/calendar
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "startTime": "date",
        "endTime": "date",
        "subject": "string",
        "userId": "string",
        "createdAt": "date"
      }
    ]
  }
}
```

### Add Calendar Event

```
POST /study/calendar
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "startTime": "date",
  "endTime": "date",
  "subject": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "startTime": "date",
    "endTime": "date",
    "subject": "string",
    "userId": "string",
    "createdAt": "date"
  }
}
```

## Study Timer

Endpoints for managing study timer sessions.

### Get Study Sessions

```
GET /study/timer
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "count": 0,
  "data": [
    {
      "id": "string",
      "userId": "string",
      "subject": "string",
      "goal": "string",
      "startTime": "date",
      "endTime": "date",
      "duration": 0,
      "status": "active|completed"
    }
  ]
}
```

### Start Study Session

```
POST /study/timer/start
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body:**
```json
{
  "subject": "string",
  "goal": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "subject": "string",
    "goal": "string",
    "startTime": "date",
    "endTime": null,
    "duration": 0,
    "status": "active"
  }
}
```

### End Study Session

```
PUT /study/timer/:id/end
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "userId": "string",
    "subject": "string",
    "goal": "string",
    "startTime": "date",
    "endTime": "date",
    "duration": 0,
    "status": "completed"
  }
}
```

## Analytics

Endpoints for retrieving learning analytics.

### Get Learning Analytics

```
GET /analytics/learning
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalRequests": 0,
    "successfulRequests": 0,
    "failedRequests": 0,
    "successRate": 0,
    "toolUsage": {
      "summarizer": 0,
      "quiz-generator": 0
    },
    "studyMaterials": 0
  }
}
```

### Get Progress Reports

```
GET /analytics/reports
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dailyUsage": {
      "2023-01-01": 0
    },
    "studyMaterials": [
      {
        "id": "string",
        "title": "string",
        "type": "string",
        "subject": "string",
        "createdAt": "date"
      }
    ]
  }
}
```

### Get Performance Insights

```
GET /analytics/insights
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "averageProcessingTime": 0,
    "averageTokens": 0,
    "mostUsedTool": "string",
    "totalToolsUsed": 0
  }
}
```

### Get Learning Paths

```
GET /analytics/learning-paths
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "success": true,
  "data": {
    "subjectName": {
      "count": 0,
      "materials": [
        {
          "id": "string",
          "title": "string",
          "type": "string",
          "createdAt": "date"
        }
      ]
    }
  }
}
```

## Subscription Plans

EduMind offers five subscription plans with different usage limits:

- **Guest**: 5 AI requests (no registration required)
- **Free**: 50 AI requests per month
- **Student**: 500 AI requests per month
- **Pro**: 2000 AI requests per month
- **Ultra**: 10000 AI requests per month

When a user exceeds their limit, API calls will return a 429 (Too Many Requests) status code.

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error