/**
 * @function capitalize(str)
 * @description Returns the capitalized form of `str`. 
 * @example 
 * capitalize("hello world");  
 * // -> "Hello world"
 */

export default function capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

