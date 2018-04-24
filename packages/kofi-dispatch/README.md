# kofi-dispatch

> A delightful library to register and trigger custom named events. 

[![npm](https://img.shields.io/npm/v/kofi-dispatch.svg?style=flat-square)](https://www.npmjs.com/package/kofi-dispatch)
[![npm](https://img.shields.io/npm/dt/kofi-dispatch.svg?style=flat-square)](https://www.npmjs.com/package/kofi-dispatch)
[![npm](https://img.shields.io/npm/l/kofi-dispatch.svg?style=flat-square)](https://github.com/jmjuanes/kofi)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()


## Installation 

Use [nmp](https://npmjs.com) to install this package: 

```
$ npm install --save kofi-dispatch
```

Use it in your HTML files:

```html
<!-- Develop version -->
<script type="text/javascript" src="./node_modules/kofi-dispatch/kofi-dispatch.js"></script>

<!-- Minified version -->
<script type="text/javascript" src="./node_modules/kofi-dispatch/kofi-dispatch.min.js"></script>
```

Use it in your ES6 modules: 

```javascript
import {dispatch} from "kofi-dispatch";
```

## Usage

```javascript
let dispatcher = kofi.dispatch();

dispatcher.addListener("foo", function (text) {
    console.log("New text: " + text);
});

dispatcher.emit("foo", "Hello world!");
```

## API 

### var dispatcher = kofi.dispatch();

Generates a new dispatcher.

```javascript 
var dispatcher = kofi.dispatch();
```


#### dispatcher.addListener(name, listener)

Registers a new `listener` function to the event called `name`.

```javascript 
dispatcher.addListener("error", function (message) {
    console.log("New error generated: " + message);
});
```

#### dispatcher.removeListener(name, listener)

Removes the specific `listener` function from the event called `name`.

#### dispatcher.removeAllListeners(name)

Removes all listeners of the event called `name`.

#### dispatcher.emit(name[, args...])

Trigger all listeners of the event called `name`. All the extra arguments passed to this function will be passed to all listeners.

```javascript
dispatcher.emit("error", "Error importing file xxxx.json");
```

## License

Under the **MIT LICENSE**.

