# Performance & Scaling Edge Cases

Maintenance of high reactivity as the platform grows to thousands of users.

## 1. Database Indexing
- **History Retrieval Slowdown**: As `AIRequest` grows to millions of rows, fetching a user's vault could take > 500ms.
  - *Mitigation*: Ensure compound indices on `{ user: 1, tool: 1, createdAt: -1 }`.
- **Analytics Aggregation**: Running real-time "Total Study Hours" queries across all users.
  - *Mitigation*: Use pre-aggregated "Daily Totals" collections instead of scanning the logs on every dashboard load.

## 2. Payload Management
- **Bloated User Objects**: Loading the entire `User` object with 50 embedded activities on every API call.
  - *Mitigation*: Separate `Activity` into its own collection and use `.populate()` or dedicated endpoints for history.
- **Image Uploads**: Users uploading 10MB profile pictures or 50MB PDFs.
  - *Mitigation*: Strict Multer limits + image compression (Sharp) before storage.

## 3. API Reliability
- **Token Expiration**: Auth token expiring in the middle of a 20-question quiz interaction.
  - *Mitigation*: Implement Refresh Tokens and handled "Unauthorized" states in the frontend with temporary local state persistence.
