import connectToDB from "@/lib/mongodb";
import queryBuilder from "@/helpers/query-builder";
import {ObjectId} from "bson";

export async function loadProducts(query?: any) {
    const {client, db} = await connectToDB();
    try {
        const {options, sort, skip} = queryBuilder(query);

        const countDocs: number = await db.collection("products").countDocuments(query);
        const result = await db.collection("products").find(options).limit(query?.limit).skip(skip).sort(sort).toArray()

        return {result, countDocs};
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load products resources !');
    } finally {
        await client.close();
    }
}

export async function loadProduct(docRef: string) {
    const {client, db} = await connectToDB();
    try {
        return await db.collection("products").findOne({
            _id: new ObjectId(docRef),
        })
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load product with id ' + docRef);
    } finally {
        await client.close()
    }
}

export async function createProduct(data?: any) {
    const {client, db} = await connectToDB();
    try {
        return data?.categories ?
            await db.collection("categories").insertOne({...data}) :
            await db.collection("categories").insertOne({...data, categories: []})
    } catch (e) {
        console.error(e);
        throw new Error('Failed to create product resource !');
    } finally {
        await client.close()
    }
}

export async function updateProduct(docRef: string, data?: any) {
    const {client, db} = await connectToDB();
    try {
        const doc = await loadProduct(docRef);

        if (!doc)
            return;

        return await db.collection("categories").updateOne(
            {_id: new ObjectId(docRef)},
            {$set: {...data}}
        )
    } catch (e) {
        console.error(e);
        throw new Error('Failed to update product with id ' + docRef);
    } finally {
        await client.close()
    }
}

export async function deleteProduct(docRef: string) {
    const {client, db} = await connectToDB();
    try {
        const doc = await loadProduct(docRef);

        if (!doc)
            return;

        return await db.collection("categories").deleteOne({_id: new ObjectId(docRef)})
    } catch (e) {
        console.error(e);
        throw new Error('Failed to delete product with id ' + docRef);
    } finally {
        await client.close()
    }
}
