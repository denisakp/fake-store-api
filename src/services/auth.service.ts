import {DEFAULT_EMAIL, DEFAULT_JWT_SECRET, DEFAULT_PASSWORD, DUMMY_CUSTOMER} from "@/helpers/constants";
import jwt from "jsonwebtoken";
import {CustomerInterface} from "@/interfaces/customer.interface";
import maskProperty from "@/helpers/mask-property";
import {ObjectId} from "bson";

/**
 * Authenticate a given customer
 * @param email
 * @param password
 */
export function login(email: string, password: string) {
    if (email.localeCompare(DEFAULT_EMAIL) < 0 || password.localeCompare(DEFAULT_PASSWORD) < 0 )
        return;
    return generateToken();
}

/**
 * Change customer password
 * @param current
 * @param password
 */
export function changePassword(current: string, password: string) {
    return current === DEFAULT_PASSWORD && password;
}

/**
 * Register a new customer
 * @param data
 */
export function register(data: CustomerInterface) {
    const customer = maskProperty(DUMMY_CUSTOMER, ['password', 'address']);
    const _data = maskProperty(data, ['password'] );

    return {...customer, ..._data, _id: new ObjectId()}
}

export function generateToken() {
    const payload = {
        sub: '6485c35814c402ee08ec6294',
        name: 'John Doe',
    }

    const signOptions = {
        expiresIn: '12h',
        issuer: 'FAKE STORE API'
    }

    return jwt.sign(payload, DEFAULT_JWT_SECRET, signOptions)
}
