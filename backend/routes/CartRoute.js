const express = require('express');
const router = express.Router();

const {
    verifyToken,
    isAdmin,
} = require('../middlewares/auth');

const {
    addToCart,
    getCartInfoByUser,
} = require('../controllers/CartController');

router.use(verifyToken);
router.post('/add-to-cart/:productId', addToCart);
router.get('/', getCartInfoByUser);

module.exports = router;