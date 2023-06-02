import connectToDB from "@/lib/mongodb";
import {ObjectId} from "bson";

export const loadCategories = async () => {
    const {client, db} = await connectToDB();
    try {
        return await db.collection("categories").find({}).toArray()
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load categories resource !');
    } finally {
        await client.close();
    }
}

export const loadCategory = async (document: string) => {
    const {client, db} = await connectToDB();
    try {
        return await db.collection("categories").findOne({
            _id: new ObjectId(document),
        })
    } catch (e) {
        console.error(e);
        throw new Error('Cannot load category  with id ' + document);
    } finally {
        await client.close()
    }
}

export const createCategory = async (name: string) => {
    const {client, db} = await connectToDB();
    try {
        return await db.collection("categories").insertOne({name});
    } catch (e) {
        console.error(e);
        throw new Error('Error while saving category !');
    } finally {
        await client.close()
    }
}

export const updateCategory = async (doc: string, name: string) => {
    const {client, db} = await connectToDB();
    try {
        const document = await loadCategory(doc);

        if (!document)
            return;

        return await db.collection("categories").updateOne(
            {_id: new ObjectId(doc)},
            {$set: {name}}
        )
    } catch (e) {
        console.error(e);
        throw new Error('Error while updating category with id ' + doc);
    } finally {
        await client.close()
    }
}


