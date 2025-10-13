const express = require('express');
const {
  getLearningAnalytics,
  getProgressReports,
  getPerformanceInsights,
  getLearningPaths
} = require('../controllers/analytics');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/learning', getLearningAnalytics);
router.get('/reports', getProgressReports);
router.get('/insights', getPerformanceInsights);
router.get('/learning-paths', getLearningPaths);

module.exports = router;