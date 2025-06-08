const express = require('express');
const router = express.Router();

const {
    verifyToken,
    isAdmin,
} = require('../middlewares/auth');

const {
    addToCart,
    getCartInfoByUser,
    updateCart,
    deleteSpecifiedProduct,
} = require('../controllers/CartController');

router.use(verifyToken);
router
    .post('/add-to-cart/:productId', addToCart)
    .get('/', getCartInfoByUser)
    .put('/update-cart/:productId', updateCart)
    .delete('/delete-cart-item/:productId', deleteSpecifiedProduct);

module.exports = router;