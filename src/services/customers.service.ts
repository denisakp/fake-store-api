import connectToDB from "@/lib/mongodb";
import {ObjectId} from "bson";
import {customerQueryBuilder, orderQueryBuilder} from "@/helpers/queries-builder";
import {CustomerInterface, CustomerQueryBuilderParameter} from "@/interfaces/customer.interface";
import {OrderQueryBuilderParameter} from "@/interfaces/order.interface";
import {SITE_URL} from "@/helpers/constants";

/**
 * Load customers resources
 * @param query
 */
export async function loadCustomers(query: CustomerQueryBuilderParameter) {
    const {client, db} = await connectToDB();
    try {
        const {options, sort, skip} = customerQueryBuilder(query);

        const total: number = await db.collection("customers").countDocuments(options);
        const customers = await db.collection("customers").find(options).limit(query.limit).skip(skip).sort(sort).toArray()

        return {customers, total};
    } catch (e) {
        throw new Error('Failed to load customers resources !');
    } finally {
        await client.close();
    }
}

/**
 * Load customer resource by it docRed
 * @param docRef
 */
export async function loadCustomer(docRef: string) {
    const {client, db} = await connectToDB();
    try {
        const customer = await db.collection("customers").findOne({_id: new ObjectId(docRef)});

        if (!customer)
            return;

        return {
            ...customer,
            orders: SITE_URL +'/customers/' + docRef + '/orders'
        };
    } catch (e) {
        throw new Error('Failed to load customer with docRef: ' + docRef);
    } finally {
        await client.close();
    }
}

/**
 * Load customer orders
 * @param docRef
 * @param query
 */
export async function loadCustomerOrders(docRef: string, query: OrderQueryBuilderParameter) {
    const {client, db} = await connectToDB();
    try {
        const docRef_oi = new ObjectId(docRef);
        const customer_oi = new ObjectId('6485c35814c402ee08ec6294');
        if (!docRef_oi || !docRef_oi.equals(customer_oi))
            return;

        const {options, sort, skip} = orderQueryBuilder(query);

        const total: number = await db.collection("orders").countDocuments({...options, customer: customer_oi });

        const orders = await db.collection("orders").find({...options, customer: customer_oi }).limit(query.limit).skip(skip).sort(sort).toArray()

        return {orders, total};

    } catch (e) {
        throw new Error('Failed to load orders for customer with docRef: ' + docRef);
    } finally {
        await client.close();
    }
}

/**
 * Create a new customer resource
 * @param data
 */
export async function createCustomer(data: CustomerInterface) {
    return {_id: new ObjectId(), ...data}
}

/**
 * Update customer resource
 * @param docRef
 * @param data
 */
export async function updateCustomer(docRef: string, data: CustomerInterface) {
    const docRef_oi = new ObjectId(docRef);
    const product_oi = new ObjectId('6485c35814c402ee08ec6294');

    if(!docRef_oi || !docRef_oi.equals(product_oi))
        return;

    return {_id: docRef_oi, ...data}
}
