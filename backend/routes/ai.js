const express = require('express');
const multer = require('multer');
const {
  summarizeText,
  generateQuiz,
  aiTutor,
  studyPlanner,
  generateFlashcards
} = require('../controllers/ai');
const { protect, guestAccess, checkUsageLimit } = require('../middleware/auth');

const router = express.Router();

// Multer storage in memory to read file content for AI
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Guest accessible routes (limited usage)
router.post('/summarize', guestAccess, checkUsageLimit, upload.single('file'), summarizeText);
router.post('/generate-quiz', guestAccess, checkUsageLimit, generateQuiz);
router.post('/tutor', guestAccess, checkUsageLimit, aiTutor);

// Protected routes (full access for authenticated users)
router.use(protect);
router.use(checkUsageLimit);

router.post('/study-planner', studyPlanner);
router.post('/flashcards', generateFlashcards);

module.exports = router;