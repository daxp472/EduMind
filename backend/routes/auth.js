const express = require('express');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  adminLogin,
  requestStudentVerification,
  getPendingStudentVerifications,
  approveStudentVerification,
  rejectStudentVerification
} = require('../controllers/auth');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin/login', adminLogin);
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.get('/verifyemail', verifyEmail);
router.post('/request-student-verification', protect, requestStudentVerification);
router.get('/pending-student-verifications', protect, authorize('admin'), getPendingStudentVerifications);
router.put('/approve-student-verification/:userId', protect, authorize('admin'), approveStudentVerification);
router.put('/reject-student-verification/:userId', protect, authorize('admin'), rejectStudentVerification);

module.exports = router;