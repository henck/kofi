/**
 * @function digits(num)
 * @description Count the digits of `num`.
 * @example
 * digits(12345);  
 * // -> 5
 */

export default function digits (num) {
    if (typeof num === "number") {
        return num.toString().replace(".", "").length;
    }
    return 0;
}

