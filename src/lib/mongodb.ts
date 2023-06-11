import { MongoClient, Db, ServerApiVersion } from 'mongodb';

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

let client
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
// In production mode, it's best to not use a global variable.
if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options)
        global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
} else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}


export default async function connectToDB() {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("store");

    return {client, db};
}
