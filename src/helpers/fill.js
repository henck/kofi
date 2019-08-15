/**
 * @function fill(length, value)
 * @description Returns a new array with size `length` filled with `value`. Only `string` or `number` values are allowed.
 * @example 
 * fill(5, 0);
 * // -> [0, 0, 0, 0, 0]
 * fill(3, "abc");
 * // -> ["abc", "abc", "abc"]
 */

export default function fill (length, value) {
    //Create an array with the provided length
    let array = Array.apply(null, Array(length));
    if (typeof value === "number") {
        return array.map(Number.prototype.valueOf, value);
    } else if (typeof value === "string") {
        return array.map(String.prototype.valueOf, value);
    } else {
        return array;
    }
}

