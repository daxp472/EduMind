const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: '../.env' });

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('Making first user an admin...');

User.findOne({}, {}, { sort: { 'createdAt': 1 } })
  .then(user => {
    if (user) {
      user.role = 'admin';
      return user.save();
    } else {
      console.log('No users found in database');
      process.exit(1);
    }
  })
  .then(updatedUser => {
    console.log(`User ${updatedUser.email} has been made an admin`);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error making user admin:', err);
    process.exit(1);
  });