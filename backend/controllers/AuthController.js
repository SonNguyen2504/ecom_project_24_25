const User = require('../models/User');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, password, email, phoneNumber } = req.body;

    try {
        const oldUser = await User.findOne({ username });

        if(oldUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            });
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPass,
            email,
            phoneNumber,
        });
        await newUser.save();
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message, 
        });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            })
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password',
            });
        }
        const token = jwt.sign(
            { userId: user._id},
            process.env.TOKEN_KEY,
            { expiresIn: '1h' } 
        )
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
}

module.exports = {
    register, 
    login 
};