/**
 * @function fill(length, value)
 * @descript Returns a new array with size `length` filled with `value`.
 * @example 
 * fill(5, 0);
 * // -> [0, 0, 0, 0, 0]
 * fill(3, "abc");
 * // -> ["abc", "abc", "abc"]
 */

export default function fill (length, value) { 
    return Array.apply(null, Array(length)).map(Number.prototype.valueOf, value);
}

