# EduMind API Documentation

This document provides a comprehensive guide to the EduMind backend APIs. All requests should be sent to `http://localhost:5000/api` unless otherwise specified.

## Authentication (`/auth`)

### Register User
- **URL**: `/register`
- **Method**: `POST`
- **Body**:
```json
{
  "name": "Full Name",
  "email": "user@example.com",
  "password": "strongpassword123"
}
```

### Login User
- **URL**: `/login`
- **Method**: `POST`
- **Body**:
```json
{
  "email": "user@example.com",
  "password": "strongpassword123"
}
```

### Get Current User
- **URL**: `/me`
- **Method**: `GET`
- **Auth**: Required (`Bearer <token>`)

---

## AI Tools (`/ai`)

### Summarize Text/File
- **URL**: `/summarize`
- **Method**: `POST`
- **Auth**: Optional (Guest limits apply)
- **Content-Type**: `multipart/form-data` or `application/json`
- **Body (JSON)**:
```json
{
  "text": "Full text to summarize",
  "type": "general",
  "length": "medium"
}
```
- **File Upload**: Field name `file`.

### Generate Quiz
- **URL**: `/generate-quiz`
- **Method**: `POST`
- **Body**:
```json
{
  "text": "Context for quiz generation",
  "numQuestions": 5,
  "difficulty": "medium"
}
```

---

## User Preferences (`/preferences`)

### Get Preferences
- **URL**: `/`
- **Method**: `GET`
- **Auth**: Required

### Update Preferences
- **URL**: `/`
- **Method**: `PUT`
- **Body**: Partial or full `Preferences` object.

---

## Testing with Postman
1. Import the collection (coming soon).
2. Set Environment variable `token` after login.
3. Use the `Authorization` tab in Postman to set `Bearer Token` as `{{token}}`.
