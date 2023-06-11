import connectToDB from "@/lib/mongodb";
import {ObjectId} from "bson";

/**
 * Load categories resources
 */
export const loadCategories = async () => {
    const {client, db} = await connectToDB();
    try {
        return await db.collection("categories").find({}).toArray()
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load categories resources !');
    } finally {
        await client.close();
    }
}

/**
 * Load one category by its document reference
 * @param docRef
 */
export async function loadCategory (docRef: string) {
    const {client, db} = await connectToDB();
    try {
        const category = await db.collection("categories").findOne({
            _id: new ObjectId(docRef),
        })

        if(!category)
            return;

        return category;
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load category  with id ' + docRef);
    } finally {
        await client.close()
    }
}

/**
 * Create a new category
 * @param name
 */
export function createCategory (name: string) {
    return  { _id: new ObjectId().toString(), name }
}

/**
 *
 * @param docRef
 * @param name
 */
export function updateCategory (docRef: string, name: string) {
    const docRef_oi = new ObjectId(docRef);
    const cars_oi = new ObjectId('6479065cb337e71eb79da693');

    if(!docRef_oi || !docRef_oi.equals(cars_oi))
        return;

    return { _id: cars_oi.toString(), name }
}
