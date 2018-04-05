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
    let newObj = Object.assign({}, obj);
    //Remove selected keys 
    keys.forEach(function (key) {
        if (typeof newObj[key] !== "undefined") {
            delete newObj[key];
        } 
    });
    return newObj;
}

