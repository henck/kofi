# kofi-router

> 


## Installation

Use [npm](https://npmjs.com) to install this module: 

```
$ npm install --save kofi-router
```

Import this module in your HTML files: 

```html
<!-- Development version -->
<script type="text/javascript" src="./node_modules/kofi-router/kofi-router.js"></script>

<!-- Minified version -->
<script type="text/javascript" src="./node_modules/kofi-router/kofi-router.min.js"></script>
```

Import in your ES6 module: 

```javascript 
//Load the full library
import * as kofi from "kofi-router";

//Import single methods
import {router} from "kofi-router";
```

## Usage

```javascript 
let router = kofi.router();

//Register single routes
router.route("/foo", function () {
    console.log("Enter to foo");
});

//Register routes with params
router.route("/foo/:bar", function (req) {
    console.log("Bar is " + req.params.bar);
});

//Read query parameters
router.route("/bar", function (req) {
    console.log("Name: " + req.query.name);
});
```

#### Simple usage 

``` javascript
//Load a single route
router.load("/foo");
// --> Enter to foo

//Load a route with params
router.load("/foo/blue");
// --> Bar is blue

//Pass query-string params
router.load("/bar?name=Bob");
// --> Name: Bob
```

#### Listen to hashbang urls

```javascript
//Listen to hashbang changes
kofi.hashbangChange(function (url) {
    router.load(url);
});

//First load
router.load(kofi.getHashbang());

//Redirect to a url
kofi.setHashbang("/foo");
// --> Enter to foo

//Redirect to a url with query-string params
kofi.setHashbang("/bar?name=Susan");
// --> Name: Susan
```

## API

### var router = kofi.router();

Generates a new instance of `kofi.router`.

#### router.route(path, listener)

Registers a new listener for the route `path`. The listener receives an object with the request information: 

- `path`: a string with the full matched url.
- `pathname`: a string with the matched url without the query segment (the part after que question mark).
- `query`: an object with all the parsed querystring parametes extracted from the matched path. Default is an empty object `{}`.
- `params`: an object with all the dynamic parts of the matched path. Default is an empty object `{}`.

```javascript
router.route("/", function (req) {
    console.log("Path: " + req.path);
    console.log("Pathname: " + req.pathname);
    console.log("Querystring values: ");
    Object.keys(req.query).forEach(function (key) {
        console.log("  " + key + " -> " + req.query[key]);
    });
    console.log("Params: ");
    Object.keys(req.params).forEach(function (key) {
        console.log("  " + key + " -> " + req.params[key]);
    });
});
```

If the provided `path` string is a catch-all path (`"*"`), the `listener` function will also receive a function to continue with the search of the route that matches the path.

```javascript
router.route("*", function (req, next) {
    console.log("New request --> " + req.pathname);
    return next();
});
```

Note that the order of how the routes are defined is important, so you should define the catch-all routes first.

#### router.load(url)

Call a handler for the provided `url` string.

#### router.reload()

Call again the handler for the last url used with `router.load`.

### Hashbang navigation methods 

#### kofi.getHashbang()

Returns the current hasbang navigation url.

#### kofi.setHashbang(url)

Sets the current hashbang navigation value to the url provided.

#### kofi.hashbangChange(listener)

Adds a new listener that will be triggered when the hashbang navigation value vhanges.

```javascript 
kofi.hashbangChange(function (url) {
    console.log("New hashbang --> " + url);
});
```

## License

Under the **MIT License**.



