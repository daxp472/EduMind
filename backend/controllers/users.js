const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving users'
    });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found with id of ${req.params.id}`
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user'
    });
  }
};

// @desc    Update user subscription plan
// @route   PUT /api/users/:id/plan
// @access  Private/Admin
exports.updateUserPlan = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `No user found with id of ${req.params.id}`
      });
    }
    
    // Update plan and usage limit
    user.subscriptionPlan = req.body.plan;
    
    // Set usage limit based on plan
    switch(req.body.plan) {
      case 'student':
        user.usageLimit = process.env.STUDENT_PLAN_LIMIT || 500;
        break;
      case 'premium':
        user.usageLimit = process.env.PREMIUM_PLAN_LIMIT || 2000;
        break;
      default:
        user.usageLimit = process.env.DEFAULT_USER_LIMIT || 100;
    }
    
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error updating user plan'
    });
  }
};