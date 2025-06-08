const express = require('express');
const router = express.Router();

const { 
    verifyToken,
    isAdmin
} = require('../middlewares/auth');

const {
    createFeedback,
    getFeedbacksByProduct,
} = require('../controllers/FeedbackController');

router
    .get('/:productId', getFeedbacksByProduct);

router.use(verifyToken);
router
    .post('/:productId', createFeedback);

module.exports = router;