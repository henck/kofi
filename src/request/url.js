//Default delimiter
const delimiter = "/";

//Resolves a target URL relative to a base URL
//Inspired in: https://nodejs.org/api/url.html#url_url_resolve_from_to
// Examples: 
// url.resolve("http://example.com/", "/one");  ---> "http://example.com/one"
export function resolveUrl (from, to) {
    return new URL(to, from).href;
}

//Parse an url
export function parseUrl (urlString) {
    return new URL(urlString);
}

//Redirect to a provided url
//export function redirectTo (urlString) {
//    window.location.href = urlString;
//}

//Join urls
export function joinUrl (base) {
    //Initialize the joined url
    let joinedUrl = (base.charAt(base.length -1) !== delimiter) ? base + delimiter : base;
    //Append all urls
    for (let i = 1; i < arguments.length; i++) {
        let segment = arguments[i];
        //Check the segment initial value
        while (segment.charAt(0) === delimiter || segment.charAt(0) === ".") {
            segment = segment.substr(1);
        }
        //Check the final value
        if (segment.charAt(segment.length - 1) !== delimiter && i + 1 < arguments.length) {
            segment = segment + delimiter;
        }
        //Append to the joined url
        joinedUrl = joinedUrl + segment;
    }
    //Return the joined url
    return joinedUrl;
}

//Split an url
export function splitUrl (path) {
    return path.split(delimiter).filter(function (path) {
        return path.length !== 0;
    });
}


