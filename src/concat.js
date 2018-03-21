/**
 * @function concat(array[, *values])
 * @description Returns a new array concatenating `array` with other arrays or values passed.
 * @example
 * concat([1, 2, 3, 4], [5, 6], [7]);
 * // -> [1, 2, 3, 4, 5, 6, 7]
 * concat([1], 2, [3, 4], null);
 * // -> [1, 2, 3, 4, null]
 */

export default function concat () {
    let output = [];
    for (let i = 0; i < arguments.length; i++) {
        let item = arguments[i];
        if (Array.isArray(item) === true) {
            output = output.concat(item);
        } else {
            output.push(item); 
        }
    }
    return output;
}

