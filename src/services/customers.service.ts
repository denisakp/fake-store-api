import connectToDB from "@/lib/mongodb";
import {ObjectId} from "bson";
import {customerQueryBuilder, orderQueryBuilder} from "@/helpers/queries-builder";
import {CustomerInterface, CustomerQueryBuilderParameter} from "@/interfaces/customer.interface";
import {OrderQueryBuilderParameter} from "@/interfaces/order.interface";
import {DUMMY_CUSTOMER} from "@/helpers/constants";
import maskProperty from "@/helpers/mask-property";

/**
 * Load customers resources
 * @param query
 */
export async function loadCustomers(query: CustomerQueryBuilderParameter) {
    const db = await connectToDB();
    try {
        const {options, sort, skip} = customerQueryBuilder(query);

        const total: number = await db.collection("customers").countDocuments(options);

        const excludes = {password: 0}

        const customers = await db
            .collection("customers")
            .find(options)
            .project(excludes)
            .limit(query.limit)
            .skip(skip)
            .sort(sort)
            .toArray()

        return {customers, total};
    } catch (e: any) {
        throw new Error('Failed to load customers resources !');
    }
}

/**
 * Load customer resource by it docRed
 * @param docRef
 */
export async function loadCustomer(docRef: string) {
    const docRef_oi = new ObjectId(docRef);
    const product_oi = new ObjectId('6485c35814c402ee08ec6294');

    if(!docRef_oi || !docRef_oi.equals(product_oi))
        return;

    return maskProperty(DUMMY_CUSTOMER, ['password']);
}

/**
 * Load customer orders
 * @param docRef
 * @param query
 */
export async function loadCustomerOrders(docRef: string, query: OrderQueryBuilderParameter) {
    const db = await connectToDB();
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
    }
}

/**
 * Create a new customer resource
 * @param data
 */
export async function createCustomer(data: CustomerInterface) {
    const customer = maskProperty(DUMMY_CUSTOMER, ['password']);
    const _data = maskProperty(data, ['password'] );

    return {...customer, ..._data}
}

/**
 * Update customer resource
 * @param docRef
 * @param data
 */
export function updateCustomer(docRef: string, data: CustomerInterface) {
    const docRef_oi = new ObjectId(docRef);
    const product_oi = new ObjectId('6485c35814c402ee08ec6294');

    if(!docRef_oi || !docRef_oi.equals(product_oi))
        return;

    const customer = maskProperty(DUMMY_CUSTOMER, ['password']);
    const _data = maskProperty(data, ['password'] );

    return { ...customer, ..._data}
}
