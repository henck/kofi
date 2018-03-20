/**
 * @function pad(num, length[, chars])
 * @description Pad a number adding zeros on the left side if it has less digits than length. 
 * You can also specify the characters used for padding.
 * @example
 * pad(1234, 5); 
 * // -> "01234"
 * pad(1234, 3);
 * // -> "1234"
 * pad(1234, 6, "-");
 * // -> "--1234"
 */
import repeat from "./repeat.js";
export default function pad (num, length, chars) {
    let str = num.toString();
    if (length <= str.length) {
        return str;
    }
    if (typeof chars !== "string" || chars === "") {
        chars = "0";
    }
    let padTimes = Math.floor((length - str.length) / chars.length);
    let left = repeat(chars, padTimes + 1);
    return (left + str).slice(-length);
}

