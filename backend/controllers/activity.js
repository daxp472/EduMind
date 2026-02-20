const Activity = require('../models/Activity');
const logActivity = require('../utils/activityLogger');

// @desc    Get recent activity
// @route   GET /api/activity
// @access  Private
exports.getRecentActivity = async (req, res, next) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort('-createdAt')
      .limit(50);

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving activity'
    });
  }
};

// @desc    Get activity by type
// @route   GET /api/activity/type/:type
// @access  Private
exports.getActivityByType = async (req, res, next) => {
  try {
    const activities = await Activity.find({
      user: req.user.id,
      action: req.params.type
    }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving activity by type'
    });
  }
};

// @desc    Add activity
// @route   POST /api/activity
// @access  Private
exports.addActivity = async (req, res, next) => {
  try {
    const { type, title, description, metadata, points } = req.body;

    const activity = await logActivity(
      req.user.id,
      type,
      title,
      description,
      metadata,
      points
    );

    res.status(201).json({
      success: true,
      data: activity
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error adding activity'
    });
  }
};
