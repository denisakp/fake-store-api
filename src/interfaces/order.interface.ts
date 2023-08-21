export interface OrderQueryBuilderParameter {
    startDate?: Date;
    endDate?: Date;
    limit: number;
    page: number;
    startPrice?: number;
    endPrice?: number;
}

export interface OrderQueryBuilderResponse {
    skip: number;
    options: object;
}

export interface OrderInterface {
    customer: string;
    products: Array<ProductInterface>;
}

interface ProductInterface {
    sku: string;
    name: string;
    quantity: number;
    price: number;
}
