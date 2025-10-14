const express = require('express');
const { getRecentActivity, getActivityByType, addActivity } = require('../controllers/activity');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getRecentActivity)
  .post(addActivity);

router.route('/type/:type')
  .get(getActivityByType);

module.exports = router;