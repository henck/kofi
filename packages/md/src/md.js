import {escapeHTML} from "./escape-html.js";

//List with all expressions
let expressions = {
    "heading": {
        "regex": /^(#+)\s+(.*)/gm,
        "replacement": function (match, count, content) {
            let type = count.length.toString();
            return "<h" + type + ">" + content + "</h" + type + ">";
        }
    },
    "blockquote": {
        "regex": /^[\s]*>\s(.*)/gm,
        "replacement": function (match, content) {
            return "<blockquote>" + content + "</blockquote>";
        }
    },
    "pre": {
        "regex": /(?:^``` *(\w*)\n([\s\S]*?)\n```$)/gm,
        "replacement": function (match, type, content) {
            return "<pre>" + escapeHTML(content) + "</pre>";
        }
    },
    "code": {
        "regex": /`([^`]*?)`/g,
        "replacement": function (match, content) {
            return "<code>" + escapeHTML(content) + "</code>";
        }
    },
    "image": {
        "regex": /!\[([^\]]*?)\]\(([^)]*?)\)/g,
        "replacement": function (match, alt, src) {
            return "<img src=\"" + src + "\" alt=\"" + alt + "\">";
        }
    },
    "table": {
        "regex": /^\|((?:\s+[^\n|]+\s+\|?)+)\|\s*\n\|((?:\s*[:]?[-]+[:]?\s*\|?)+)\|\s*\n((?:^\|(?:\s+[^\n|]+\s+\|?)+\|\s*\n)+)\n/gm,
        "replacement": function (match, header, rule, body) {
            let table = [];
            table.push("<table>");
            //Build the header
            table.push("<thead>");
            let headerRow = [];
            header.trim().split(" | ").forEach(function (headerName) {
                headerRow.push("<td>" + headerName + "</td>");
            });
            table.push("<tr>" + headerRow.join("") + "</tr>");
            table.push("</thead>");
            //Add the table body
            table.push("<tbody>");
            body.replace(/\r/g, "").split("\n").forEach(function (line) {
                line = line.trim();
                if (line.length > 0) {
                    let bodyRow = [];
                    line.split("|").forEach(function (col) {
                        bodyRow.push("<td>" + col.trim() + "</td>");
                    });
                    table.push("<tr>" + bodyRow.join("") + "</tr>");
                }
            });
            table.push("</tbody>");
            table.push("</table>");
            return table.join("");
        }
    },
    "link": {
        "regex": /\[(.*?)\]\(([^\t\n\s]*?)\)/gm,
        "replacement": function (match, content, url) {
            return "<a href=\"" + url + "\">" + content + "</a>";
        }
    },
    "rule": {
        "regex": /^.*?(?:---|\*\*\*|-\s-\s-|\*\s\*\s\*)/gm,
        "replacement": function () {
            return "<hr>";
        }
    },
    "list": {
        "regex": /^[\t\s]*?(?:-|\+|\*)\s(.*)/gm,
        "replacement": function (match, content) {
            return "<ul><li>" + content + "</li></ul>";
        },
        "afterRegex": /(<\/ul>\n(?:.*)<ul>*)+/g
    },
    "orderedList": {
        "regex": /^[\t\s]*?(?:\d(?:\)|\.))\s(.*)/gm,
        "replacement": function (match, content) {
            return "<ol><li>" + content + "</li></ol>";
        },
        "afterRegex": /(<\/ol>\n(?:.*)<ol>*)+/g
    },
    "strong": {
        "regex": /(?:\*\*|__)([^\n]+)(?:\*\*|__)/g,
        "replacement": function (match, content) {
            return "<strong>" + content + "</strong>";
        }
    },
    "emphasis": {
        "regex": /(?:\*|_)([^\n]+)(?:\*|_)/g,
        "replacement": function (match, content) {
            return "<em>" + content + "</em>";
        }
    }
};

//Export the markdown parser
export function md (str, replacements) {
    //Check for no custom replacements provided
    if (typeof replacements === "undefined" || replacements === null) {
        replacements = {};
    }
    //Replace all <script> tags
    //str = str.replace(/<script[^\0]*?>([^\0]*?)<\/script>/gmi, function (match, content) {
    //    return "&lt;script&gt;" + content + "&lt;/script&gt;";
    //});
    //Replace all expressions
    Object.keys(expressions).forEach(function (key) {
        //Get the replacement function
        let replacement = (typeof replacements[key] === "function") ? replacements[key] : expressions[key].replacement;
        //Replace this expression
        str = str.replace(expressions[key].regex, replacement);
        //Check for regex to apply after the main refex
        if (typeof expressions[key].afterRegex !== "undefined") {
            str = str.replace(expressions[key].afterRegex, "");
        }
    });
    //Replace all line breaks expressions
    str = str.replace(/^\n\n+/gm, function () {
        return "<br>";
    });
    //Return the parsed markdown string
    return str;
}

