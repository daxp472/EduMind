const express = require('express');
const {
  getUsers,
  getUser,
  updateUserPlan
} = require('../controllers/users');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUser);

router.route('/:id/plan')
  .put(updateUserPlan);

module.exports = router;