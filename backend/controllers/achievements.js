const Achievement = require('../models/Achievement');
const logActivity = require('../utils/activityLogger');

// @desc    Get user achievements
// @route   GET /api/achievements
// @access  Private
exports.getAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements
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
    const achievements = await Achievement.find({
      user: req.user.id,
      category: req.params.category
    });

    res.status(200).json({
      success: true,
      count: achievements.length,
      data: achievements
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving achievements by category'
    });
  }
};

// @desc    Add achievement (can be triggered by system or admin)
// @route   POST /api/achievements
// @access  Private
exports.addAchievement = async (req, res, next) => {
  try {
    const { code, title, description, icon, points, category } = req.body;

    // Create or update achievement for user
    const achievement = await Achievement.findOneAndUpdate(
      { user: req.user.id, code },
      {
        title,
        description,
        icon,
        points,
        category,
        isCompleted: true,
        completedAt: Date.now()
      },
      { upsert: true, new: true, runValidators: true }
    );

    // Log as activity
    await logActivity(
      req.user.id,
      'achievement_earned',
      `Achievement Unlocked: ${title}`,
      description,
      { code, points },
      points
    );

    res.status(201).json({
      success: true,
      data: achievement
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error adding achievement'
    });
  }
};
