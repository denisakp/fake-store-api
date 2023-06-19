import {NextApiRequest, NextApiResponse} from "next";
import PaginationResponse from "@/helpers/pagination-response";
import {createProduct, loadProducts} from "@/services/product.service";
import transformResponse from "@/helpers/transform-response";
import {
    DEFAULT_PAGINATION_LIMIT,
    DEFAULT_PAGINATION_PAGE,
    DEFAULT_SORT_DIRECTION,
    DEFAULT_SORT_FIELD
} from "@/helpers/constants";
import {loadProductValidation, validateProductCreate} from "@/validations/product.validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (Object.keys(req.query).length > 0) {
                const {error} = loadProductValidation.validate(req.query);
                if (error)
                    res.status(422).json({error: 'Validation error', message: error.message})
            }

            const parameter = {
                limit: req.query?.limit ? Number(req.query.limit) : DEFAULT_PAGINATION_LIMIT,
                page: req.query?.page ? Number(req.query.page) : DEFAULT_PAGINATION_PAGE,
                min: req.query?.minPrice ?  Number(req.query.minPrice) : undefined,
                max: req.query?.maxPrice ? Number(req.query.maxPrice) : undefined,
                q: req.query?.q ? req.query.q  as string : undefined,
                sort: req.query?.sort ? req.query.sort as string : DEFAULT_SORT_FIELD,
                direction: req.query?.sort ? Number(req.query.order) : DEFAULT_SORT_DIRECTION,
            }

            try {
                const {products, total} = await loadProducts(parameter);

                res.status(200).json(PaginationResponse({
                    req,
                    page: parameter.page,
                    limit: parameter.limit,
                    count: total,
                    data: products
                }))
            } catch (err: any) {
                res.status(500).json({ message: err.message})
            }
            break;
        case 'POST':
            const {error, value} = validateProductCreate.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message})

            const product = createProduct(value);

            res.status(201).json(transformResponse(product))
            break;
        default:
            return res.status(405).json({message: 'Method not allowed'})
    }
}



