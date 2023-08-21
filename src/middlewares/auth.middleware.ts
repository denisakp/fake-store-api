import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import {DEFAULT_JWT_SECRET} from "@/helpers/constants";

export default function authMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
    const header = req.headers['authorization'] as string;
    if(!header)
        res.status(401).json({message: 'Unauthenticated request !'});

    const token = header.split(' ')[1];
    jwt.verify(token, DEFAULT_JWT_SECRET, (error, sub) => {
        if (error)
            res.status(403)
        next();
    })
}
