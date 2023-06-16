import Joi from "joi";

const productSchema = Joi.object({
    sku: Joi.string().required(),
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required()
})

export const validateOrderCreate = Joi.object({
    customer: Joi.string().required(),
    products: Joi.array().items(productSchema).required()
});

export const validateOrderUpdate = Joi.object({
    products: Joi.array().items(productSchema).required()
});

export const validateOrderLoading = Joi.object({
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    sort: Joi.string().optional(),
    direction: Joi.number().integer().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    startPrice: Joi.number().optional(),
    endPrice: Joi.number().when('startPrice', {
        is: Joi.exist(),
        then: Joi.number().min(Joi.ref('startPrice')).required(),
        otherwise: Joi.number().optional()
    })
})
