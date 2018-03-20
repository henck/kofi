/**
 * @function eachObj(obj, fn)
 * @description Execute a function `fn` with each pair `key` - `value` in the object `obj`. 
 * @example
 * let obj = { 
 *     "key1": "value1", 
 *     "key2": "value2", 
 *     "key3": "value3" 
 * };
 * eachObj(obj, function (key, value) {
 *     console.log(key + " -> " + value);
 * });
 * // Output in console:
 * // key1 -> value1
 * // key2 -> value2
 * // key3 -> value3
 */

export default function eachObj (obj, fn) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = obj[key];
        if (fn.call(null, key, value) === false) {
            return;
        }
    }
}

