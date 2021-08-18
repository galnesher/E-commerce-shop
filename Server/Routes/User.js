const router = require('express').Router();
const User = require('../DAL/Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');
const { loginValidation, registerValidation } = require('../validations');
const { transporter } = require('../nodeMailer');
const Order = require('../DAL/Models/Order');
const Subscribe = require('../DAL/Models/Subscribe');
const Contact = require('../DAL/Models/Contact');


router.get('', async (req, res) => {
    const users = await User.find();
    try {
        res.json(users);
    } catch (error) {
        res.status(500).send('Error' + error);
    }
});

router.get('/contacts', async (req, res) => {
    const contacts = await Contact.find();
    try {
        res.json(contacts);
    } catch (error) {
        res.status(500).send('Error' + error);
    }
});
router.get('/subscribes', async (req, res) => {
    const subscribes = await Subscribe.find();
    try {
        res.json(subscribes);
    } catch (error) {
        res.status(500).send('Error' + error);
    }
});

router.post('/register', async (req, res) => {
    //Validate data
    const { error } = registerValidation(req.body);

    if (error) {
        let message = error.details[0].message;
        return res.status(400).json({ error: { message: message } });
    }
    const emailExist = await User.findOne({ emailAddress: req.body.emailAddress });
    if (emailExist) { return res.status(400).json({ error: { message: 'Email Address alrady exist' } }); }
    //Hash password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const role = req.body.role == 'Admin' ? 'Admin' : 'User';
    let verificationCode = (Math.floor(Math.random() * 9999) + 111).toString();
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hashedPassword,
        role: role,
        verificationCode: verificationCode,//need to generate some code
        isValidUser: false
    });
    try {
        await user.save();
        let mailOptions = {
            from: 'dorromano2020@gmail.com',
            to: req.body.emailAddress,
            subject: 'Code Verification Ecommerce-System',
            text: 'Your Verification Code: ' + verificationCode
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Verification Code: ' + verificationCode + ' Email sent: ' + info.response);
            }
        });
        res.send({ success: { message: "Register Successfully" } });
    } catch (error) {
        res.status(500).json({ error: { message: error } });
    }
});


router.put('/verification', async (req, res) => {
    if (req.body.verificationCode) {
        const user = await User.findOne({ emailAddress: req.body.emailAddress });
        if (!user) { return res.status(401).json('Email Address is not found.'); }
        if (user.verificationCode === req.body.verificationCode) {
            user.isValidUser = true;
            console.log(user.isValidUser)
            const savedUser = await user.save();
            console.log(savedUser);
            res.send(true)
        } else {
            res.status(401).send(false);
        }
    }
});


router.post('/login', async (req, res) => {
    //Validate data
    const { error } = loginValidation(req.body);
    if (error) { return res.status(400).json(error.details[0].message); }
    const user = await User.findOne({ emailAddress: req.body.emailAddress });
    if (!user) {
        return res.status(401).json('Email Address is not found.');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) { return res.status(401).json('Invalid Password.') };
    if (user.isValidUser === true) {
        //Create Token
        const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
        return res.json({ token, user });
    } else {
        return res.status(400).json('Unverified User');      //check status code
    }
});



router.delete('/deletebyid', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.body._id)
        res.send(user);
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/checkToken', verify, async (req, res) => {
    if (!req.header('token')) {
        return res.json(false);
    }
    try {
        res.send(true);
    } catch (error) {
        res.status(500).send(false)
    }
});

router.post('/checkrole', verify, async (req, res) => {
    if (!req.header('token')) {
        return res.json(false);
    }
    const userVerified = jwt.verify(req.header('token'), process.env.TOKEN_SECRET);
    if (userVerified) {
        let user = await User.find({ _id: userVerified._id });
        if (user[0].role === "Admin") {
            res.json(true)
        } else {
            res.status(400).send(false)
        }

    } else {
        res.status(400).send(false)
    }
});

router.post('/myOrders', async (req, res) => {
    if (req.body._id) {
        try {
            let order = await Order.find({ userId: req.body._id });
            res.send(order)
        }
        catch (error) {
            res.send(error);
        }
    }
});

router.post('/subscribe', async (req, res) => {
    if (req.body.emailAddress) {
        const subscribe = new Subscribe({
            emailAddress: req.body.emailAddress
        });
        try {
            await subscribe.save();
            return res.json({ success: { message: "Thank you for being a member" } })
        } catch (error) {
            return res.status(500).json({ error: { message: error } })
        }
    } else {
        return res.status(404).json({ error: { message: "Email Address missing." } })
    }
});

router.post('/contact', async (req, res) => {
    if (req.body.name && req.body.emailAddress && req.body.subject && req.body.message) {
        const contact = new Contact({
            name: req.body.name,
            emailAddress: req.body.emailAddress,
            subject: req.body.subject,
            message: req.body.message
        });
        try {
            await contact.save();
            return res.json({ success: { message: "Thank you for contact us." } })
        } catch (error) {
            return res.status(500).json({ error: { message: error } })
        }
    } else {
        return res.status(500).json({ error: { message: "Please make sure all fields are filled" } })
    }

});



module.exports = router;
