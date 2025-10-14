const User = require('../models/User');
const cloudinaryUpload = require('../middleware/cloudinaryUpload');

// @desc    Get academic information
// @route   GET /api/academic
// @access  Private
exports.getAcademicInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user.academicInfo || {}
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
    const { institution, major, degree, year, gpa, location, bio } = req.body;
    
    const academicInfo = {};
    
    if (institution) academicInfo.institution = institution;
    if (major) academicInfo.major = major;
    if (degree) academicInfo.degree = degree;
    if (year) academicInfo.year = year;
    if (gpa !== undefined) academicInfo.gpa = gpa;
    if (location) academicInfo.location = location;
    if (bio) academicInfo.bio = bio;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { academicInfo },
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: user.academicInfo
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