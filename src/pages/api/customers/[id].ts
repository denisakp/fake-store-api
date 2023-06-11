import {NextApiRequest, NextApiResponse} from "next";
import {loadCustomer, updateCustomer} from "@/services/customers.service";
import transformResponse from "@/helpers/transform-response";
import {createOrUpdateCustomer} from "@/validations/customer.validation";
import {loadOrderValidation} from "@/validations/order.validation";
import {DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE, DEFAULT_SORT_DIRECTION} from "@/helpers/constants";
import {loadOrders} from "@/services/orders.service";
import PaginationResponse from "@/helpers/pagination-response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const path = req.query?.customer;
    const pass = path && path.length === 2 && path[1] === 'orders';
    const docRef: string = req.query.id as string;

    switch (req.method) {
        case 'GET':
            if (pass) {
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

                const response = PaginationResponse({
                    req,
                    page: parameter.page,
                    limit: parameter.limit,
                    count: total,
                    data: orders
                })

                res.json({customer: process.env.SITE_URL + path[0], orders: response});
                break;
            }

            const customer = await loadCustomer(docRef);
            if (!customer)
                res.status(400).json({message: "Customer with reference '" + docRef + "' not found !"});

            res.json(transformResponse(customer));
            break;
        case 'PATCH':
            const {error, value} = createOrUpdateCustomer.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message});

            const updated = await updateCustomer(docRef, value);
            if (!updated)
                res.status(400).json({message: "Customer with reference '" + docRef + "' not found !"});

            res.json(transformResponse(updated));
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
