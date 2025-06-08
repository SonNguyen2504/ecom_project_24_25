const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    const { cartId } = req.params;
    const { address, phone, paymentMethod } = req.body;

    try {
        const cart = await Cart.findById(cartId);
        if(!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        const newOrder = new Order({
            user: req.user._id,
            orderItems: cart.cartItems,
            address,
            phone,
            paymentMethod,
            totalPrice: cart.total,
        });

        await newOrder.save();
        await Cart.findByIdAndDelete(cart._id);

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: newOrder,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user').populate('orderItems.product');

        return res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { address, phone, status } = req.body;

    if(!orderId) {
        return res.status(400).json({
            success: false,
            message: 'Order ID is required',
        });
    }

    try {
        const order = await Order.findById(orderId);

        console.log(order);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        order.address = address;
        order.phone = phone;
        order.status = status;

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Update order successful",
            data: order,
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

const deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    if(!orderId) {
        return res.status(400).json({
            success: false,
            message: 'Order ID is required',
        });
    }

    try {
        const order = await Order.findByIdAndDelete(orderId);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

const getListOrdersOfUser = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        return res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: err.message,
        });
    }
}

const getOrderById = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findById(orderId).populate('orderItems.product').populate('user');

        if(!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Order retrieved successfully',
            data: order,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    getListOrdersOfUser,
    getOrderById,
};