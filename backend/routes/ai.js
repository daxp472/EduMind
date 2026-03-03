const express = require('express');
const multer = require('multer');
const {
  summarizeText,
  generateQuiz,
  aiTutor,
  studyPlanner,
  generateFlashcards,
  getAIHistory
} = require('../controllers/ai');
const { protect, guestAccess } = require('../middleware/auth');
const aiUsageGuard = require('../middlewares/aiUsageGuard');

const router = express.Router();

router.get('/history', protect, getAIHistory);

// Multer storage in memory to read file content for AI
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Guest accessible routes (limited usage)
router.post('/summarize', guestAccess, aiUsageGuard, upload.single('file'), summarizeText);
router.post('/generate-quiz', guestAccess, aiUsageGuard, generateQuiz);
router.post('/tutor', guestAccess, aiUsageGuard, aiTutor);

// Protected routes (full access for authenticated users)
router.use(protect);
router.use(aiUsageGuard);

router.post('/study-planner', studyPlanner);
router.post('/flashcards', generateFlashcards);

module.exports = router;