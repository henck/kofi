//Unicode characters 
let unicodeChars = {
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;",
    "&": "&amp;",
    "(": "&#40;",
    ")": "&#41;",
    "[": "&#91;",
    "]": "&#93;"
};

//Replace all unicode characters
export function escapeHTML (str) {
    return str.replace(/[<>&()[\]"']/g, function (match) {
        return unicodeChars[match];
    });    
}


