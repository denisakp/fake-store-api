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
                limit: req.query?.limit ? Number(req.query.limit) : DEFAULT_PAGINATION_LIMIT,
                page: req.query?.page ? Number(req.query.page) : DEFAULT_PAGINATION_PAGE,
                sort: req.query?.sort ? req.query.sort as string : 'created_datetime',
                direction: req?.query.order ? Number(req.query.order) : DEFAULT_SORT_DIRECTION,
                q: req?.query.q ? req?.query.q as string : undefined
            }

            try {
                const {customers, total} = await loadCustomers(parameter);

                res.status(200).json(PaginationResponse({
                    req,
                    page: parameter.page,
                    limit: parameter.limit,
                    count: total,
                    data: customers
                }));
            } catch (e: any) {
                res.status(500).json({message: e.message})
            }
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
