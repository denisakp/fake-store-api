import {NextApiRequest, NextApiResponse} from "next";
import {customerOrders, customerOrdersCounter, loadCustomer, updateCustomer} from "@/services/customers.service";
import transformResponse from "@/helpers/transform-response";
import {validateUploadCustomer} from "@/validations/customer.validation";
import {validateOrderLoading} from "@/validations/order.validation";
import {DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE, DEFAULT_SORT_DIRECTION, SITE_URL} from "@/helpers/constants";
import PaginationResponse from "@/helpers/pagination-response";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const path = req.query?.customer;
    const pass = path && path.length === 2 && path[1] === 'orders';
    const docRef: string = req.query.id as string;

    switch (req.method) {
        case 'GET':
            if (pass) {
                if (Object.keys(req.query).length > 0) {
                    const {error} = validateOrderLoading.validate(req.query);
                    if (error)
                        res.status(422).json({error: 'Validation error', message: error.message})
                }

                const parameter = {
                    limit: req.query?.limit ? Number(req.query.limit) : DEFAULT_PAGINATION_LIMIT,
                    page: req.query?.page ? Number(req.query.page) : DEFAULT_PAGINATION_PAGE,
                    sort: req.query?.sort ? req.query.sort as string : 'created_datetime',
                    direction: req?.query.order ? Number(req.query.order) : DEFAULT_SORT_DIRECTION,
                    startDate: new Date('2023-06-01'),
                    endDate: new Date('2023-06-30'),
                    startPrice: req.query?.startPrice ? Number(req.query.startPrice) : undefined,
                    endPrice: req.query?.endPrice ? Number(req.query.endPrice) : undefined,
                }

                try {
                    const orders = await customerOrders(docRef, parameter);
                    const total = await customerOrdersCounter(docRef, parameter);

                    const response = PaginationResponse({
                        req,
                        page: parameter.page,
                        limit: parameter.limit,
                        count: total as number,
                        data: orders
                    })
                    res.status(200).json({customer: SITE_URL + path[0], ...response});

                } catch (e: any) {
                    res.status(500).json({message: e.message});
                }
                break;
            }

            try {
                const customer = await loadCustomer(docRef);
                if (!customer)
                    res.status(400).json({message: "Customer with reference '" + docRef + "' not found !"});

                res.json(transformResponse(customer));
            } catch (e: any) {
                res.status(400).json({message: e.message})
            }
            break;
        case 'PATCH':
            const {error, value} = validateUploadCustomer.validate(req.body);
            if (error)
                res.status(422).json({error: 'Validation error', message: error.message});

            try {
                const updated = updateCustomer(docRef, value);
                if (!updated)
                    res.status(400).json({message: "Customer with reference '" + docRef + "' not found !"});

                res.json(transformResponse(updated));
            }catch (e: any) {
                res.status(400).json({message: e.message})
            }
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
