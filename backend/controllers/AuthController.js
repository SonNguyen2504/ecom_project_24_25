const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const register = async (req, res) => {
    const { username, password, email, phoneNumber } = req.body;

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPass,
            email,
            phoneNumber,
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (err) {
        res.status(500).json({
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
            res.status(401).json({
                success: false,
                message: 'User not found',
            })
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword) {
            res.status(400).json({
                success: false,
                message: 'Invalid password',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Login successful',
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message
        });
    }
}

module.exports = { register, login };