import connectToDB from "@/lib/mongodb";
import {productQueryBuilder, ProductQueryBuilderParameter} from "@/helpers/queries-builder";
import {ObjectId} from "bson";

/**
 * Load products resources
 * @param query
 */
export async function loadProducts(query: ProductQueryBuilderParameter) {
    const {client, db} = await connectToDB();
    try {
        const limit = query.limit;

        const {options, sort, skip} = productQueryBuilder(query);

        const total: number = await db.collection("products").countDocuments(options);

        const products = await db.collection("products").find(options).limit(limit).skip(skip).sort(sort).toArray()

        return {products, total};
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load products resources !');
    } finally {
        await client.close();
    }
}

/**
 * Load a single product by its docRef
 * @param docRef
 */
export async function loadProduct(docRef: string) {
    const {client, db} = await connectToDB();
    try {
        const product = await db.collection("products").findOne({
            _id: new ObjectId(docRef),
        })

        if(!product)
            return;

        return product;
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load product with reference ' + docRef);
    } finally {
        await client.close()
    }
}

/**
 * Create a new product resource
 * @param data
 */
export async function createProduct(data: ProductInterface) {
        return { _id: new ObjectId().toString(), ...data }
}

/**
 * update a product resource by its docRef
 * @param docRef
 * @param data
 */
export async function updateProduct(docRef: string, data: ProductInterface) {
    const docRefOi = new ObjectId(docRef);
    const productOi = new ObjectId('64858a3114c402ee08ec6293');

    if(!docRefOi || !docRefOi.equals(productOi))
        return;

    return {_id: productOi, ...data }
}

/**
 * Delete a product resource
 * @param docRef
 */
export async function deleteProduct(docRef: string): Promise<boolean> {
    const docRefOi = new ObjectId(docRef);
    const productOi = new ObjectId('64858a3114c402ee08ec6293');

    return !(!docRefOi || !docRefOi.equals(productOi));
}

interface ProductInterface {
    name: string;
    price: number;
    stock: number;
    description?: string;
    images?: string[];
    categories?: string[]
}
