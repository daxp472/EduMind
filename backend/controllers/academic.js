const AcademicInfo = require('../models/AcademicInfo');

// @desc    Get academic information
// @route   GET /api/academic
// @access  Private
exports.getAcademicInfo = async (req, res, next) => {
  try {
    let info = await AcademicInfo.findOne({ user: req.user.id });

    if (!info) {
      info = await AcademicInfo.create({ user: req.user.id, institution: 'Unspecified' });
    }

    res.status(200).json({
      success: true,
      data: info
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving academic information'
    });
  }
};

// @desc    Update academic information
// @route   PUT /api/academic
// @access  Private
exports.updateAcademicInfo = async (req, res, next) => {
  try {
    const info = await AcademicInfo.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      {
        new: true,
        runValidators: true,
        upsert: true
      }
    );

    res.status(200).json({
      success: true,
      data: info
    });
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error updating academic information'
    });
  }
};

// @desc    Update profile image
// @route   PUT /api/academic/profile-image
// @access  Private
exports.updateProfileImage = async (req, res, next) => {
  try {
    // cloudinaryUpload middleware should handle the file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: req.file.path },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: {
        avatar: req.file.path
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error updating profile image'
    });
  }
};

// @desc    Update cover image
// @route   PUT /api/academic/cover-image
// @access  Private
exports.updateCoverImage = async (req, res, next) => {
  try {
    // cloudinaryUpload middleware should handle the file upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    // For now, we'll store the cover image in academicInfo
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.academicInfo) {
      user.academicInfo = {};
    }

    user.academicInfo.coverImage = req.file.path;
    await user.save();

    res.status(200).json({
      success: true,
      data: {
        coverImage: req.file.path
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error updating cover image'
    });
  }
};