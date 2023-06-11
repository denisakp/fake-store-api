import {NextApiRequest, NextApiResponse} from "next";
import {DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE, DEFAULT_SORT_DIRECTION} from "@/helpers/constants";
import {loadCustomers} from "@/services/customers.service";
import PaginationResponse from "@/helpers/pagination-response";
import {loadCustomerValidation} from "@/validations/customer.validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            if (Object.keys(req.query).length > 0) {
                const {error} = loadCustomerValidation.validate(req.query);
                if (error)
                    res.status(422).json({error: 'Validation error', message: error.message})
            }

            const parameter = {
                limit: Number(req.query?.limit) ?? DEFAULT_PAGINATION_LIMIT,
                page: Number(req.query?.page) ?? DEFAULT_PAGINATION_PAGE,
                sort: req.query?.sort as string ?? 'created_datetime',
                direction: Number(req?.query.order) ?? DEFAULT_SORT_DIRECTION,
                q: req?.query.q as string,
            }

            const {customers, total} = await loadCustomers(parameter);

            res.json(PaginationResponse({
                req,
                page: parameter.page,
                limit: parameter.limit,
                count: total,
                data: customers
            }));
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
