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
        case 'free': return process.env.FREE_PLAN_LIMIT || 100;
        case 'student': return process.env.STUDENT_PLAN_LIMIT || 1000;
        case 'pro': return process.env.PRO_PLAN_LIMIT || 5000;
        case 'ultra': return process.env.ULTRA_PLAN_LIMIT || 20000;
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
  // Student verification fields
  studentIdCard: {
    type: String
  },
  studentIdCardSelfie: {
    type: String
  },
  studentVerificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  studentVerificationRequestedAt: {
    type: Date
  },
  avatar: {
    type: String
  },
  // Academic Information
  academicInfo: {
    institution: {
      type: String,
      trim: true
    },
    major: {
      type: String,
      trim: true
    },
    degree: {
      type: String,
      trim: true
    },
    year: {
      type: String,
      trim: true
    },
    gpa: {
      type: Number,
      min: 0,
      max: 4.0
    },
    location: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, 'Bio cannot be more than 500 characters']
    }
  },
  // Achievements
  achievements: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      icon: {
        type: String
      },
      points: {
        type: Number,
        default: 0
      },
      category: {
        type: String
      },
      earnedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  // Recent Activity
  recentActivity: [
    {
      type: {
        type: String,
        required: true,
        enum: ['summary_created', 'quiz_completed', 'note_added', 'achievement_earned', 'study_session', 'ai_tool_used', 'login']
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  ],
  // Study Hours Tracking
  studyStats: {
    totalHours: {
      type: Number,
      default: 0
    },
    totalSessions: {
      type: Number,
      default: 0
    },
    averageProductivity: {
      type: Number,
      default: 0
    },
    subjectStats: {
      type: Map,
      of: {
        hours: { type: Number, default: 0 },
        sessions: { type: Number, default: 0 }
      }
    }
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

// Add achievement to user
UserSchema.methods.addAchievement = function(achievement) {
  this.achievements.push(achievement);
  return this.save();
};

// Add activity to user
UserSchema.methods.addActivity = function(activity) {
  // Keep only the last 50 activities
  if (this.recentActivity.length >= 50) {
    this.recentActivity.shift();
  }
  this.recentActivity.push(activity);
  return this.save();
};

// Update study stats
UserSchema.methods.updateStudyStats = function(subject, hours, sessions = 1) {
  this.studyStats.totalHours += hours;
  this.studyStats.totalSessions += sessions;
  
  // Update subject stats
  if (!this.studyStats.subjectStats) {
    this.studyStats.subjectStats = new Map();
  }
  
  const subjectStat = this.studyStats.subjectStats.get(subject) || { hours: 0, sessions: 0 };
  subjectStat.hours += hours;
  subjectStat.sessions += sessions;
  this.studyStats.subjectStats.set(subject, subjectStat);
  
  // Update average productivity (simplified calculation)
  if (this.studyStats.totalSessions > 0) {
    this.studyStats.averageProductivity = Math.min(100, (this.studyStats.totalHours / this.studyStats.totalSessions) * 10);
  }
  
  return this.save();
};

module.exports = mongoose.model('User', UserSchema);