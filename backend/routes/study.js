const express = require('express');
const {
  getStudyMaterials,
  getStudyMaterial,
  createStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial,
  getStudyGroups,
  createStudyGroup,
  joinStudyGroup,
  getStudyCalendar,
  addCalendarEvent,
  getStudySessions,
  startStudySession,
  endStudySession
} = require('../controllers/study');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

// Study materials routes
router.route('/materials')
  .get(getStudyMaterials)
  .post(createStudyMaterial);

router.route('/materials/:id')
  .get(getStudyMaterial)
  .put(updateStudyMaterial)
  .delete(deleteStudyMaterial);

// Study groups routes
router.route('/groups')
  .get(getStudyGroups)
  .post(createStudyGroup);

router.route('/groups/:id/join')
  .post(joinStudyGroup);

// Study calendar routes
router.route('/calendar')
  .get(getStudyCalendar)
  .post(addCalendarEvent);

// Study timer routes
router.route('/timer')
  .get(getStudySessions);

router.route('/timer/start')
  .post(startStudySession);

router.route('/timer/:id/end')
  .put(endStudySession);

module.exports = router;