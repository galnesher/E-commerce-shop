const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false
    },

    cartItems: [{
        _id: String,
        name: String,
        price: Number,
        count: Number,
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Active",
        required: true
    },
},
    {
        timestamps: true
    });

module.exports = new mongoose.model('Order', orderSchema);