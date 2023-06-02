import {NextApiRequest, NextApiResponse} from "next";
import Joi from "joi";
import {createProduct, loadProducts} from "@/services/product";
import PaginationResponse from "@/helpers/pagination-response";
import toJson from "@/helpers/toJson";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const limit = Number(req.query?.limit) ?? 25
            const page = Number(req.query?.page) ?? 1
            const minPrice = Number(req.query?.minPrice)
            const maxPrice = Number(req.query?.maxPrice)
            const keyword = req.query?.keyword as string
            const sortField = req.query?.sortFiled as string
            const sortOrder = Number(req?.query.sortOrder)

            if (Object.keys(req.query).length > 0) {
                const {error} = loadProductValidation.validate(req.query);

                if (error)
                    res.status(400).json({error: 'Validation error', message: error.message})
            }

            const {result, countDocs} = await loadProducts({
                limit: limit,
                page: page,
                min: minPrice,
                max: maxPrice,
                keyword: keyword,
                sortField: sortField,
                sortOrder: sortOrder,
            });

            res.json(PaginationResponse(req, limit, page, countDocs, result))
            break;
        case 'POST':
            const {error, value} = createProductValidation.validate(req.body);

            if (error)
                res.status(400).json({error: 'Validation error', message: error.message})

            try {
                const product = await createProduct(value);
                res.json(toJson(product))
            } catch (e: any) {
                res.status(500).json({message: e.message})
            }
            break;
        default:
            return res.status(405).json({message: 'Method not allowed'})
    }
}

const loadProductValidation = Joi.object({
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
    sortField: Joi.string().optional(),
    sortOrder: Joi.number().integer().optional(),
    minPrice: Joi.number().integer().optional().allow(null),
    maxPrice: Joi.number()
        .when('minPrice', {
            is: Joi.exist(),
            then: Joi.number().integer().min(Joi.ref('minPrice')).required(),
            otherwise: Joi.number().optional()
        }),

    keyword: Joi.string().optional().min(3)
})

export const createProductValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    quantity: Joi.number().integer().min(1).required(),
    price: Joi.number().integer().min(1).required(),
    thumbnail: Joi.string().optional(),
    images: Joi.string().optional(),
    tags: Joi.string().optional()
})
