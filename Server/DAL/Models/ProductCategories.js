//ProductCategories
const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    });
module.exports = new mongoose.model('Categories', categoriesSchema);