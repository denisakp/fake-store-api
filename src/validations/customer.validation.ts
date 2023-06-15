import Joi from "joi";
export const loadCustomerValidation = Joi.object({
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    sort: Joi.string().optional(),
    direction: Joi.number().integer().optional(),
    q: Joi.string().min(3).optional(),
})

export const validateCustomerCreate = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8),
    name: Joi.string().required()
});

const addressValidation = Joi.object({
    city: Joi.string().optional(),
    street: Joi.string().optional(),
    zip_code: Joi.string().optional(),
    country: Joi.string().optional(),
    phone: Joi.string().optional(),
    number: Joi.number().optional(),
})

export const validateUploadCustomer = Joi.object({
    email: Joi.string().email().optional(),
    name: Joi.string().optional(),
    address: Joi.object({
        delivery: Joi.array().items(addressValidation).optional(),
        billing: Joi.array().items(addressValidation).optional()
    }).optional(),
})
