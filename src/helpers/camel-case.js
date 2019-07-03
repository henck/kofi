/**
 * @function camelCase(str)
 * @description Returns the camel-case form of `str`.
 * @example
 * camelCase("hello world");  
 * // -> "helloWorld"
 */

export default function camelCase (str) {
    if (typeof str !== "string") {
        return str; 
    }
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, reg1, reg2) { 
        if (typeof reg2 !== "undefined" && reg2) {
            return reg2.toUpperCase();
        } else {
            return reg1.toLowerCase();
        }
    });
}

