import {NextApiRequest, NextApiResponse} from "next";
import toJson from "@/helpers/transform-response";
import {loadCategory, updateCategory} from "@/services/categories.service";
import createOrUpdateCategory from "@/validations/category.validation";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const docRef: string = req.query.id as string

    switch (req.method) {
        case 'GET':
            const product = await loadCategory(docRef);
            if(!product)
                res.status(400).json({message: "Category with reference '" + docRef + "' not found !"});

            res.json(toJson(product));
            break;
        case 'PATCH':
            const { name } = req.body;

            const {error} = createOrUpdateCategory.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation Error', message: error});

            const updated = updateCategory(docRef, name);
            if(!updated)
                res.status(400).json({message: "Category with reference '" + docRef + "' not found !"});

            res.json(updated);
            break;
        default:
            res.status(405).json({message: 'Method not allowed'});
    }
}
