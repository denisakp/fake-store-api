/**
 * Transform _id key to id
 * @param data
 */

const transformResults = (data: any) => {
    const isArray: boolean = Array.isArray(data);

    const transformSingle = (result: any) => {
        if (result._id) {
            const { _id, ...rest } = result;
            return { id: _id, ...rest };
        }
        return result;
    };

    const transformMultiple = (results: any) => {
        return results.map((result: any) => {
            if (result._id) {
                const { _id, ...rest } = result;
                return { id: _id, ...rest };
            }
            return result;
        });
    };

    return isArray ? transformMultiple(data) : transformSingle(data)
};

export default transformResults;
