const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 255

    },
    emailAddress: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    role: {
        type: String,
        required: true,
    },
    verificationCode: {
        type: String,
        required: true,
    },
    isValidUser: {
        type: Boolean,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Users', User);