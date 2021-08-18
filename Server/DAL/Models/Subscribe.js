const mongoose = require('mongoose');

const Subscribe = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Subscribe', Subscribe);