const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const calculateTotalPrice = async (cartItems) => {
    let totalPrice = 0;

    for (let item of cartItems) {
        const product = await Product.findById(item.product);
        totalPrice += product.price * item.quantity;
    }

    return totalPrice;
}

const addToCart = async (req, res) => {
    const { productId } = req.params;

    if(!productId) {
        return res.status(400).json({
            success: false,
            message: 'Product ID is required',
        });
    }

    try {
        const product = await Product.findById(productId);

        console.log(product);
        
        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if(!cart) {
            cart = await Cart.create({
                user: req.user._id,
                cartItems: [{ product: productId }],
            });
        } else {
            let item = cart.cartItems.find(c => c.product == productId);
            if(item) {
                item.quantity += 1;
            } else {
                cart.cartItems.push({ product: productId });
            }
        }
        cart.total = await calculateTotalPrice(cart.cartItems);

        console.log('cart: '+ cart);
        console.log('total: '+ cart.total);
        await cart.save();
        return res.status(200).json({
            success: true,
            message: `Add product ${product.name} to cart of ${req.user._id} successfully`,
            data: cart,
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

const getCartInfoByUser = async(req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if(!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Get cart info by user successfully',
            data: cart,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

module.exports = {
    addToCart,
    getCartInfoByUser,
}