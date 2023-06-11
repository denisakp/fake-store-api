import {NextApiRequest, NextApiResponse} from "next";
import {loadOrder, updateOrder} from "@/services/orders.service";
import {createOrUpdateOrder} from "@/validations/order.validation";
import {deleteProduct} from "@/services/product.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const docRef: string = req.query.id as string;

    switch (req.method) {
        case 'GET':
            const order = await loadOrder(docRef);
            if(!order)
                res.status(400).json({message: "Order with reference '" + docRef + "' not found !"});

            res.json(order);
            break;
        case 'PATCH':
            const {error, value} = createOrUpdateOrder.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message});

            const updated = await updateOrder(docRef, value);
            if(!updated)
                res.status(400).json({ message: "Order with reference '" + docRef + "' not found !" });

            res.json(updated);
            break;
        case 'DELETE':
            const success = await deleteProduct(docRef);
            if(!success)
                res.status(400).json({message: "Order with reference '" + docRef + "' not found !"});

            res.status(204)
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
