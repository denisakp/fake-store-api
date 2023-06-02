import {NextApiRequest, NextApiResponse} from "next";
import {loadCategory, updateCategory} from "@/services/categories";
import toJson from "@/helpers/toJson";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const id: string = req.query.id as string

    switch (req.method) {
        case 'GET':
            const product = await loadCategory(id);
            if(!product)
                res.status(400).json({ message: 'Category with id: '+id+' not found !'});
            else
                res.json(toJson(product));
            break;
        case 'PATCH':
            const { name } = req.body;

            const updated = await updateCategory(id, name)

            if(!updated)
                res.status(400).json({ message: 'Failed to update resource with id: '+id});
            else
                res.json(updated)
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
