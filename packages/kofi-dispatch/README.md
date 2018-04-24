# kofi-dispatch

> 


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

Remove the specific `listener` function from the event called `name`.

#### dispatcher.emit(name[, args...])

Trigger all listeners of the event called `name`. All the extra arguments passed to this function will be passed to all listeners.

```javascript
dispatcher.emit("error", "Error importing file xxxx.json");
```

## License

Under the **MIT LICENSE**.

