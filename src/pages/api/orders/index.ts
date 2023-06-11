import {NextApiRequest, NextApiResponse} from "next";
import transformResponse from "@/helpers/transform-response";
import {createOrUpdateOrder, loadOrderValidation} from "@/validations/order.validation";
import {createOrder, loadOrders} from "@/services/orders.service";
import {DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE, DEFAULT_SORT_DIRECTION,} from "@/helpers/constants";
import PaginationResponse from "@/helpers/pagination-response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (Object.keys(req.query).length > 0) {
                const {error} = loadOrderValidation.validate(req.query);
                if (error)
                    res.status(422).json({error: 'Validation error', message: error.message})
            }

            const parameter = {
                limit: Number(req.query?.limit) ?? DEFAULT_PAGINATION_LIMIT,
                page: Number(req.query?.page) ?? DEFAULT_PAGINATION_PAGE,
                sort: req.query?.sort as string ?? 'created_datetime',
                direction: Number(req?.query.order) ?? DEFAULT_SORT_DIRECTION,
                startDate: new Date('2023-06-01'),
                endDate: new Date('2023-06-30'),
                startPrice: Number(req.query?.startPrice),
                endPrice: Number(req.query?.endPrice),
            }

            const {orders, total} = await loadOrders(parameter);

            res.json(PaginationResponse({
                req,
                page: parameter.page,
                limit: parameter.limit,
                count: total,
                data: orders
            }));
            break;
        case 'POST':
            const {error, value} = createOrUpdateOrder.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message})

            const order = await createOrder(value);

            res.json(transformResponse(order));
            break;
        default:
            return res.status(405).json({message: 'Method not allowed'})
    }
}
