import {NextApiRequest, NextApiResponse} from "next";
import Joi from "joi";
import {createCategory, loadCategories} from "@/services/categories";
import toJson from "@/helpers/toJson";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            const categories = await loadCategories()
            res.json(toJson(categories))
            break;
        case 'POST':
            const {name} = req.body;
            const {error} = createCategoryValidation.validate(req.body)

            if (error)
                res.status(400).json({error: 'Validation Error', message: error})

            const category = await createCategory(name);
            res.json(category);
            break;
        default:
            return res.status(405).json({message: 'Method not allowed'})
    }
}

const createCategoryValidation = Joi.object({
    name: Joi.string().required().min(3)
})
