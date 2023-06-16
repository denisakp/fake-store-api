import connectToDB from "@/lib/mongodb";
import {orderQueryBuilder} from "@/helpers/queries-builder";
import {OrderInterface, OrderQueryBuilderParameter} from "@/interfaces/order.interface";
import {ObjectId} from "bson";
import {DUMMY_ORDER} from "@/helpers/constants";

/**
 * Load orders resources
 * @param query
 */
export async function loadOrders(query: OrderQueryBuilderParameter) {
    const db = await connectToDB();
    try {
        const {options, sort, skip} = orderQueryBuilder(query);

        const total: number = await db.collection("orders").countDocuments(options);

        const orders = await db
            .collection("orders")
            .find(options)
            .limit(query.limit)
            .skip(skip)
            .sort(sort)
            .toArray()

        return {orders, total};
    } catch (e) {
        throw new Error('Failed to load orders resources !');
    }
}

/**
 * Load an order resource by its docRef
 * @param docRef
 */
export function loadOrder(docRef: string) {
    try {
        const docRef_oi = new ObjectId(docRef);
        const order_oi = new ObjectId('6485d7a45562163f95c6e3e2');

        if (!docRef_oi || !docRef_oi.equals(order_oi))
            return;

        return DUMMY_ORDER;
    } catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }

}

/**
 * Create a new order resource
 * @param data
 */
export function createOrder(data: OrderInterface) {
    const customer_oi = new ObjectId(data.customer);
    if (!customer_oi || !customer_oi.equals('6485c35814c402ee08ec6294'))
        return;

    const _data = {
        ...data,
        _id: new ObjectId(),
        total_products: data.products.length,
        total_quantity: data.products.reduce((total, product) => total + product.quantity, 0),
        total_amount: data.products.reduce((total, product) => total + (product.quantity * product.price), 0),
        created_datetime: new Date(),
    }

    return {...DUMMY_ORDER, ..._data}
}

/**
 * Update order resource by its docRef
 * @param docRef
 * @param data
 */
export function updateOrder(docRef: string, data: OrderInterface) {
    try {
        const customer_oi = new ObjectId(data.customer);
        if (!customer_oi || customer_oi.equals('6485c35814c402ee08ec6294'))
            return;

        const order_oi = new ObjectId(docRef);
        if (!order_oi || !order_oi.equals('6485d7a45562163f95c6e3e2'))
            return;

        const _data = {
            ...data,
            total_products: data.products.length,
            total_quantity: data.products.reduce((total, product) => total + product.quantity, 0),
            total_amount: data.products.reduce((total, product) => total + (product.quantity * product.price), 0),
            created_datetime: new Date(),
        }

        return {...DUMMY_ORDER, ..._data}
    }catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}

/**
 *
 * @param docRef
 */
export function deleteOrder(docRef: string) {
    try {
        const docRef_oi = new ObjectId(docRef);
        if(!docRef_oi || !docRef_oi.equals('6485d7a45562163f95c6e3e2'))
            return;

        return true;
    }catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}
