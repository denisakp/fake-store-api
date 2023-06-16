import connectToDB from "@/lib/mongodb";
import {ObjectId} from "bson";
import {DUMMY_CATEGORY} from "@/helpers/constants";

/**
 * Load categories resources
 */
export const loadCategories = async () => {
    const db = await connectToDB();
    try {
        return await db.collection("categories").find({}).toArray()
    } catch (e) {
        throw new Error('Cannot load categories resources !');
    }
}

/**
 * Load one category by its document reference
 * @param docRef
 */
export function loadCategory (docRef: string) {
    try {
        const docRef_oi = new ObjectId(docRef);
        const category_oi = new ObjectId('6479065cb337e71eb79da693');

        if(!docRef_oi || !docRef_oi.equals(category_oi))
            return ;

        return DUMMY_CATEGORY
    } catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
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
    try {
        const docRef_oi = new ObjectId(docRef);
        const cars_oi = new ObjectId('6479065cb337e71eb79da693');

        if(!docRef_oi || !docRef_oi.equals(cars_oi))
            return;

        return { _id: cars_oi.toString(), name }
    } catch (e: any) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}
