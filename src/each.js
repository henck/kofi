/**
 * @function each(array, fn)
 * @description Iterates over an `array` or an `object`.
 * - `items`: `array` or `object` you want to iterate.
 * - `fn`: function that will be called with each item of the `items` array or object with the following arguments: 
 *   - First argument: the property name if `items` is an object, or the index if `items` is an array.
 *   - Second argument: the property value if `items` is an object, or the value if `items` is an array.
 * You can stop the iteration by returning `false` in the iterator function
 * @example
 * //Iterate over an array 
 * each([1, 2, 3], function (index, value) {
 *     console.log(index + " -> " + value);
 * });
 * // 0 -> 1
 * // 1 -> 2
 * // 2 -> 3
 * 
 * //Iterate over an object 
 * each({"key1": "value1", "key2": "value2"}, function (key, value) {
 *     console.log(key + " -> " + value);
 * });
 * // key1 -> value1
 * // key2 -> value2
 */

export default function each (items, fn) {
    if (typeof items !== "object" || items === null) {
        throw new Error("No array or object provided");
    }
    if (typeof fn !== "function") {
        throw new Error("No iterator function provided");
    }
    let isArray = Array.isArray(items);
    let keys = (isArray === true) ? {length: items.length} : Object.keys(items);
    //Iterate over each item
    for (let i = 0; i < keys.length; i++) {
        let key = (isArray === true) ? i : keys[i];
        if (fn.call(null, key, items[key]) === false) {
            return;
        }
    }
}

