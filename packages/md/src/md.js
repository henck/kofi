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
let replaceUnicode = function (str) {
    return str.replace(/[<>&()[\]"']/g, function (match) {
        return unicodeChars[match];
    });    
};

//Export the markdown parser
export default function md (str) {
    //Replace all <script> tags
    str = str.replace(/<script[^\0]*?>([^\0]*?)<\/script>/gmi, function (match, content) {
        return "&lt;script&gt;" + content + "&lt;/script&gt;";
    });
    //Convert all headings expressions
    str = str.replace(/^(#+)\s+(.*)/gm, function (match, count, content) {
        let type = count.length.toString();
        return "<h" + type + ">" + content + "</h" + type + ">";
    });
    //Convert all blockquotes expressions
    str = str.replace(/^[\s]*>\s(.*)/gm, function (match, content) {
        return "<blockquote>" + content + "</blockquote>";
    });
    //Convert all code blocks expressions
    str = str.replace(/(?:^``` *(\w*)\n([\s\S]*?)\n```$)/gm, function (match, type, content) {
        return "<pre>" + replaceUnicode(content) + "</pre>";
    });
    //Convert all inline codes expressions
    str = str.replace(/`([^`]*?)`/g, function (match, content) {
        return "<code>" + replaceUnicode(content) + "</code>";
    });
    //Convert all images expressions
    str = str.replace(/!\[(.*)\]\((.*)\)/g, function (match, alt, src) {
        return "<img src=\"" + src + "\" alt=\"" + alt + "\">";
    });
    //Convert all tables expressions
    let tableRegex = /^\|((?:\s+[^\n|]+\s+\|?)+)\|\s*\n\|((?:\s*[:]?[-]+[:]?\s*\|?)+)\|\s*\n((?:^\|(?:\s+[^\n|]+\s+\|?)+\|\s*\n)+)\n/gm;
    str = str.replace(tableRegex, function (match, header, rule, body) {
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
    });
    //Convert all links expressions
    str = str.replace(/[^!]\[(.*?)\]\(([^\t\n\s]*?)\)/gm, function (match, content, url) {
        return "<a href=\"" + url + "\">" + content + "</a>";
    });
    //Convert all horizontal rules expressions
    str = str.replace(/^.*?(?:---|\*\*\*|-\s-\s-|\*\s\*\s\*)/gm, function () {
        return "<hr>";
    });
    //Convert all list expressions
    str = str.replace(/^[\t\s]*?(?:-|\+|\*)\s(.*)/gm, function (match, content) {
        return "<ul><li>" + content + "</li></ul>";
    });
    str = str.replace(/(<\/ul>\n(?:.*)<ul>*)+/g, "");
    //Convert all ordered lists expressions
    str = str.replace(/^[\t\s]*?(?:\d(?:\)|\.))\s(.*)/gm, function (match, content) {
        return "<ol><li>" + content + "</li></ol>";
    });
    str = str.replace(/(<\/ol>\n(?:.*)<ol>*)+/g, "");
    //Convert all strong expressions
    str = str.replace(/(?:\*\*|__)([^\n]+)(?:\*\*|__)/g, function (match, content) {
        return "<strong>" + content + "</strong>";
    });
    //Convert all emphasis expressions
    str = str.replace(/(?:\*|_)([^\n]+)(?:\*|_)/g, function (match, content) {
        return "<em>" + content + "</em>";
    });
    //Convert all line breaks expressions
    str = str.replace(/^\n\n+/gm, function () {
        return "<br>";
    });
    //Return the parsed markdown string
    return str;
}

