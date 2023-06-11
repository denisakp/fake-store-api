import {NextApiRequest, NextApiResponse} from "next";
import {createOrUpdateCustomer} from "@/validations/customer.validation";
import {register} from "@/services/auth.service";
import transformResponse from "@/helpers/transform-response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const {error, value} = createOrUpdateCustomer.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation Error', message: error});

            const created = await register(value);

            res.status(200).json(transformResponse(created));
            break;
        default:
            res.status(405).json({message: 'Method not allowed'});
    }
}
