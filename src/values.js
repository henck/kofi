/**
 * @function values(obj)
 * @description Get a list with the values of an object.
 * @example 
 *
 */

export default function values (obj) {
    return Object.keys(obj).map(function (key) { 
        return obj[key]; 
    });
}

