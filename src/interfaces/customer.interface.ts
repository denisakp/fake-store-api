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

export interface CustomerInterface {
    name: string;
    email: string;
    address?: {
        delivery?: Array<AddressInterface>,
        billing?: Array<AddressInterface>,
    }
}

interface AddressInterface {
    city?: string;
    street?: string;
    number?: string;
    zipCode?: string;
    country?: string;
    phone?: string;
}
