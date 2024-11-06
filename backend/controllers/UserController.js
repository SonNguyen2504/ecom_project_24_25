const User = require('../models/User');

const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();

        return res.status(200).json({
            success: true,
            message: 'Get all user successfully',
            data: allUser,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

const createUser = async (req, res) => {
    const { username, password, email, phoneNumber, role } = req.body;

    try {
        const newUser = new User({
            username,
            password,
            email,
            phoneNumber,
            role,
        });

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: 'Create user successfully',
            data: newUser,
        });
    } catch(err) {
        return res.status(500).json(
            {
                success: false,
                message: err.message
            }
        )
    }
}

module.exports = {
    getAllUser,
    createUser, 
};