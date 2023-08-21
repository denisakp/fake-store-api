import Joi from "joi";

export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const registerValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
});

export const updatePasswordValidation =  Joi.object({
    current: Joi.string().required().label('current password'),
    password: Joi.string().min(8).required()
});
