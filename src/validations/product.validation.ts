import Joi from "joi";

export const validateProductCreate = Joi.object({
    name: Joi.string().required().min(3),
    description: Joi.string().optional(),
    sku: Joi.string().optional(),
    stock: Joi.number().required().min(1).required(),
    price: Joi.number().min(1).required(),
    images: Joi.array().items(Joi.string()).optional(),
    categories: Joi.array().items(Joi.string()).optional(),
});

export const validateProductUpdate = Joi.object({
    name: Joi.string().optional().min(3),
    description: Joi.string().optional(),
    sku: Joi.string().optional(),
    stock: Joi.number().optional().min(1),
    price: Joi.number().min(1).optional(),
    images: Joi.array().items(Joi.string()).optional(),
    categories: Joi.array().items(Joi.string()).optional(),
});

export const loadProductValidation = Joi.object({
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    sort: Joi.string().optional(),
    direction: Joi.number().integer().optional(),
    minPrice: Joi.number().integer().optional().allow(null),
    maxPrice: Joi.number()
        .when('minPrice', {
            is: Joi.exist(),
            then: Joi.number().integer().min(Joi.ref('minPrice')).required(),
            otherwise: Joi.number().optional()
        }),

    q: Joi.string().optional().min(3)
})
