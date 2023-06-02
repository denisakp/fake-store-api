import {NextApiRequest, NextApiResponse} from "next";
import {loadProduct, updateProduct} from "@/services/product";
import {createProductValidation} from "@/pages/api/products/index";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const docRef: string = req.query.id as string;

    switch (req.method) {
        case 'GET':
            const product = await loadProduct(docRef);

            if (!product)
                res.status(400).json({message: "Not Found"});

            res.json(product);
            break;
        case 'PATCH':
            const {error, value} = createProductValidation.validate(req.body);

            if (error)
                res.status(400).json({error: 'Validation error', message: error.message});

            const updated = await updateProduct(docRef, value);

            res.json(updated);
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
