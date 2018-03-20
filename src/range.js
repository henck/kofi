/**
 * @function range(start, end[, step])
 * @description Returns a new array with values starting in `start` to `end` (included). You can specify the distance between each number in the sequence by providing a `step` value. Default `step` value is `1`.
 * @example
 * range(0, 5); 
 * // -> [0, 1, 2, 3, 4, 5]
 * range(0, 4, 2); 
 * // -> [0, 2, 4] 
 */

export default function range (start, end, step) {
    if (typeof start !== "number") {
        return [];
    }
    if (typeof end !== "number") {
        end = start;
        start = 0;
    }
    //Check if start < end and if start is not negative
    if (0 <= start && start < end) {
        if (typeof step !== "number") {
            step = 1;
        }
        if (step <= 0) {
            throw new Error("Step value must not be zero or negative");
        }
        let len = Math.floor((end - start) / step);
        return Array(len).fill().map(function (el, idx) {
            return start + (idx * step);
        });
    } else {
        //Start or end values not valid, return an empty array
        return [];
    }
}

