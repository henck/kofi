/**
 * @function repeat(str, n)
 * @description Repeat a string `n` times.
 * @example
 * let rep = repeat("x", 5); 
 * // -> "xxxxx"
 */

export default function repeat (str, n) {
    return new Array(n).join(str);
}

