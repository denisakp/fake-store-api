export interface CustomerQueryBuilderParameter {
    limit: number;
    page: number;
    q?: string;
    sort?: string;
    direction?: number;
}

export interface CustomerQueryBuilderResponse {
    options: object;
    sort: any;
    skip: number;
}
