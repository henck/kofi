/**
 * @function kebabCase(str)
 * @description Returns the kebab-case form of `str`.
 * @example
 * kebabCase("hello world");
 * // -> "hello-world"
 */

//https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
export default function kebabCase (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
}

