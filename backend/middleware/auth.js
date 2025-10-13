const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists'
      });
    }

    // Check if user changed password after the token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: 'User recently changed password! Please log in again'
      });
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Allow guest access for basic features
exports.guestAccess = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token, create a guest user
  if (!token) {
    // Create a temporary guest user with limited access
    req.user = {
      id: 'guest',
      role: 'guest',
      subscriptionPlan: 'guest',
      usageCount: 0,
      usageLimit: process.env.GUEST_PLAN_LIMIT || 5
    };
    return next();
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists'
      });
    }

    // Check if user changed password after the token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return res.status(401).json({
        success: false,
        message: 'User recently changed password! Please log in again'
      });
    }

    // Grant access to protected route
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'User role not authorized to access this route'
      });
    }
    next();
  };
};

// Check usage limits
exports.checkUsageLimit = async (req, res, next) => {
  try {
    // If guest user, check guest limits
    if (req.user.id === 'guest') {
      if (req.user.usageCount >= req.user.usageLimit) {
        return res.status(429).json({
          success: false,
          message: 'Guest usage limit exceeded. Please register for more access.'
        });
      }
      req.user.usageCount += 1;
      return next();
    }

    const user = await User.findById(req.user.id);
    
    // Reset usage if needed
    if (user.resetUsageIfNeeded()) {
      await user.save();
    }
    
    // Check if user has exceeded limit
    if (user.hasExceededUsageLimit()) {
      return res.status(429).json({
        success: false,
        message: 'Usage limit exceeded. Please upgrade your plan or wait for reset.'
      });
    }
    
    // Increment usage count
    user.usageCount += 1;
    await user.save();
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error checking usage limits'
    });
  }
};