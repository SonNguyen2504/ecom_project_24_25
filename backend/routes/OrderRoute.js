const express = require('express');
const router = express.Router();

const {
    verifyToken,
    isAdmin,
} = require('../middlewares/auth');

const {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    getListOrdersOfUser,
    getOrderById,
} = require('../controllers/OrderController');

router.get('/all-orders', getAllOrders, verifyToken, isAdmin);

router.use(verifyToken);
router
    .post('/create-order/:cartId', createOrder)
    .get('/list-orders', getListOrdersOfUser)
    .get('/:orderId', getOrderById);

router.use(isAdmin);
router
    .put('/update-order-status/:orderId', updateOrderStatus)
    .delete('/delete-order/:orderId', deleteOrder);

module.exports = router;