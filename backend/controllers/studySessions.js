const User = require('../models/User');

// @desc    Get study sessions
// @route   GET /api/study-sessions
// @access  Private
exports.getStudySessions = async (req, res, next) => {
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
      data: user.studyStats || {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study sessions'
    });
  }
};

// @desc    Get study sessions by subject
// @route   GET /api/study-sessions/subject/:subject
// @access  Private
exports.getStudySessionsBySubject = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (!user.studyStats || !user.studyStats.subjectStats) {
      return res.status(200).json({
        success: true,
        data: {}
      });
    }
    
    const subjectStats = user.studyStats.subjectStats.get(req.params.subject) || {};
    
    res.status(200).json({
      success: true,
      data: subjectStats
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study sessions'
    });
  }
};

// @desc    Get study statistics
// @route   GET /api/study-sessions/stats
// @access  Private
exports.getStudyStats = async (req, res, next) => {
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
      data: user.studyStats || {
        totalHours: 0,
        totalSessions: 0,
        averageProductivity: 0,
        subjectStats: {}
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study statistics'
    });
  }
};

// @desc    Add study session
// @route   POST /api/study-sessions
// @access  Private
exports.addStudySession = async (req, res, next) => {
  try {
    const { subject, hours, sessions } = req.body;
    
    if (!subject || !hours) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject and hours'
      });
    }
    
    // Update user's study stats
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    await user.updateStudyStats(subject, hours, sessions || 1);
    
    // Also add to recent activity
    const activity = {
      type: 'study_session',
      title: `Study Session: ${subject}`,
      description: `Studied ${hours} hours on ${subject}`,
      timestamp: Date.now()
    };
    
    await user.addActivity(activity);
    
    res.status(201).json({
      success: true,
      data: user.studyStats
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
      message: 'Server error adding study session'
    });
  }
};

// @desc    Update study session
// @route   PUT /api/study-sessions/:id
// @access  Private
exports.updateStudySession = async (req, res, next) => {
  try {
    // In this implementation, we're not storing individual sessions with IDs
    // We're tracking cumulative stats instead
    // This endpoint is kept for API consistency
    
    res.status(200).json({
      success: true,
      message: 'Study session tracking is cumulative. Use POST /api/study-sessions to add new study time.'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error updating study session'
    });
  }
};

// @desc    Delete study session
// @route   DELETE /api/study-sessions/:id
// @access  Private
exports.deleteStudySession = async (req, res, next) => {
  try {
    // In this implementation, we're not storing individual sessions with IDs
    // We're tracking cumulative stats instead
    // This endpoint is kept for API consistency
    
    res.status(200).json({
      success: true,
      message: 'Study session tracking is cumulative. Individual sessions cannot be deleted.'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting study session'
    });
  }
};