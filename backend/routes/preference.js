const express = require('express');
const { getPreferences, updatePreferences } = require('../controllers/preference');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All preference routes are protected

router.route('/')
    .get(getPreferences)
    .put(updatePreferences);

module.exports = router;
