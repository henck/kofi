/**
 * @function snakeCase(str)
 * @description Returns the snake case form of `str`.
 * @example
 * snakeCase("hello world");
 * // -> "hello_world"
 */

export default function snakeCase (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase();
}

