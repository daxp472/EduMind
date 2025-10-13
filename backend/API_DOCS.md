# EduMind Backend API Documentation

## Overview

The EduMind backend provides a RESTful API for the AI-powered learning platform. It includes authentication, user management, AI tools integration, and study material management.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Tokens are returned upon successful login or registration.

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
  "token": "JWT_TOKEN",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "student",
    "subscriptionPlan": "free",
    "usageCount": 0,
    "usageLimit": 100
  }
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
    "role": "student",
    "subscriptionPlan": "free",
    "usageCount": 0,
    "usageLimit": 100
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
    "role": "student",
    "subscriptionPlan": "free",
    "usageCount": 0,
    "usageLimit": 100
  }
}
```

## AI Tools

All AI tool endpoints require authentication and are subject to usage limits based on subscription plans.

### Text Summarization

```
POST /ai/summarize
```

**Headers:**
```
Authorization: Bearer JWT_TOKEN
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
Authorization: Bearer JWT_TOKEN
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

## Subscription Plans

EduMind offers three subscription plans with different usage limits:

- **Free**: 100 AI requests per month
- **Student**: 500 AI requests per month
- **Premium**: 2000 AI requests per month

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
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error