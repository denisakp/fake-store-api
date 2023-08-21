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
export function loadCustomer(docRef: string) {
    try {
        const docRef_oi = new ObjectId(docRef);
        if(!docRef_oi || !docRef_oi.equals('6485c35814c402ee08ec6294'))
            return;

        return maskProperty(DUMMY_CUSTOMER, ['password']);
    } catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}

/**
 * Update customer resource
 * @param docRef
 * @param data
 */
export function updateCustomer(docRef: string, data: CustomerInterface) {
    try {
        const docRef_oi = new ObjectId(docRef);
        if(!docRef_oi || !docRef_oi.equals('6485c35814c402ee08ec6294'))
            return;

        const customer = maskProperty(DUMMY_CUSTOMER, ['password']);
        const _data = maskProperty(data, ['password'] );

        return { ...customer, ..._data}
    }catch (e) {
        throw new Error("Argument '" + docRef + "' passed in must be a string of 12 bytes or a string of 24 hex characters or an integer");
    }
}


export async function customerOrders (docRef: string, query: OrderQueryBuilderParameter) {
    const db = await connectToDB();
    try {
        const docRef_oi = new ObjectId(docRef);
        const customer_oi = new ObjectId('6485c35814c402ee08ec6294');
        if (!docRef_oi || !docRef_oi.equals(customer_oi))
            return;

        const {options, skip} = orderQueryBuilder(query);

        return  await db
            .collection("orders")
            .find({...options, customer: customer_oi })
            .limit(query.limit)
            .skip(skip)
            .toArray()

    } catch (e) {
        throw new Error('Failed to load orders for customer with docRef: ' + docRef);
    }
}

/**
 *
 * @param docRef
 * @param query
 */
export async function customerOrdersCounter(docRef: string, query: OrderQueryBuilderParameter) {
    const db = await connectToDB();
    try {
        const docRef_oi = new ObjectId(docRef);
        const customer_oi = new ObjectId('6485c35814c402ee08ec6294');
        if (!docRef_oi || !docRef_oi.equals(customer_oi))
            return;

        const {options} = orderQueryBuilder(query);

        return await db.collection("orders").countDocuments({...options, customer: customer_oi });

    } catch (e) {
        throw new Error('Failed to count orders for customer with docRef: ' + docRef);
    }
}
