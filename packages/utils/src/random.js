/**
 * @function random(min[, max])
 * @description Returns a random number between `min` and `max` (not included). If this functions is called only with one argumet, it returns a random number between `0` and that number.
 * @example
 * random(0, 5);  
 * // -> 3.7561160836655425
 */

export default function random (min, max) {
    if (typeof max !== "number") {
        max = min;
        min = 0; 
    }
    return min + Math.random()*(max - min);
}

