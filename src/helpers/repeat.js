/**
 * @function repeat(str, n)
 * @description Repeat a string `n` times.
 * @example
 * repeat("x", 5); 
 * // -> "xxxxx"
 */

export default function repeat (str, n) {
    return new Array(n + 1).join(str);
}

