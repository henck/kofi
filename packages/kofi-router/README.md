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

Simple usage: 

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

## API

### var router = kofi.router();

Generates a new instance of `kofi.router`.

#### router.route(path, listener)

Registers a new route.

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



