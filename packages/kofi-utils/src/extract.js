/**
 * @function extrack(obj, keys)
 * @description Creates a new object with only the provided keys of `obj`.
 * @example
 * extract({a: 1, b: 2, c: 3}, ["b"]) 
 * // -> {b: 2}
 */

export default function extract (obj, keys) {
    //Check the provided object 
    if (typeof obj !== "object" || obj === null) {
        return {};
    }
    let newObj = {};
    //Clone only the provided keys 
    keys.forEach(function (key) {
        if (typeof obj[key] !== "undefined") {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

