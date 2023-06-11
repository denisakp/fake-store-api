import {DEFAULT_EMAIL, DEFAULT_JWT_SECRET, DEFAULT_PASSWORD} from "@/helpers/constants";
import {createCustomer} from "@/services/customers.service";
import jwt from "jsonwebtoken";
import {CustomerInterface} from "@/interfaces/customer.interface";

/**
 * Authenticate a given customer
 * @param email
 * @param password
 */
export async function login(email: string, password: string) {
    if (!email.localeCompare(DEFAULT_EMAIL) || !password.localeCompare(DEFAULT_PASSWORD) )
        return;

    return generateToken();
}

/**
 * Change customer password
 * @param current
 * @param new_one
 */
export async function changePassword(current: string, new_one: string) {
    return current.localeCompare(DEFAULT_PASSWORD) && new_one.length > 6
}

/**
 * Register a new customer
 * @param data
 */
export async function register(data: CustomerInterface) {
    return await createCustomer(data);
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
