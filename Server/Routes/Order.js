const router = require('express').Router();
const Order = require('../DAL/Models/Order.js');
const { orderValidation } = require('../validations.js');

router.get('/', async (req, res) => {
    const orders = await Order.find();
    try {
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});


router.post('/createorder', async (req, res) => {
    const { error } = orderValidation(req.body);
    if (error) { return res.status(400).json({ error: { message: error.details[0].message } }); }
    const newOrder = new Order({
        userId: req.body.userId,
        cartItems: req.body.cartItems,
        totalPrice: req.body.totalPrice,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        city: req.body.city,
        address: req.body.address
    });
    try {
        await newOrder.save();
        res.send(newOrder);
    } catch (error) {
        res.status(500).send({ error: { message: error } });
    }
});

router.put('/changestatus', async (req, res) => {
    let order = await Order.findByIdAndUpdate({ _id: req.body._id }, { status: 'Sent' }, function (err, model) {
        if (err) {
            res.status(400).send(err)
        }
    });
    try {
        let savedOrder = await order.save();
        res.send(savedOrder)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/', (req, res) => {
    res.send('Hello')
});



module.exports = router;
