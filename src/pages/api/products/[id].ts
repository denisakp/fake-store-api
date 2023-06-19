import {NextApiRequest, NextApiResponse} from "next";
import {deleteProduct, loadProduct, updateProduct} from "@/services/product.service";
import {validateProductUpdate} from "@/validations/product.validation";
import transformResponse from "@/helpers/transform-response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const docRef: string = req.query.id as string;

    switch (req.method) {
        case 'GET':
            try {
                const product = await loadProduct(docRef);
                if (!product)
                    res.status(400).json({message: "Product with reference '" + docRef + "' not found !"});

                res.json(transformResponse(product));
            } catch (e: any) {
                res.status(422).json({message: e.message})
            }
            break;
        case 'PATCH':
            const {error, value} = validateProductUpdate.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message});

            try {
                const updated = updateProduct(docRef, value);
                if (!updated)
                    res.status(400).json({message: "Product with reference '" + docRef + "' not found !"});

                res.json(transformResponse(updated));
            } catch (e: any) {
                res.status(400).json({error: "Validation error", message: e.message})
            }
            break;
        case 'DELETE':
            try {
                const success = await deleteProduct(docRef);
                if (!success)
                    res.status(400).json({message: "Product with reference '" + docRef + "' not found !"});

                res.status(204).json(docRef);
            } catch (e: any) {
                res.status(422).json({error: "Validation error", message: e.message})
            }
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
