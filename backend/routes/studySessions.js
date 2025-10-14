const express = require('express');
const { getStudySessions, getStudySessionsBySubject, getStudyStats, addStudySession, updateStudySession, deleteStudySession } = require('../controllers/studySessions');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getStudySessions)
  .post(addStudySession);

router.route('/stats')
  .get(getStudyStats);

router.route('/subject/:subject')
  .get(getStudySessionsBySubject);

router.route('/:id')
  .put(updateStudySession)
  .delete(deleteStudySession);

module.exports = router;