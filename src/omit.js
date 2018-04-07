/**
 * @function omit(obj, keys)
 * @description Creates an object with all the keys of `obj` that are not in `keys`.
 * @since 0.1.1
 * @example 
 * omit({a: 1, b: 2, c: 3}, ["b"]) 
 * // -> {a: 1, c: 3}
 */

export default function omit (obj, list) {
    //Check for no object or null
    if (typeof obj !== "object" || obj === null) {
        return {};
    }
    //Clone the object
    let newObj = {};
    //Generate an object with only the keys that will be omitted
    let keys = {};
    list.forEach(function (key) {
        keys[key] = true;
    });
    //Filter the object
    Object.keys(obj).forEach(function (key) {
        //Add only the keys that are not in `keys`
        if (!keys[key]) {
            newObj[key] = obj[key];
        }
    });
    return newObj;
}

