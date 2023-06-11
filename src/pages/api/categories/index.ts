import {NextApiRequest, NextApiResponse} from "next";
import toJson from "@/helpers/transform-response";
import {createCategory, loadCategories} from "@/services/categories.service";
import createOrUpdateCategory from "@/validations/category.validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            const categories = await loadCategories()
            res.json(toJson(categories))
            break;
        case 'POST':
            const {name} = req.body;
            const {error} = createOrUpdateCategory.validate(req.body)

            if (error)
                res.status(400).json({error: 'Validation Error', message: error})

            const category = createCategory(name);
            res.json(category);
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}


