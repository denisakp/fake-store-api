import {NextApiRequest, NextApiResponse} from "next";
import {loadCustomer, updateCustomer} from "@/services/customers.service";
import transformResponse from "@/helpers/transform-response";
import {validateUploadCustomer} from "@/validations/customer.validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const docRef: string = req.query.id as string;

    switch (req.method) {
        case 'GET':
            try {
                const customer = await loadCustomer(docRef);
                if (!customer)
                    res.status(400).json({message: "Customer with reference '" + docRef + "' not found !"});

                res.json(transformResponse(customer));
            } catch (e: any) {
                res.status(400).json({message: e.message})
            }
            break;
        case 'PATCH':
            const {error, value} = validateUploadCustomer.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message});

            try {
                const updated = updateCustomer(docRef, value);
                if (!updated)
                    res.status(400).json({message: "Customer with reference '" + docRef + "' not found !"});

                res.json(transformResponse(updated));
            }catch (e: any) {
                res.status(400).json({message: e.message})
            }
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
