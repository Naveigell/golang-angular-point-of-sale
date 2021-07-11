export function parseStringToNumberInObject(obj: object, keys = []) {
    const objectKeys = Object.keys(obj);
    for (const objectKey of objectKeys) {
        if (keys.includes(objectKey)) {
            if (!isNaN(obj[objectKey])) {
                obj[objectKey] = Number(obj[objectKey]);
            }
        }
    }
}

export function parseErrors(err1, err2){
    for (const error in err1) {
        if (err1.hasOwnProperty(error)) {
            if (err2.hasOwnProperty(error)) {
                err2[error] = err1[error];
            }
        }
    }
}
