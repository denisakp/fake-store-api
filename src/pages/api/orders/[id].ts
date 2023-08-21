import {NextApiRequest, NextApiResponse} from "next";
import {deleteOrder, loadOrder, updateOrder} from "@/services/orders.service";
import {validateOrderUpdate} from "@/validations/order.validation";
import transformResponse from "@/helpers/transform-response";
import {METHOD_NOT_ALLOWED, RESOURCE_NOT_FOUND} from "@/exceptions/database.exception";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const docRef: string = req.query.id as string;

    switch (req.method) {
        case 'GET':
            try {
                const order = loadOrder(docRef);
                if(!order)
                    res.status(400).json({message: RESOURCE_NOT_FOUND(docRef)});
                res.json(transformResponse(order));
            } catch (e: any) {
                res.status(400).json({message: e.message})
            }
            break;
        case 'PATCH':
            const {error, value} = validateOrderUpdate.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message});

            try {
                const updated =  updateOrder(docRef, value);
                if(!updated)
                    res.status(400).json({ message:  RESOURCE_NOT_FOUND(docRef) });
                res.json(transformResponse(updated));
            } catch (e: any) {
                res.status(422).json({error: 'Validation error', message: e.message})
            }
            break;
        case 'DELETE':
            try {
                const success =  deleteOrder(docRef);
                if(!success)
                    res.status(400).json({message:  RESOURCE_NOT_FOUND(docRef)});

                res.status(204).json(docRef)
            } catch (e: any) {
                res.status(422).json({error: 'Validation error', message: e.message})
            }

            break;
        default:
            res.status(405).json({message: METHOD_NOT_ALLOWED})
    }
}
