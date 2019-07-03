# kofi.dispatch

>  Register and trigger custom named events. 

## Example

```javascript
//Initialize the new dispatcher
let dispatcher = kofi.dispatch();

//Register a listener for the event called 'foo'
dispatcher.addListener("foo", function (text) {
    console.log("New text: " + text);
});

//Emit the event called 'foo' with a string as a argument
dispatcher.emit("foo", "Hello world!");
```

## API 

### var dispatcher = kofi.dispatch();

Generates a new dispatcher.

```javascript 
var dispatcher = kofi.dispatch();
```


### dispatcher.addListener(name, listener)

Registers a new `listener` function to the event called `name`.

```javascript 
dispatcher.addListener("error", function (message) {
    console.log("New error generated: " + message);
});
```

### dispatcher.removeListener(name, listener)

Removes the specific `listener` function from the event called `name`.

### dispatcher.removeAllListeners(name)

Removes all listeners of the event called `name`.

### dispatcher.emit(name[, args...])

Trigger all listeners of the event called `name`. All the extra arguments passed to this function will be passed to all registered listeners.

```javascript
dispatcher.emit("error", "Error importing file xxxx.json");
```

