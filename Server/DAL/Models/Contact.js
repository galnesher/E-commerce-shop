const mongoose = require('mongoose');

const Contact = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Contact', Contact);