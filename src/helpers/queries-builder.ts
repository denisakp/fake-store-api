import {DEFAULT_SORT_DIRECTION, DEFAULT_SORT_FIELD} from "@/helpers/constants";

/**
 * This function build queries used as parameters to load products
 * @param query
 */
export function productQueryBuilder(query: ProductQueryBuilderParameter): ProductQueryBuilderResponse {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    let options: any = {};
    const sort: any = {}

    if (query.sort && query.direction) {
        sort[query.sort] = query.direction
    } else {
        sort[DEFAULT_SORT_FIELD] = DEFAULT_SORT_DIRECTION
    }

    if (query?.q && query?.min && query?.max) {
        options['name'] = {
            $regex: query?.q,
            $options: 'i'
        }
        options['price'] = {
            $gte: query?.min,
            $lte: query?.max
        }
    } else if (query?.min && query?.max && !query.q) {
        options['price'] = {
            $gte: query?.min,
            $lte: query?.max
        }
    } else if (query?.q && !query?.min && !query?.max) {
        options['name'] = {
            $regex: query?.q,
            $options: 'i'
        }
    }

    return {options, sort, skip};
}

/**
 * This function build queries used as parameters to load orders
 * @param query
 */
export function orderQueryBuilder(query: OrderQueryParameter): OrderQueryResponse {
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 25;
    const skip = (page - 1) * limit;

    let options: any = {};

    if (query?.startDate && query?.endDate) {
        options['createdDatetime'] = {
            $gte: query?.startDate,
            $lte: query?.endDate
        };
    }

    return {options, skip};
}


export interface ProductQueryBuilderParameter {
    limit: number;
    page: number;
    min?: number;
    max?: number;
    q?: string;
    sort?: string;
    direction?: number;
}

interface ProductQueryBuilderResponse {
    options: object;
    sort: any;
    skip: number;
}

interface OrderQueryParameter {
    startDate?: string;
    endDate?: string;
    limit?: number;
    page?: number;
}

interface OrderQueryResponse {
    skip: number;
    options: object;
}
