const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/edumind');

const checkSubscriptions = async () => {
  try {
    console.log('Checking subscriptions for expiration...');
    
    // Find users whose resetUsageAt has passed
    const users = await User.find({
      resetUsageAt: { $lte: new Date() }
    });
    
    let downgradeCount = 0;
    
    for (const user of users) {
      // Reset usage if needed
      if (user.resetUsageIfNeeded()) {
        await user.save();
        downgradeCount++;
        console.log(`Processed user ${user.email}`);
      }
    }
    
    console.log(`Subscription check completed. Processed ${downgradeCount} users.`);
    process.exit(0);
  } catch (error) {
    console.error('Error checking subscriptions:', error);
    process.exit(1);
  }
};

checkSubscriptions();