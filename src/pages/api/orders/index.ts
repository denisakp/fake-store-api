import {NextApiRequest, NextApiResponse} from "next";
import transformResponse from "@/helpers/transform-response";
import {validateOrderCreate, validateOrderLoading} from "@/validations/order.validation";
import {createOrder, loadOrders} from "@/services/orders.service";
import {DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE} from "@/helpers/constants";
import PaginationResponse from "@/helpers/pagination-response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (Object.keys(req.query).length > 0) {
                const {error} = validateOrderLoading.validate(req.query);
                if (error)
                    res.status(422).json({error: 'Validation error', message: error.message})
            }

            const parameter = {
                limit: req.query?.limit ? Number(req.query.limit) : DEFAULT_PAGINATION_LIMIT,
                page: req.query?.page ? Number(req.query.page) : DEFAULT_PAGINATION_PAGE,
                startDate: new Date('2023-06-01'),
                endDate: new Date('2023-06-30'),
                startPrice: req.query?.startPrice ? Number(req.query.startPrice) : undefined,
                endPrice: req.query?.endPrice ? Number(req.query?.endPrice) : undefined,
            }

            try {
                const {orders, total} = await loadOrders(parameter);

                res.status(200).json(PaginationResponse({
                    req,
                    page: parameter.page,
                    limit: parameter.limit,
                    count: total,
                    data: orders
                }));
            }catch (e: any) {
                res.status(500).json({message: e.message})
            }
            break;
        case 'POST':
            const {error, value} = validateOrderCreate.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message})

            try {
                const order = createOrder(value);

                res.status(201).json(transformResponse(order));
            } catch (e: any) {
                res.status(422).json({error: 'Validation error', message: e.message})
            }
            break;
        default:
            return res.status(405).json({message: 'Method not allowed'})
    }
}
