# Data Integrity & Session Edge Cases

Ensuring user data remains consistent across sessions and updates.

## 1. Schema Evolution
- **Missing Preferences**: New preference fields added to the schema but not present in old user documents.
  - *Mitigation*: Strict default values in Mongoose + migration scripts for production deployments.
- **Stale Cache**: Frontend local storage having an old version of a generated quiz that doesn't match the new schema.
  - *Mitigation*: Versioning for local storage data.

## 2. Concurrency
- **Multi-tab Interference**: User generating a quiz in Tab A and a summary in Tab B simultaneously.
  - *Mitigation*: Atomic updates to `usageCount` and dedicated `AIRequest` logs per tool.

## 3. Persistent Analytics
- **Guest to User Migration**: Anonymous user uses 3 summarize credits, then signs up.
  - *Mitigation*: Link "guest_id" (session-based) to the new User ID upon successful signup to preserve history.
- **Deleted Content**: User deletes a Study Material but the associated analytics master record still references it.
  - *Mitigation*: Implement "Soft Deletes" or clean up associated telemetry nodes on deletion.
