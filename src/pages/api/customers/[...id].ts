import {NextApiRequest, NextApiResponse} from "next";
import {validateOrderLoading} from "@/validations/order.validation";
import {DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE, SITE_URL} from "@/helpers/constants";
import {customerOrders, customerOrdersCounter} from "@/services/customers.service";
import PaginationResponse from "@/helpers/pagination-response";
import maskProperty from "@/helpers/mask-property";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const query: any = req.query?.id;
    const docRef = query[0];
    const queryParameters = maskProperty(req?.query, ['id'])

    switch (req.method) {
        case 'GET':

            if (Object.keys(queryParameters).length > 0) {
                const {error} = validateOrderLoading.validate(queryParameters);
                if (error)
                    res.status(422).json({error: 'Validation error', message: error.message})
            }

            const parameter = {
                limit: req.query?.limit ? Number(req.query.limit) : DEFAULT_PAGINATION_LIMIT,
                page: req.query?.page ? Number(req.query.page) : DEFAULT_PAGINATION_PAGE,
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
                res
                    .status(200)
                    .json({
                        customer: SITE_URL + '/customers/' + docRef,
                        ...response
                    });

            } catch (e: any) {
                res.status(500).json({message: e.message});
            }
            break;
        default:
            res.status(405).json({message: 'Method not allowed'})
    }
}
