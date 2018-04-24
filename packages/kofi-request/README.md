# kofi-request 

> A delicious HTTP request client library

[![npm](https://img.shields.io/npm/v/kofi-request.svg?style=flat-square)](https://www.npmjs.com/package/kofi-request)
[![npm](https://img.shields.io/npm/dt/kofi-request.svg?style=flat-square)](https://www.npmjs.com/package/kofi-request)
[![npm](https://img.shields.io/npm/l/kofi-request.svg?style=flat-square)](https://github.com/jmjuanes/kofi)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()


## Installation 

Use `npm` to install this module: 

```
$ npm install --save kofi-request
```

Use it with your HTML page: 

```html
<!-- Develop version (not minified) -->
<script type="text/javascript" src="./node_modules/kofi-request/kofi-request.js"></script>

<!-- Minified version -->
<script type="text/javascript" src="./node_modules/kofi-request/kofi-request.min.js"></script>
```

Use it with your ES6 modules: 

```javascript
import {request} from "kofi-request";
```

## Usage

```javascript
//Import a JSON file
kofi.request({method: "get", url: "./data.json", json: true}, function (error, response, body){
    //Check for error processing the request 
    if (error) {
        return console.error(error.message);
    } 
    //Print the response status code
    console.log("Status code: " + response.statusCode);
    //Print the result
    console.log(body);
});
```


## API

### kofi.request(opt, cb)

Performs a request


