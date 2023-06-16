import {NextApiRequest, NextApiResponse} from "next";
import {register} from "@/services/auth.service";
import transformResponse from "@/helpers/transform-response";
import {registerValidation} from "@/validations/auth.validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const {error, value} = registerValidation.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation Error', message: error});

            const created = register(value);

            res.status(201).json(transformResponse(created));
            break;
        default:
            res.status(405).json({message: 'Method not allowed'});
    }
}
