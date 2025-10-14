const User = require('../models/User');

// Grant access to admin only
exports.admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Server error checking admin authorization'
    });
  }
};