/**
 * @function min(array)
 * @description Returns the minimum value in `array`.
 * @example 
 * min([1, 2, 3, 4, 5]); 
 * // -> 1
 */

export default function min (array) {
    return Math.min.apply(Math, array);
}

