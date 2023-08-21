import connectToDB from "@/lib/mongodb";
import {productQueryBuilder} from "@/helpers/queries-builder";
import {ObjectId} from "bson";
import {ProductInterface, ProductQueryBuilderParameter} from "@/interfaces/product.interface";
import {DUMMY_PRODUCT} from "@/helpers/constants";

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

export function loadProduct(docRef: string) {
    try {
        const docRefOi = new ObjectId(docRef);
        if (!docRefOi || !docRefOi.equals('64858a3114c402ee08ec6293'))
            return;

        return DUMMY_PRODUCT;
    } catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}

export function createProduct(data: ProductInterface) {
    return {_id: new ObjectId().toString(), ...data}
}

export function updateProduct(docRef: string, data: ProductInterface) {
    try {
        const docRefOi = new ObjectId(docRef);
        if (!docRefOi || !docRefOi.equals('64858a3114c402ee08ec6293'))
            return;

        return {...DUMMY_PRODUCT, ...data}
    }catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}


export function deleteProduct(docRef: string) {
    try {
        const docRef_oi = new ObjectId(docRef);

        if(!docRef_oi || !docRef_oi.equals('64858a3114c402ee08ec6293'))
            return;

        return true;
    } catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}
