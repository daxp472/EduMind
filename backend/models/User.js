const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ['user', 'student', 'admin'],
    default: 'user'
  },
  subscriptionPlan: {
    type: String,
    enum: ['guest', 'free', 'student', 'pro', 'ultra'],
    default: 'guest'
  },
  usageLimit: {
    type: Number,
    default: function() {
      switch(this.subscriptionPlan) {
        case 'guest': return process.env.GUEST_PLAN_LIMIT || 5;
        case 'free': return process.env.FREE_PLAN_LIMIT || 50;
        case 'student': return process.env.STUDENT_PLAN_LIMIT || 500;
        case 'pro': return process.env.PRO_PLAN_LIMIT || 2000;
        case 'ultra': return process.env.ULTRA_PLAN_LIMIT || 10000;
        default: return process.env.GUEST_PLAN_LIMIT || 5;
      }
    }
  },
  usageCount: {
    type: Number,
    default: 0
  },
  resetUsageAt: {
    type: Date,
    default: () => new Date(new Date().setDate(new Date().getDate() + 30)) // Reset every 30 days
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  avatar: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Check if user changed password after JWT was issued
UserSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};

// Check if user has exceeded usage limit
UserSchema.methods.hasExceededUsageLimit = function() {
  return this.usageCount >= this.usageLimit;
};

// Reset usage count if needed
UserSchema.methods.resetUsageIfNeeded = function() {
  if (Date.now() >= this.resetUsageAt) {
    this.usageCount = 0;
    this.resetUsageAt = new Date(new Date().setDate(new Date().getDate() + 30));
    return true;
  }
  return false;
};

// Generate email verification token
UserSchema.methods.getEmailVerificationToken = function() {
  // Generate token
  const verificationToken = require('crypto').randomBytes(20).toString('hex');
  
  // Hash token and set to emailVerificationToken field
  this.emailVerificationToken = require('crypto').createHash('sha256').update(verificationToken).digest('hex');
  
  // Set expire time (1 hour)
  this.emailVerificationExpires = Date.now() + 60 * 60 * 1000;
  
  return verificationToken;
};

module.exports = mongoose.model('User', UserSchema);