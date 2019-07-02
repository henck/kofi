/**
 * @function max(array)
 * @description Returns the maximum value in `array`.
 * @example 
 * max([1, 2, 3, 4, 5]); 
 * // -> 5
 */

export default function max (array) {
    return Math.max.apply(Math, array);
}

