/**
 * This helper remove a given properties from the object
 * @param object
 * @param properties
 */
export default function maskProperty (object: any, properties: string[]) {
    const maskedObject = {...object};

    properties.forEach((property) => {
        if(maskedObject.hasOwnProperty(property)) {
            delete maskedObject[property];
        }
    });

    return maskedObject;
}
