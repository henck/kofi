/**
 * @function keys(obj)
 * @description This is just [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys). 
 * @ example
 * let obj = {
 *     "name": "Bob",
 *     "city": "Tokio",
 *     "age": 24
 * };
 * keys(obj); 
 * // -> values = ["name", "city", "age"]
 */

export default function keys (obj) {
    return Object.keys(obj);
}

