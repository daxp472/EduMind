const User = require('../models/User');

// @desc    Get user achievements
// @route   GET /api/achievements
// @access  Private
exports.getAchievements = async (req, res, next) => {
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
      data: user.achievements || []
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving achievements'
    });
  }
};

// @desc    Get achievements by category
// @route   GET /api/achievements/category/:category
// @access  Private
exports.getAchievementsByCategory = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const categoryAchievements = user.achievements.filter(
      achievement => achievement.category === req.params.category
    );
    
    res.status(200).json({
      success: true,
      data: categoryAchievements
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving achievements'
    });
  }
};

// @desc    Add achievement (admin only)
// @route   POST /api/achievements
// @access  Private/Admin
exports.addAchievement = async (req, res, next) => {
  try {
    const { title, description, icon, points, category } = req.body;
    
    // Create achievement object
    const achievement = {
      title,
      description,
      icon,
      points,
      category,
      earnedAt: Date.now()
    };
    
    // Add achievement to user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    user.achievements.push(achievement);
    await user.save();
    
    // Also add to recent activity
    const activity = {
      type: 'achievement_earned',
      title: `Achievement Earned: ${title}`,
      description: description,
      timestamp: Date.now()
    };
    
    await user.addActivity(activity);
    
    res.status(201).json({
      success: true,
      data: achievement
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
      message: 'Server error adding achievement'
    });
  }
};