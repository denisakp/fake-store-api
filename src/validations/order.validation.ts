import Joi from "joi";

export const createOrUpdateOrder = Joi.object({
    customer: Joi.string().required(),
    products: Joi
        .array()
        .items(Joi.object({
            sku: Joi.string().required(),
            name: Joi.string().required(),
            quantity: Joi.number().required(),
            price: Joi.number().required()
        }))
        .required()
});

export const loadOrderValidation = Joi.object({
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    sort: Joi.string().optional(),
    direction: Joi.number().integer().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    totalPrice: Joi.number().optional()
})
