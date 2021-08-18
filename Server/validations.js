//Validation
const Joi = require('joi');


//Register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(2)
            .required(),
        lastName: Joi.string()
            .min(2)
            .required(),
        emailAddress: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        role: Joi.string()
            .required(),

    });
    return schema.validate(data)
}


//Login validation
const loginValidation = (data) => {
    const schema = Joi.object({
        emailAddress: Joi.string()
            .min(6)
            .email()
            .required(),
        password: Joi.string()
            .min(6)
            .required()

    });
    return schema.validate(data);
}


const orderValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.string().allow('').required(),
        cartItems: Joi.array()
            .required(),
        totalPrice: Joi.number()
            .required(),
        firstName: Joi.string()
            .min(2)
            .required(),
        lastName: Joi.string().min(2)
            .required(),
        emailAddress: Joi.string()
            .min(6)
            .email()
            .required(),
        phoneNumber: Joi.string()
            .min(10)
            .required(),
        city: Joi.string().min(2)
            .required(),
        address: Joi.string().min(2)
            .required()
    })
    return schema.validate(data)
}


const uploadProductValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(25)
            .required(),
        imageUrl: Joi.string().min(2)
            .required(),
        price: Joi.number()
            .required(),
        shortDesc: Joi.string().min(2).max(100)
            .required(),
        longDesc: Joi.string().min(2).max(1000)
            .required(),
        category: Joi.string().min(2).max(25)
            .required(),
    })
    return schema.validate(data)

}




module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.orderValidation = orderValidation;
module.exports.uploadProductValidation = uploadProductValidation;