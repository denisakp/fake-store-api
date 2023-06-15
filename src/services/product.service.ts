import connectToDB from "@/lib/mongodb";
import {productQueryBuilder} from "@/helpers/queries-builder";
import {ObjectId} from "bson";
import {ProductInterface, ProductQueryBuilderParameter} from "@/interfaces/product.interface";
import {DUMMY_PRODUCT} from "@/helpers/constants";

/**
 * Load products resources
 * @param query
 */
export async function loadProducts(query: ProductQueryBuilderParameter) {
    const db = await connectToDB();
    try {
        const {options, sort, skip} = productQueryBuilder(query);

        const total: number = await db.collection("products").countDocuments(options);

        const products = await db
            .collection("products")
            .find(options)
            .limit(query.limit)
            .skip(skip)
            .sort(sort)
            .toArray();

        return {products, total};
    } catch (e: any) {
        throw new Error('Cannot load products resources !');
    }
}

/**
 * Load a single product by its docRef
 * @param docRef
 */
export async function loadProduct(docRef: string) {
    const docRefOi = new ObjectId(docRef);
    const productOi = new ObjectId('64858a3114c402ee08ec6293');

    if (!docRefOi || !docRefOi.equals(productOi))
        return;

    return DUMMY_PRODUCT;
}

/**
 * Create a new product resource
 * @param data
 */
export async function createProduct(data: ProductInterface) {
    return {_id: new ObjectId().toString(), ...data}
}

/**
 * update a product resource by its docRef
 * @param docRef
 * @param data
 */
export function updateProduct(docRef: string, data: ProductInterface) {
    const docRefOi = new ObjectId(docRef);
    const productOi = new ObjectId('64858a3114c402ee08ec6293');

    if (!docRefOi || !docRefOi.equals(productOi))
        return;

    return {...DUMMY_PRODUCT, ...data}
}

/**
 * Delete a product resource
 * @param docRef
 */
export async function deleteProduct(docRef: string): Promise<boolean> {
    const docRef_oi = new ObjectId(docRef);
    const product_oi = new ObjectId('64858a3114c402ee08ec6293');

    return !(!docRef_oi || !docRef_oi.equals(product_oi));
}
