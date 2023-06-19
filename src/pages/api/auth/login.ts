import {NextApiRequest, NextApiResponse} from "next";
import {loginValidation} from "@/validations/auth.validation";
import {login} from "@/services/auth.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const {error, value} = loginValidation.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation Error', message: error.message});

            const authenticated = login(value.email, value.password);
            if (!authenticated)
                res.status(400).json({message: 'Unknown credentials !'})

            res.status(200).json({token: authenticated})
            break;
        default:
            res.status(405).json({message: 'Method not allowed'});
    }
}
