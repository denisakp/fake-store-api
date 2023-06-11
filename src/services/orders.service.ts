import connectToDB from "@/lib/mongodb";
import {orderQueryBuilder} from "@/helpers/queries-builder";
import {OrderInterface, OrderQueryBuilderParameter} from "@/interfaces/order.interface";
import {ObjectId} from "bson";

/**
 * Load orders resources
 * @param query
 */
export async function loadOrders(query: OrderQueryBuilderParameter) {
    const {client, db} = await connectToDB();
    try {
        const {options, sort, skip} = orderQueryBuilder(query);

        const total: number = await db.collection("orders").countDocuments(options);

        const orders = await db.collection("orders").find(options).limit(query.limit).skip(skip).sort(sort).toArray()

        return {orders, total};
    } catch (e) {
        throw new Error('Failed to load orders resources !');
    } finally {
        await client.close();
    }
}

/**
 * Load an order resource by its docRef
 * @param docRef
 */
export async function loadOrder(docRef: string) {
    const {client, db} = await connectToDB();
    try {
        const order = await db.collection('orders').findOne({_id: new ObjectId(docRef)});

        if (!order)
            return;

        return order;
    } catch (e) {
        throw new Error('Failed to load order resource with reference: ' + docRef);
    } finally {
        await client.close();
    }
}

/**
 * Create a new order resource
 * @param data
 */
export async function createOrder(data: OrderInterface) {
    const customer_oi = new ObjectId(data.customer);
    const john_oi = new ObjectId('6485c35814c402ee08ec6294');

    if (!customer_oi || customer_oi.equals(john_oi))
        return;

    return {
        ...data,
        total_products: data.products.length,
        total_quantity: data.products.reduce((total, product) => total + product.quantity, 0),
        total_amount: data.products.reduce((total, product) => total + (product.quantity * product.price), 0),
        created_datetime: new Date(),
    }
}

/**
 * Update order resource by its docRef
 * @param docRef
 * @param data
 */
export async function updateOrder(docRef: string, data: OrderInterface) {
    const customer_oi = new ObjectId(data.customer);
    const john_oi = new ObjectId('6485c35814c402ee08ec6294');
    if (!customer_oi || customer_oi.equals(john_oi))
        return;

    const order_oi = new ObjectId(docRef);
    if (!order_oi || !order_oi.equals('6485d7a45562163f95c6e3e2'))
        return;

    return {
        ...data,
        total_products: data.products.length,
        total_quantity: data.products.reduce((total, product) => total + product.quantity, 0),
        total_amount: data.products.reduce((total, product) => total + (product.quantity * product.price), 0),
        created_datetime: new Date(),
    }
}

export async function deleteOrder(docRef: string) {
    const docRef_oi = new ObjectId(docRef);
    const order_oi = new ObjectId('6485d7a45562163f95c6e3e2');

    return !(!docRef_oi || !docRef_oi.equals(order_oi));
}

//requêtes
//commande total_price > x
//commande total_price < x
//commande x |total_price| y






