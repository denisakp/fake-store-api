import {NextApiRequest, NextApiResponse} from "next";
import {createCategory, loadCategories} from "@/services/categories.service";
import createOrUpdateCategory from "@/validations/category.validation";
import transformResponse from "@/helpers/transform-response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            try {
                const categories = await loadCategories();
                res.json(transformResponse(categories))
            } catch (e: any) {
                res.status(500).json({message: e.message})
            }
            break;
        case 'POST':
            const {name} = req.body;

            const {error} = createOrUpdateCategory.validate(req.body)
            if (error)
                res.status(422).json({error: 'Validation Error', message: error})

            const category = createCategory(name);

            res.json(transformResponse(category));
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}


