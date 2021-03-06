/**
 * @function sign(num)
 * @description Returns the sign of `num`.
 * @example
 * sign(-45);
 * // -> -1
 * sign(62);
 * // -> 1
 */

export default function sign (num) {
    //Check if the provided value is a number
    if(typeof num === "number" && isNaN(num) === false) {
        return (num < 0) ? -1 : 1;
    }
    return 1;
}

