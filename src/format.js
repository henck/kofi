/**
 * @function format(str, obj)
 * @description Replace all handlebars expressions from `str` with values of `obj`.
 * @example 
 * format("My car is {{ color }}!", { color: 'blue' }); 
 * // --> "My car is blue!"
 */

export default function format (str, obj, opt) {
    if (typeof obj === "undefined") { 
        return str; 
    }
    if (typeof opt !== "object") { 
        opt = {}; 
    }
    opt.prefix = (typeof opt.prefix === "string") ? opt.prefix.trim() : "{{"; 
    opt.suffix = (typeof opt.suffix === "string") ? opt.suffix.trim() : "}}";
    let reg = new RegExp(opt.prefix + "([^{}]+)" + opt.suffix, "g");
    return str.replace(reg, function (match, found) {
        found = found.trim();
        if (typeof obj[found] !== "undefined") {
            return obj[found].toString();
        } else {
            return match;
        }
    });
}

