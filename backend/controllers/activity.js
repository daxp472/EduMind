const User = require('../models/User');

// @desc    Get recent activity
// @route   GET /api/activity
// @access  Private
exports.getRecentActivity = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Sort activity by timestamp (newest first)
    const sortedActivity = (user.recentActivity || []).sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    res.status(200).json({
      success: true,
      data: sortedActivity
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
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const typeActivity = user.recentActivity.filter(
      activity => activity.type === req.params.type
    );
    
    // Sort by timestamp (newest first)
    const sortedActivity = typeActivity.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    
    res.status(200).json({
      success: true,
      data: sortedActivity
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving activity'
    });
  }
};

// @desc    Add activity
// @route   POST /api/activity
// @access  Private
exports.addActivity = async (req, res, next) => {
  try {
    const { type, title, description } = req.body;
    
    // Validate activity type
    const validTypes = ['summary_created', 'quiz_completed', 'note_added', 'achievement_earned', 'study_session', 'ai_tool_used'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid activity type'
      });
    }
    
    // Create activity object
    const activity = {
      type,
      title,
      description,
      timestamp: Date.now()
    };
    
    // Add activity to user
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await user.addActivity(activity);
    
    res.status(201).json({
      success: true,
      data: activity
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
      message: 'Server error adding activity'
    });
  }
};