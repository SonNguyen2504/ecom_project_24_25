const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderItems: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Card'],
        required: true,
        default: 'COD',
    },
    status: {
        type: String,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);