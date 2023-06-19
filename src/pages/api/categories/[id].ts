import {NextApiRequest, NextApiResponse} from "next";
import {loadCategory, updateCategory} from "@/services/categories.service";
import createOrUpdateCategory from "@/validations/category.validation";
import transformResponse from "@/helpers/transform-response";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const docRef: string = req.query.id as string

    switch (req.method) {
        case 'GET':
            try {
                const category = loadCategory(docRef);
                if(!category)
                    res.status(400).json({message: "Category with reference '" + docRef + "' not found !"});

                res.json(transformResponse(category));
            } catch (e:any) {
                res.status(422).json({error: "Validation Error", message: e.message})
            }
            break;
        case 'PATCH':
            const { name } = req.body;

            const {error} = createOrUpdateCategory.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation Error', message: error});

            try {
                const updated = updateCategory(docRef, name);
                if(!updated)
                    res.status(400).json({message: "Category with reference '" + docRef + "' not found !"});

                res.json(transformResponse(updated));
            }catch (e: any) {
                res.status(422).json({message: e.message})
            }
            break;
        default:
            res.status(405).json({message: 'Method not allowed'});
    }
}
