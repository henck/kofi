/**
 * @function isEmpty(value);
 * @description Check if `value` is an empty object, array or string.
 * @example
 * isEmpty([]);
 * // -> true
 * isEmpty([null]);
 * // -> false
 * isEmpty("");
 * // -> true
 * isEmpty(" ");
 * // -> false
 * isEmpty({});
 * // -> true
 * isEmpty({"key": null});
 * // -> false
 */

export default function isEmpty (value) {
    if (typeof value === "string") {
        return value.length === 0;
    } else if (Array.isArray(value) === true && value !== null) {
        return value.length === 0;
    } else if (typeof value === "object" && value !== null) {
        return Object.keys(value).length === 0;
    }
    //Default, return false 
    return false;
}

