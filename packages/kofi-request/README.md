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

### kofi.request(options, callback)

Performs a request to the specified url in the `options` object, and executes the provided `callback` function when the request is done or an error is produced generating the request.

#### `options`

The first argument of `kofi.request` is an object with all the options to perform the request. The following entries are allowed: 

- `url` **mandatory**: a string with the url. This is the only mandatory field of the options object.
- `method`: a string with the http method. Default is `"get"`.

#### `callback` 

The callback function. This function will get three arguments: 

- `error`: an `Error` object if something went wrong.
- `response` an object with the basic information about the generated response. This object will contain the following entries: 
  - `statusCode`: a number with the HTTP response status code. For example, `404`.
  - `statusMessage`: a string with the HTTP response status message. For example, `Not found`.
  - `method`: a string with the request method. 
  - `url`: a string with the request url.
  - `headers`: a parsed object with the response headers.
  - `rawHeaders`: an array with the raw response headers.
- `body`: the response body string or object (if the `json:true` option is provided).

## License

Under the **MIT License**.


