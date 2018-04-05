/**
 * @function omit(obj, keys)
 * @description Creates an object with all the keys of `obj` that are not in `keys`.
 * @since 0.1.1
 * @example 
 * omit({a: 1, b: 2, c: 3}, ["b"]) 
 * // -> {a: 1, c: 3}
 */

export default function omit (obj, keys) {
    //Check for no object or null
    if (typeof obj !== "object" || obj === null) {
        return {};
    }
    //Clone the object
    let newObj = {};
    Object.keys(obj).forEach(function (key) {
        if (keys.indexOf(key) === -1) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

