const express = require('express');
const { 
  summarizeText,
  generateQuiz,
  aiTutor,
  studyPlanner,
  generateFlashcards
} = require('../controllers/ai');
const { protect, guestAccess, checkUsageLimit } = require('../middleware/auth');

const router = express.Router();

// Guest accessible routes (limited usage)
router.post('/summarize', guestAccess, checkUsageLimit, summarizeText);
router.post('/generate-quiz', guestAccess, checkUsageLimit, generateQuiz);
router.post('/tutor', guestAccess, checkUsageLimit, aiTutor);

// Protected routes (full access for authenticated users)
router.use(protect);
router.use(checkUsageLimit);

router.post('/study-planner', studyPlanner);
router.post('/flashcards', generateFlashcards);

module.exports = router;