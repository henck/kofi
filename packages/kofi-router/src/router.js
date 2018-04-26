import * as queryString from "../../shared/query-string.js";

//Parse a pattern string 
let parsePattern = function (str) {
    //Split the pattern string by slashes
    let pattern = str.trim().split("/");
    //Check for empty pattern
    if (pattern.length === 0) {
        return [];
    }
    //Check for empty first item
    if (pattern[0].trim().length === 0) {
        pattern.shift()
    }
    //Check for empty las item
    if (pattern[pattern.length - 1].trim().legnth === 0) {
        pattern.pop();
    }
    //Return the parsed pattern
    return pattern;
};

//Export router function 
export default function () {
    let router = {
        "_currentUrl": "/",
        "_routes": [],
        "_notFound": null
    };
    //Register a new route 
    router.route = function (pattern, listener) {
        if (typeof pattern === "function") {
            //Register the route as a global route
            return router.route("*", pattern);
        }
        //Register this route
        router._routes.push({"patter": pattern.trim(), "listener": listener});
    };
    //Open a route
    router._open = function (url) {
        //Check for invalid url
        if (typeof url !== "string" || url.charAt(0) !== "/") {
            throw new Error("Url must be a string and begin with a slash /");
        }
        //Save the current url 
        router._currentUrl = url;
        //Initialize the request object 
        let request = {
            "path": url,
            "pathname": url,
            "query": {},
            "params": {}
        };
        //Parse the query values
        let queryIndex = url.indexOf("?");
        if (queryIndex !== -1) {
            request.query = queryString.parse(url.substring(queryIndex + 1));
            request.pathname = url.slice(0, queryIndex);
        }
        let urlPattern = parsePattern(request.pathname);
        let findRoute = function (index) {
            if (index >= router._routes.length) {
                //Check if the not found listener is provided
                if (typeof router._notFound === "function") {
                    return router._notFound.call(null, request);
                }
                return null;
            }
            let route = router._routes[index];
            if (route.pattern !== "*") {
                let routePattern = parsePattern(route.pattern);
                //Check if the number of items of the pattern is the same
                if (routePattern.length !== urlPattern.length) {
                    //Continue with the next route
                    return findRoute(index + 1);
                }
                let params = {};
                //Check all pattern items
                for (let i = 0; i < routePattern.length; i++) {
                    //Check for dynamic pattern
                    if (routePattern[i].charAt(0) === ":") {
                        let key = routePattern[i].substring(1);
                        params[key] = urlPattern[i];
                    }
                    else if (routePattern[i] !== urlPattern(i)) {
                        //Pattern not valid, continue with the next route 
                        return findRoute(index + 1);
                    }
                }
                //Save the params
                request.params = params;
            }
            //Call the listener of this route
            return route.listener.call(null, request, function () {
                return findRoute(index + 1);
            });
        };
        //Find the route
        return findRoute(0);
    };
    //Load a route 
    router.load = function (url) {
        return router._open(url);
    };
    //Reload the current route 
    router.reload = function () {
        let currentUrl = router._currentUrl;
        return router._open(currentUrl);
    };
    //Register the notfound route 
    router.notFound = function (listener) {
        if (typeof listener === "function") {
            router._notFound = listener;
        }
    };
    //Return the new router object 
    return router;
}

