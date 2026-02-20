const Preference = require('../models/Preference');

// @desc    Get user preferences
// @route   GET /api/preferences
// @access  Private
exports.getPreferences = async (req, res, next) => {
    try {
        let preference = await Preference.findOne({ user: req.user.id });

        if (!preference) {
            preference = await Preference.create({ user: req.user.id });
        }

        res.status(200).json({
            success: true,
            data: preference
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error retrieving preferences'
        });
    }
};

// @desc    Update user preferences
// @route   PUT /api/preferences
// @access  Private
exports.updatePreferences = async (req, res, next) => {
    try {
        const preference = await Preference.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            {
                new: true,
                runValidators: true,
                upsert: true
            }
        );

        res.status(200).json({
            success: true,
            data: preference
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error updating preferences'
        });
    }
};
