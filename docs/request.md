#  kofi Request 

> HTTP request clien for browsers

## API

### kofi.request(options, callback)

Performs a request to the specified url in the `options` object, and executes the provided `callback` function when the request is done or an error is produced generating the request.

#### `options`

The first argument of `kofi.request` is an object with all the options to perform the request. The following entries are allowed: 

- `url` **mandatory**: a string with the url. This is the only mandatory field of the options object.
- `method`: a string with the http method. Default is `"get"`.
- `headers`: an object with the HTTP headers. Default is `{}`.
- `body`: a string data to be sent with the request (not working with GET requests). If the `json` option is set to `true`, `body` must be a valid JSON object that will be converted to string using `JSON.stringify`.
- `json`: if set to `true`, the request body is serialized as a JSON and adds the `Content-type: application/json` header to the request. It also evaluates the response body as a JSON and returns a JSON object instead of a string. Default is `false`.
- `form`: if an object is passed on this option, the request body is set to it's query-string representation. It also adds the `Content-type: application/x-www-form-urlencoded` header to the request.
- `formData`: an instance of [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) with the data to perform a `multipart/form-data`request. 
- `processData`: set to `false` to send non-process data with the request (data passed with the `form` option won't be serialized as a query-string, and the body won't be serialized as a JSON when the `json` option is set to `true`). Default is `true`.
- `auth`: an object with the credentials to authenticate users. Only `basic` or `bearer` authentication schemes are supported. Default is `{}`. 

#### `callback` 

The callback function. This function will get three arguments: 

- `error`: an instance of `Error` if something went wrong doing the request of parsing the response, or an instance of `kofi.HTTPError` if the request returns non-200 status codes (feature added in **v0.2.0**).
  - On `v0.2.0`, non-200 status codes will be treated as errors. 
- `response` an object with the basic information about the generated response. This object will contain the following entries: 
  - `statusCode`: a number with the HTTP response status code. For example, `404`.
  - `statusMessage`: a string with the HTTP response status message. For example, `Not found`.
  - `method`: a string with the request method. 
  - `url`: a string with the request url.
  - `headers`: a parsed object with the response headers.
  - `rawHeaders`: an array with the raw response headers.
- `body`: the response body string or object (if the `json` option is provided).


## Examples

### Basic example

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

### Sending data

#### Sending JSON object

```javascript
let obj = {
    "name": "Bob",
    "registered": false,
    "password": null
};
kofi.request({url: "/register", method: "put", json: true, body: obj}, function (error, res, body) {
    /* ... */
}); 
```

### Forms

#### application/x-www-form-urlencoded 

Use the `form` option to send URL-encoded forms: 

```javascript
let form = {
    "name": "Bob",
    "age": "30",
    "city": "New York"
};
kofi.request({url: "/my/service", method: "post", form: form}, function (error, res, body) {
    /* ... */
});
```

#### multipart/form-data

Use the `formData` option to send `multipart/form-data` forms. Check the [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) interface documentation for more information.

```javascript 
let formData = new FormData();

//Append key/value pains
formData.append("username", "Bob");

//Append files
formData.append("userpic", fileInput.files[0], "avatar.jpg");

//Send to the server
kofi.request({url: "/process/uploads", method: "post", formData: formData}, function (error, res, body) {
    /* do your magic with the response */
});
```


