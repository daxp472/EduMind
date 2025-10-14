const User = require('../models/User');
const crypto = require('crypto');
const sendEmail = require('../utils/email');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    data: user
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate email verification token
    const verificationToken = user.getEmailVerificationToken();
    await user.save({ validateBeforeSave: false });

    // Create verification URL pointing to frontend
    const verificationURL = `http://localhost:5173/verify-email?token=${verificationToken}`;

    // HTML message
    const message = `
      <h1>Email Verification</h1>
      <p>Please click on the following link to verify your email:</p>
      <a href="${verificationURL}">${verificationURL}</a>
      <p>This link will expire in 1 hour.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Email Verification',
        message,
        html: message
      });

      res.status(201).json({
        success: true,
        message: 'Verification email sent. Please check your email.'
      });
    } catch (err) {
      user.emailVerificationToken = undefined;
      user.emailVerificationExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

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
      message: 'Server error during registration'
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for user and select password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(401).json({
        success: false,
        message: 'Please verify your email before logging in'
      });
    }

    // Add login activity
    const activity = {
      type: 'login',
      title: 'User Login',
      description: 'User successfully logged in',
      timestamp: Date.now()
    };
    
    await user.addActivity(activity);

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user data'
    });
  }
};

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
exports.updateDetails = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

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
      message: 'Server error updating user details'
    });
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error updating password'
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetURL = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

    // HTML message
    const message = `
      <h1>Password Reset</h1>
      <p>Please click on the following link to reset your password:</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>This link will expire in 10 minutes.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset',
        message,
        html: message
      });

      res.status(200).json({
        success: true,
        message: 'Password reset email sent'
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        success: false,
        message: 'Email could not be sent'
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token'
      });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
};

// @desc    Verify email
// @route   GET /api/auth/verifyemail
// @access  Public
exports.verifyEmail = async (req, res, next) => {
  try {
    // Get token from query parameters
    const { token: verificationtoken } = req.query;
    
    if (!verificationtoken) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required'
      });
    }

    // Get hashed token
    const emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationtoken)
      .digest('hex');

    const user = await User.findOne({
      emailVerificationToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Set email to verified and upgrade plan to free
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    user.subscriptionPlan = 'free'; // Upgrade to free plan after verification
    user.usageLimit = process.env.FREE_PLAN_LIMIT || 50; // Set appropriate limit
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error during email verification'
    });
  }
};

// @desc    Admin login
// @route   POST /api/auth/admin/login
// @access  Public
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
    }

    // Check for admin user
    const user = await User.findOne({ email, role: 'admin' }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error during admin login'
    });
  }
};

// @desc    Request student verification
// @route   POST /api/auth/request-student-verification
// @access  Private
exports.requestStudentVerification = async (req, res, next) => {
  try {
    const { studentIdCard, studentIdCardSelfie } = req.body;

    // Validate input
    if (!studentIdCard || !studentIdCardSelfie) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both ID card and selfie images'
      });
    }

    // Update user with verification request
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        studentIdCard,
        studentIdCardSelfie,
        studentVerificationStatus: 'pending',
        studentVerificationRequestedAt: Date.now()
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error requesting student verification'
    });
  }
};

// @desc    Get users pending student verification
// @route   GET /api/auth/pending-student-verifications
// @access  Private/Admin
exports.getPendingStudentVerifications = async (req, res, next) => {
  try {
    const users = await User.find({ studentVerificationStatus: 'pending' });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error fetching pending verifications'
    });
  }
};

// @desc    Approve student verification
// @route   PUT /api/auth/approve-student-verification/:userId
// @access  Private/Admin
exports.approveStudentVerification = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        studentVerificationStatus: 'approved',
        subscriptionPlan: 'student',
        usageLimit: process.env.STUDENT_PLAN_LIMIT || 1000
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error approving student verification'
    });
  }
};

// @desc    Reject student verification
// @route   PUT /api/auth/reject-student-verification/:userId
// @access  Private/Admin
exports.rejectStudentVerification = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        studentVerificationStatus: 'rejected'
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error rejecting student verification'
    });
  }
};