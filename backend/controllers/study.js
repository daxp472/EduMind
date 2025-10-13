const StudyMaterial = require('../models/StudyMaterial');

// Study groups model (in-memory for now, can be moved to DB)
let studyGroups = [];
let studySessions = [];

// @desc    Get all study materials for user
// @route   GET /api/study/materials
// @access  Private
exports.getStudyMaterials = async (req, res, next) => {
  try {
    const materials = await StudyMaterial.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: materials.length,
      data: materials
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study materials'
    });
  }
};

// @desc    Get single study material
// @route   GET /api/study/materials/:id
// @access  Private
exports.getStudyMaterial = async (req, res, next) => {
  try {
    const material = await StudyMaterial.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: material
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study material'
    });
  }
};

// @desc    Create study material
// @route   POST /api/study/materials
// @access  Private
exports.createStudyMaterial = async (req, res, next) => {
  try {
    const { title, content, type, subject, tags } = req.body;
    
    const material = await StudyMaterial.create({
      title,
      content,
      type,
      subject,
      tags,
      user: req.user.id
    });
    
    res.status(201).json({
      success: true,
      data: material
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
      message: 'Server error creating study material'
    });
  }
};

// @desc    Update study material
// @route   PUT /api/study/materials/:id
// @access  Private
exports.updateStudyMaterial = async (req, res, next) => {
  try {
    let material = await StudyMaterial.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found'
      });
    }
    
    material = await StudyMaterial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: material
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
      message: 'Server error updating study material'
    });
  }
};

// @desc    Delete study material
// @route   DELETE /api/study/materials/:id
// @access  Private
exports.deleteStudyMaterial = async (req, res, next) => {
  try {
    const material = await StudyMaterial.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Study material not found'
      });
    }
    
    await material.remove();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error deleting study material'
    });
  }
};

// @desc    Get study groups
// @route   GET /api/study/groups
// @access  Private
exports.getStudyGroups = async (req, res, next) => {
  try {
    // Filter groups where user is a member
    const userGroups = studyGroups.filter(group => 
      group.members.includes(req.user.id) || group.createdBy === req.user.id
    );
    
    res.status(200).json({
      success: true,
      count: userGroups.length,
      data: userGroups
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study groups'
    });
  }
};

// @desc    Create study group
// @route   POST /api/study/groups
// @access  Private
exports.createStudyGroup = async (req, res, next) => {
  try {
    const { name, description, subject } = req.body;
    
    const newGroup = {
      id: Date.now().toString(),
      name,
      description,
      subject,
      createdBy: req.user.id,
      members: [req.user.id],
      createdAt: new Date()
    };
    
    studyGroups.push(newGroup);
    
    res.status(201).json({
      success: true,
      data: newGroup
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error creating study group'
    });
  }
};

// @desc    Join study group
// @route   POST /api/study/groups/:id/join
// @access  Private
exports.joinStudyGroup = async (req, res, next) => {
  try {
    const group = studyGroups.find(g => g.id === req.params.id);
    
    if (!group) {
      return res.status(404).json({
        success: false,
        message: 'Study group not found'
      });
    }
    
    // Check if user is already a member
    if (group.members.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already a member of this group'
      });
    }
    
    // Add user to group
    group.members.push(req.user.id);
    
    res.status(200).json({
      success: true,
      data: group
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error joining study group'
    });
  }
};

// @desc    Get study calendar
// @route   GET /api/study/calendar
// @access  Private
exports.getStudyCalendar = async (req, res, next) => {
  try {
    // For now, return empty calendar
    // In a real app, this would fetch from a calendar DB
    res.status(200).json({
      success: true,
      data: {
        events: []
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study calendar'
    });
  }
};

// @desc    Add event to study calendar
// @route   POST /api/study/calendar
// @access  Private
exports.addCalendarEvent = async (req, res, next) => {
  try {
    const { title, description, startTime, endTime, subject } = req.body;
    
    // In a real app, this would save to a calendar DB
    const event = {
      id: Date.now().toString(),
      title,
      description,
      startTime,
      endTime,
      subject,
      userId: req.user.id,
      createdAt: new Date()
    };
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error adding calendar event'
    });
  }
};

// @desc    Get study timer sessions
// @route   GET /api/study/timer
// @access  Private
exports.getStudySessions = async (req, res, next) => {
  try {
    // Filter sessions for current user
    const userSessions = studySessions.filter(session => session.userId === req.user.id);
    
    res.status(200).json({
      success: true,
      count: userSessions.length,
      data: userSessions
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving study sessions'
    });
  }
};

// @desc    Start study timer session
// @route   POST /api/study/timer/start
// @access  Private
exports.startStudySession = async (req, res, next) => {
  try {
    const { subject, goal } = req.body;
    
    const session = {
      id: Date.now().toString(),
      userId: req.user.id,
      subject,
      goal,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      status: 'active'
    };
    
    studySessions.push(session);
    
    res.status(201).json({
      success: true,
      data: session
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error starting study session'
    });
  }
};

// @desc    End study timer session
// @route   PUT /api/study/timer/:id/end
// @access  Private
exports.endStudySession = async (req, res, next) => {
  try {
    const session = studySessions.find(s => s.id === req.params.id && s.userId === req.user.id);
    
    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Study session not found'
      });
    }
    
    session.endTime = new Date();
    session.duration = (session.endTime - session.startTime) / 1000; // in seconds
    session.status = 'completed';
    
    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error ending study session'
    });
  }
};