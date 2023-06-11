import {NextApiRequest} from "next";
import transformResponse from "@/helpers/transform-response";

/**
 * Format the pagination response
 * @constructor
 * @param params
 */
export default function PaginationResponse(params: Parameter): Response {
    const url = params.req.headers['referer'] as string;

    const totalPage = Math.ceil(params.count / params.limit);

    const hasNextPage = params.page < totalPage;

    const previousPage: string | null = params.page > 1 ? url.replace(`page=${params.page}`, `page=${params.page + 1}`) : null;

    const nextPage: string | null = hasNextPage ? url.replace(`page=${params.page}`, `page=${params.page - 1}`) : null;

    return {
        data: transformResponse(params.data),
        total: params.count,
        currentPage: params.page,
        hasNextPage,
        previousPage,
        nextPage
    }
}

interface Parameter {
    req: NextApiRequest;
    limit: number;
    page: number;
    count: number;
    data: any;
}

interface Response {
    data: object,
    total: number;
    currentPage: number;
    hasNextPage: boolean;
    previousPage: string | null;
    nextPage: string | null;
}
