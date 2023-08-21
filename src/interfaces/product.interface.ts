export interface ProductQueryBuilderParameter {
    limit: number;
    page: number;
    min?: number;
    max?: number;
    q?: string;
    sort?: string;
    direction?: number;
}

export interface ProductQueryBuilderResponse {
    options: object;
    sort: any;
    skip: number;
}

export interface ProductInterface {
    name: string;
    price: number;
    stock: number;
    description?: string;
    images?: string[];
    categories?: string[];
    sku: string;
}
