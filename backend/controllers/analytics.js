const User = require('../models/User');
const AIRequest = require('../models/AIRequest');
const StudyMaterial = require('../models/StudyMaterial');

// @desc    Get learning analytics
// @route   GET /api/analytics/learning
// @access  Private
exports.getLearningAnalytics = async (req, res, next) => {
  try {
    // Get user's AI usage stats
    const aiRequests = await AIRequest.find({ user: req.user.id });
    
    // Calculate stats
    const totalRequests = aiRequests.length;
    const successfulRequests = aiRequests.filter(req => req.success).length;
    const failedRequests = totalRequests - successfulRequests;
    
    // Group by tool
    const toolUsage = {};
    aiRequests.forEach(request => {
      if (!toolUsage[request.tool]) {
        toolUsage[request.tool] = 0;
      }
      toolUsage[request.tool]++;
    });
    
    // Get study materials count
    const studyMaterials = await StudyMaterial.countDocuments({ user: req.user.id });
    
    res.status(200).json({
      success: true,
      data: {
        totalRequests,
        successfulRequests,
        failedRequests,
        successRate: totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0,
        toolUsage,
        studyMaterials
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving analytics'
    });
  }
};

// @desc    Get progress reports
// @route   GET /api/analytics/reports
// @access  Private
exports.getProgressReports = async (req, res, next) => {
  try {
    // Get user's AI usage over time
    const aiRequests = await AIRequest.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    // Group by date
    const dailyUsage = {};
    aiRequests.forEach(request => {
      const date = request.createdAt.toISOString().split('T')[0];
      if (!dailyUsage[date]) {
        dailyUsage[date] = 0;
      }
      dailyUsage[date]++;
    });
    
    // Get study materials
    const studyMaterials = await StudyMaterial.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      data: {
        dailyUsage,
        studyMaterials: studyMaterials.map(material => ({
          id: material._id,
          title: material.title,
          type: material.type,
          subject: material.subject,
          createdAt: material.createdAt
        }))
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving progress reports'
    });
  }
};

// @desc    Get performance insights
// @route   GET /api/analytics/insights
// @access  Private
exports.getPerformanceInsights = async (req, res, next) => {
  try {
    // Get user's AI usage stats
    const aiRequests = await AIRequest.find({ user: req.user.id });
    
    // Calculate average processing time
    const totalProcessingTime = aiRequests.reduce((sum, req) => sum + (req.processingTime || 0), 0);
    const averageProcessingTime = aiRequests.length > 0 ? totalProcessingTime / aiRequests.length : 0;
    
    // Calculate average tokens used
    const totalTokens = aiRequests.reduce((sum, req) => sum + (req.tokensUsed || 0), 0);
    const averageTokens = aiRequests.length > 0 ? totalTokens / aiRequests.length : 0;
    
    // Get most used tools
    const toolUsage = {};
    aiRequests.forEach(request => {
      if (!toolUsage[request.tool]) {
        toolUsage[request.tool] = 0;
      }
      toolUsage[request.tool]++;
    });
    
    const mostUsedTool = Object.keys(toolUsage).reduce((a, b) => toolUsage[a] > toolUsage[b] ? a : b, '');
    
    res.status(200).json({
      success: true,
      data: {
        averageProcessingTime,
        averageTokens,
        mostUsedTool,
        totalToolsUsed: Object.keys(toolUsage).length
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving performance insights'
    });
  }
};

// @desc    Get learning paths
// @route   GET /api/analytics/learning-paths
// @access  Private
exports.getLearningPaths = async (req, res, next) => {
  try {
    // Get user's study materials grouped by subject
    const studyMaterials = await StudyMaterial.find({ user: req.user.id });
    
    const subjects = {};
    studyMaterials.forEach(material => {
      if (!subjects[material.subject]) {
        subjects[material.subject] = {
          count: 0,
          materials: []
        };
      }
      subjects[material.subject].count++;
      subjects[material.subject].materials.push({
        id: material._id,
        title: material.title,
        type: material.type,
        createdAt: material.createdAt
      });
    });
    
    res.status(200).json({
      success: true,
      data: subjects
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving learning paths'
    });
  }
};