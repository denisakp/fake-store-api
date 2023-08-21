import {NextApiRequest, NextApiResponse} from "next";
import {changePassword} from "@/services/auth.service";
import {updatePasswordValidation} from "@/validations/auth.validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'PATCH':
            const {error, value} = updatePasswordValidation.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation Error', message: error});

            const {current, password} = value;

            const created = changePassword(current, password);
            if (!created)
                res.status(400).json({message: 'Password does not match !'});

            res.status(204).json({});
            break;
        default:
            res.status(405).json({message: 'Method not allowed'});
    }
}
