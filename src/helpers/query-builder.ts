export default function queryBuilder (query?: QueryInterface ) {
    const page = query?.page ?? 1;
    const limit = query?.limit ?? 25;

    const skip = (page -1) * limit;

    let options: any = {};

    const sort: any = {}

    if(query?.sortField && query?.sortOrder) {
        sort[query?.sortField] = query?.sortOrder
    } else if(query?.sortField) {
        sort[query?.sortField] = -1
    }

    if(query?.keyword && query?.min && query?.max) {
        options['name'] = {
            $regex: query?.keyword,
            $options: 'i'
        }
        options['price'] = {
            $gte: query?.min,
            $lte: query?.max
        }
    } else if(query?.min && query?.max && !query.keyword) {
        options['price'] = {
            $gte: query?.min,
            $lte: query?.max
        }
    } else if(query?.keyword && !query?.min && !query?.max) {
        options['name'] = {
            $regex: query?.keyword,
            $options: 'i'
        }
    }

    return {options, sort, skip};
}

export interface QueryInterface {
    limit?: number;
    page?: number;
    min?: number;
    max?: number;
    keyword?: string;
    sortField?: string;
    sortOrder?: number;
}
