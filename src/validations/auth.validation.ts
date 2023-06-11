import Joi from "joi";

export const loginValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export const updatePasswordValidation =  Joi.object({
    current: Joi.string().required().label('current password'),
    new_password: Joi
        .string()
        .min(8)
        .valid(Joi.ref('current'))
        .label('password confirmation')
        .messages({
            'any.only': '{{#label}} does not match'
        })
        .required()
});
