const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_MAILER,
        pass: process.env.PASS_MAILER
    }
});

module.exports.transporter = transporter;;


