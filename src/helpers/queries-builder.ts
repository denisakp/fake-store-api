import {DEFAULT_SORT_DIRECTION, DEFAULT_SORT_FIELD} from "@/helpers/constants";
import {ProductQueryBuilderParameter, ProductQueryBuilderResponse} from "@/interfaces/product.interface";
import {OrderQueryBuilderParameter, OrderQueryBuilderResponse} from "@/interfaces/order.interface";
import {CustomerQueryBuilderParameter, CustomerQueryBuilderResponse} from "@/interfaces/customer.interface";

/**
 * This function build queries used to load products
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
 * This function build query used to load orders
 * @param query
 */
export function orderQueryBuilder(query: OrderQueryBuilderParameter): OrderQueryBuilderResponse {
    const page = query.page;
    const limit = query.limit;
    const skip = (page - 1) * limit;

    let options: any = {};

    if(query.startPrice && query.endPrice) {
        options['created_datetime'] = {
            $gte: query.startDate,
            $lte: query.endDate
        }

        options['total_price'] = {
            $gte: query.startPrice,
            $lte: query.endPrice,
        }
    } else {
        options['created_datetime'] = {
            $gte: query.startDate,
            $lte: query.endDate
        };
    }

    return {options, skip};
}

/**
 * This function build queries to load customers
 * @param query
 */
export function customerQueryBuilder(query: CustomerQueryBuilderParameter): CustomerQueryBuilderResponse {
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

    if (query?.q) {
        options['name'] = {
            $regex: query?.q,
            $options: 'i'
        }
    }

    return {options, sort, skip};
}
