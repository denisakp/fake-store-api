export const DEFAULT_PAGINATION_LIMIT = 15;
export const DEFAULT_PAGINATION_PAGE = 1;
export const DEFAULT_SORT_FIELD = "name";
export const DEFAULT_SORT_DIRECTION = -1;
export const DEFAULT_EMAIL = process.env.USER_EMAIL as string;
export const DEFAULT_PASSWORD = process.env.USER_PASSWORD as string;
export const DEFAULT_JWT_SECRET="fake-store-api-secret"
export const SITE_URL = process.env.SITE_URL as string;
export const DUMMY_PRODUCT = {
    "_id": "64858a3114c402ee08ec6293",
    "name": "iPhone X",
    "description": "The iPhone X is a smartphone designed, developed and marketed by Apple Inc. It is part of the eleventh generation of the iPhone",
    "stock": 13,
    "price": 450.99,
    "images": [
        "https://fakestoreapi.denisakp.me/static/products/1/1.jpg",
        "https://fakestoreapi.denisakp.me/static/products/1/1.jpg",
        "https://fakestoreapi.denisakp.me/static/products/1/1.jpg",
        "https://fakestoreapi.denisakp.me/static/products/1/1.jpg"
    ],
    "categories": [
        "smartphone",
        "iphone"
    ],
    "sku": "2023060001"
}
