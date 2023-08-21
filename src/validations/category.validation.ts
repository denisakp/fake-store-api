import Joi from "joi";

const createOrUpdateCategory = Joi.object({
    name: Joi.string().required().min(3)
});


export default createOrUpdateCategory;
