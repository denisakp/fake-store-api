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
import {createOrUpdateProduct, loadProductValidation} from "@/validations/product.validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (Object.keys(req.query).length > 0) {
                const {error} = loadProductValidation.validate(req.query);
                if (error)
                    res.status(400).json({error: 'Validation error', message: error.message})
            }

            const parameter = {
                limit: Number(req.query?.limit) ?? DEFAULT_PAGINATION_LIMIT,
                page: Number(req.query?.page) ?? DEFAULT_PAGINATION_PAGE,
                min: Number(req.query?.minPrice),
                max: Number(req.query?.maxPrice),
                q: req.query?.q as string,
                sort: req.query?.sort as string ?? DEFAULT_SORT_FIELD,
                direction: Number(req?.query.order) ?? DEFAULT_SORT_DIRECTION,
            }

            const {products, total} = await loadProducts(parameter);

            res.json(PaginationResponse({
                req,
                page: parameter.page,
                limit: parameter.limit,
                count: total,
                data: products
            }))
            break;
        case 'POST':
            const {error, value} = createOrUpdateProduct.validate(req.body);

            if (error)
                res.status(400).json({error: 'Validation error', message: error.message})

            const product = await createProduct(value);
            res.json(transformResponse(product));
            break;
        default:
            return res.status(405).json({message: 'Method not allowed'})
    }
}



