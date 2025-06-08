const Feedback = require('../models/Feedback');

const createFeedback = async (req, res) => {
    try {
        const { productId } = req.params;
        const { rating, comment } = req.body;

        if(!rating || !comment) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const newFeedback = new Feedback({
            user: req.user._id,
            product: productId,
            rating,
            comment,
        })

        await newFeedback.save();

        return res.status(200).json({
            success: true,
            message: 'Create feedback successfully',
            data: newFeedback,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getFeedbacksByProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const feedbacks = await Feedback.find({ product: productId })
            .populate('user')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: feedbacks,
        });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createFeedback,
    getFeedbacksByProduct,
}