const User = require('../models/User');

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();

        res.status(200).json({
            success: true,
            message: 'Get all user successfully',
            data: allUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

module.exports = { getAllUser };