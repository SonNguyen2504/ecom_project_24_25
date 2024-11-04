const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied, token required',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findOne({ _id: decoded.userId });
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

module.exports = { verifyToken };