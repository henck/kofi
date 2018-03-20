/**
 * @function values(obj)
 * @description Returns an array of a given object's own enumerable property values. 
 * It's a ponyfill of the [`Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) method. 
 * @example 
 * let obj = {
 *     "name": "Bob",
 *     "city": "Tokio",
 *     "age": 24
 * };
 * values(obj); 
 * // -> values = ["name", "city", "age"]
 */

export default function values (obj) {
    return Object.keys(obj).map(function (key) { 
        return obj[key]; 
    });
}

