const router = require('express').Router();
const Product = require('../DAL/Models/Product.js');
const Categories = require('../DAL/Models/ProductCategories');
const { uploadProductValidation } = require('../validations');

router.get('/', async (req, res) => {
    const products = await Product.find();
    try {
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/getcategories', async (req, res) => {
    const categories = await Categories.find();
    try {
        return res.send(categories);
    } catch (error) {
        return res.status(500).send(error);
    }
});


//Need validate
router.post("/upload", async (req, res, next) => {
    const { error } = uploadProductValidation(req.body);
    if (error) { return res.status(400).json({ error: error.details[0].message }); }
    const newProduct = new Product({
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        shortDesc: req.body.shortDesc,
        longDesc: req.body.longDesc,
        category: req.body.category,
    });
    try {
        const savedProduct = await newProduct.save();
        res.json({ success: 'העלאת תמונה הושלמה בהצלחה' });

    } catch (error) {
        res.status(400).send(error);
    }
});

//filter by category
router.get('/:category', async (req, res) => {
    if (req.params.category) {
        let products = await Product.find();
        if (req.params.category === 'all') {
            res.send(products);
        } else {
            let filteredProducts = await products.filter(product => product.category === req.params.category);
            try {
                res.send(filteredProducts);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }
});

router.post(('/orderbyprice'), (req, res) => {
    if (req.body.selectedOrderByPrice) {
        if (req.body.selectedOrderByPrice === 'all') {
            res.send(req.body.products)
        } else if (req.body.selectedOrderByPrice === 'highest') {
            let orderedProducts = req.body.products.sort(function (a, b) {
                return b.price - a.price;
            });
            try {
                res.send(orderedProducts)
            } catch (error) {
                res.status(500).send(error);
            }
        } else {
            let orderedProducts = req.body.products.sort(function (a, b) {
                return a.price - b.price;
            });
            try {
                res.send(orderedProducts)
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }
})
router.post('/uploadcategory', async (req, res) => {
    const newCategory = new Categories({
        name: req.body.name
    });
    try {
        newCategory.save();
        res.send(newCategory);
    } catch (error) {
        res.status(400).send(false);
    }
});
var mongoose = require('mongoose');
router.delete('/delete', async (req, res) => {
    if (req.body.productId) {
        if (mongoose.Types.ObjectId.isValid(req.body.productId)) {
            await Product.findByIdAndRemove((req.body.productId), (err, doc) => {
                if (!err) {
                    res.send({ success: { message: "Product Deleted !" } });
                }
                else { res.status(400).json({ error: { message: err } }) }
            });
        } else { res.status(400).json({ error: { message: "Id is not mutch" } }) }
    } else {
        res.status(400).json({ error: { message: "product Id Missing" } })
    }
});


module.exports = router;
