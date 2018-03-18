# kofi

> A tasty Javascript utility library

[![npm](https://img.shields.io/npm/v/kofi.svg?style=flat-square)](https://www.npmjs.com/package/kofi)
[![npm](https://img.shields.io/npm/dt/kofi.svg?style=flat-square)](https://www.npmjs.com/package/kofi)
[![npm](https://img.shields.io/npm/l/kofi.svg?style=flat-square)](https://github.com/jmjuanes/kofi)

## Installation 

Use [npm](https://npmjs.com) to install this module:

```
npm install --save kofi
```

Now you can import it into your project:

```javascript
let kofi = require("kofi");
```




## API

#### 


### Array utilities

#### kofi.has(array, item)

Returns `true` if `item` exists in `array`, `false` if not.

```javascript
kofi.has([1, 2, 3, 4], 2); // -> true
kofi.has([1, 2, 3, 4], 5); // -> false
```

#### kofi.max(array)

Returns the maximum value in `array`. 

```javascript
kofi.max([1, 2, 3, 4, 5]); // -> 5
```

#### kofi.min(array)

Returns the minimum value in `array`.

```javascript
kofi.min([1, 2, 3, 4, 5]); // -> 1
```


### Function utilities

#### kofi.delay(time, fn)

This is just [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) but with the arguments reverted (first the delay `time` in ms, then the callback `fn` function).

```javascript
kofi.delay(1000, function () {
    console.log("Hello after 1 second!!");
});
```

#### kofi.timer(time, fn)

This is just [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) but with the arguments reverted (first the delay `time` in ms and then the callback `fn` function).

```javascript
let counter = 0;
kofi.timer(1000, function () {
    counter = counter + 1;
    console.log(counter);
});
```

### Math utilities

#### kofi.range(start, end\[, step\])

Returns a new array with values starting in `start` to `end` (included). You can specify the distance between each number in the sequence by providing a `step` value. Default `step` value is `1`.

```javascript
kofi.range(0, 5); // -> [0, 1, 2, 3, 4, 5]
kofi.range(0, 4, 2); // -> [0, 2, 4] 
```


### Object utilities 

#### kofi.eachObj(obj, fn)

Execute a function `fn` with each pair `key` - `value` in the object `obj`. 

```javascript
let obj = { 
    key1: "value1", 
    key2: "value2", 
    key3: "value3" 
};
kofi.eachObj(obj, function (key, value) {
    console.log(key + " -> " + value);
});

//Output in console:
// key1 -> value1
// key2 -> value2
// key3 -> value3
```

#### kofi.keys(obj)

This is just [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).

```javascript
let obj = {
    a: 1,
    b: 2,
    c: "hello"
};
let keys = kofi.keys(obj); // --> keys = ["a", "b", "c"]
```

#### kofi.values(obj)

Returns an array of a given object's own enumerable property values. It's a ponyfill of the [ `Object.values`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values) method.

```javascript
let obj = {
    a: 1,
    b: 2,
    c: "hello"
};
let values = kofi.values(obj); // -> values = [1, 2, "hello"]
```


### String utilities

#### kofi.format(str, obj)

Replace all handlebars expressions from `str` with values of `obj`.

```javascript
kofi.format('My car is {{ color }}!', { color: 'blue' }); // --> "My car is blue!"
```

#### kofi.camelCase(str)

Return the camel-case format of `str`.

```javascript
kofi.camelCase("hello world");  // -> "helloWorld"
```


#### kofi.capitalize(str)

Return the capitalized format of `str`.

```javascript
kofi.capitalize("hello world");  // -> "Hello world"
```


#### kofi.uniqueId()

Generate a unique random string of 15 characters.

```javascript
let str = kofi.uniqueId();  // -> str = "wv1ufiqj5e6xd3k"
```




