# AI Engine Edge Cases

This document outlines critical edge cases for the AI summarization, quiz, and study tools to ensure a production-grade experience.

## 1. Input Processing
- **Empty/Whitespace Input**: Users clicking "Summarize" without text.
  - *Mitigation*: Frontend validation + backend 400 response.
- **Micro-inputs**: Sending "Hi" or "OK" to a summarizer.
  - *Mitigation*: Threshold checks (min 10 words) for meaningful synthesis.
- **Massive Inputs (Token Overflow)**: Sending a 500-page PDF.
  - *Mitigation*: The current code truncates at 15,000 characters. For production, we should implement **Recursive Summarization** (summarize chunks, then meta-summarize).

## 2. Format & Parsing
- **Non-JSON AI Output**: AI returning conversational text instead of a JSON quiz.
  - *Mitigation*: Enhanced Regex parsing + "Retry with Format" logic in controllers.
- **Empty JSON Arrays**: AI returning `[]` for a quiz.
  - *Mitigation*: Validation logic that triggers a second attempt with a more specific prompt.

## 3. Quota & Availability
- **Global Quota Exceeded (429)**: All real AI services are down.
  - *Mitigation*: The current "EduMind Neural Mock" fallback is good, but for production, we should inform users that "Localized Analysis" is active.
- **Service Latency**: AI takes > 30 seconds.
  - *Mitigation*: Implement WebSockets to stream results or use asynchronous job queues with a status "Processing" UI.

## 4. Continuity
- **Interrupted Connection**: User closes browser during a 1-minute generation.
  - *Mitigation*: Store the request as `pending` and allow users to see "Result ready" in their Vault when they return.
