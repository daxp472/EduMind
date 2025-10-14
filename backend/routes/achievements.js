const express = require('express');
const { getAchievements, getAchievementsByCategory, addAchievement } = require('../controllers/achievements');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getAchievements)
  .post(admin, addAchievement);

router.route('/category/:category')
  .get(getAchievementsByCategory);

module.exports = router;