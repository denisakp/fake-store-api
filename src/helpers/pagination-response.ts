import toJson from "@/helpers/toJson";

/**
 * Format the pagination response
 * @param req
 * @param limit
 * @param page
 * @param count
 * @param data
 * @constructor
 */
export default function PaginationResponse(req: any, limit: number, page: number, count: number, data: any){
    const url: string = req.headers['referer'];

    const totalPage = Math.ceil(count / limit);

    const hasNextPage = page < totalPage;

    const previousPage: string | null = page > 1 ? url.replace(`page=${page}`, `page=${page + 1}`) : null;

    const nextPage: string | null = hasNextPage ? url.replace(`page=${page}`, `page=${page - 1}`) : null;

    return {data: toJson(data), count, currentPage: page, hasNextPage, previousPage, nextPage}
}
