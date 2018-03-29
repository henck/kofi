/**
 * @function average(array)
 * @description Returns the average of the values in `array`.
 * @example 
 * average([1, 2, 3, 4, 5]); 
 * // -> 3
 */

export default function average (array) {
  return array.reduce((total, x) => total + x) / array.length;
}

