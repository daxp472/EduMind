const express = require('express');
const { getAcademicInfo, updateAcademicInfo, updateProfileImage, updateCoverImage } = require('../controllers/academic');
const { protect } = require('../middleware/auth');
const cloudinaryUpload = require('../middleware/cloudinaryUpload');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getAcademicInfo)
  .put(updateAcademicInfo);

router.route('/profile-image')
  .put(cloudinaryUpload.single('image'), updateProfileImage);

router.route('/cover-image')
  .put(cloudinaryUpload.single('image'), updateCoverImage);

module.exports = router;