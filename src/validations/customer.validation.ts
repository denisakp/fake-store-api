import Joi from "joi";
export const loadCustomerValidation = Joi.object({
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    sort: Joi.string().optional(),
    direction: Joi.number().integer().optional(),
    q: Joi.string().min(3).optional(),
})

export const createOrUpdateCustomer = Joi.object({});

