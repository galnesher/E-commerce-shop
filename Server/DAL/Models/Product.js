const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "none",
        required: true
    },
    imageUrl:
    {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        default: "none",
        required: true
    },
    longDesc: {
        type: String,
        default: "none",
        required: true
    },

},
    {
        timestamps: true
    });
module.exports = new mongoose.model('Product', productSchema);