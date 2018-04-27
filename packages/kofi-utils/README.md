# kofi-utils

> A tasty micro utilities library

[![npm](https://img.shields.io/npm/v/kofi-utils.svg?style=flat-square)](https://www.npmjs.com/package/kofi-utils)
[![npm](https://img.shields.io/npm/dt/kofi-utils.svg?style=flat-square)](https://www.npmjs.com/package/kofi-utils)
[![npm](https://img.shields.io/npm/l/kofi-utils.svg?style=flat-square)](https://github.com/jmjuanes/kofi)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()


## Installation 

Use [npm](https://npmjs.com) to install this module:

```
npm install --save kofi-utils
```

Use it in your browser: 

```html
<!-- Develop version (not minified) -->
<script type="text/javascript" src="./node_modules/kofi-utils/kofi-utils.js"></script>

<!-- Minified version -->
<script type="text/javascript" src="./node_modules/kofi-utils/kofi-utils.min.js"></script>
```

Use it with your ES6 modules: 

```javascript
//Load the full library
import * as kofi from "kofi-utils";

//Load single methods 
import {max, min} from "kofi-utils";
```


## API


#### kofi.average(array)

Returns the average of the values in `array`. 

```javascript
kofi.average([1, 2, 3, 4, 5]); // -> 3
```

#### kofi.camelCase(str)

Returns the camel-case format of `str`.

```javascript
kofi.camelCase("hello world");  // -> "helloWorld"
```

#### kofi.capitalize(str)

Returns the capitalized format of `str`.

```javascript
kofi.capitalize("hello world");  // -> "Hello world"
```

#### kofi.concat(array[, *values])

Returns a new array concatenating `array` with other arrays or values passed.

```javascript
kofi.concat([1, 2, 3, 4], [5, 6], [7]); // -> [1, 2, 3, 4, 5, 6, 7]

kofi.concat([1], 2, [3, 4], null); // -> [1, 2, 3, 4, null]
```

#### kofi.delay(time, fn)

This is just [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) but with the arguments reverted (first the delay `time` in ms, then the callback `fn` function).

```javascript
kofi.delay(1000, function () {
    console.log("Hello after 1 second!!");
});
```

#### kofi.digits(num)

Counts the number of digits of `num`.

```javascript
kofi.digits(12345);  // -> 5
```

#### kofi.each(array, fn)

Iterates over an `array` or an `object`.

- `items`: `array` or `object` you want to iterate.
- `fn`: function that will be called with each item of the `items` array or object with the following arguments: 
  - First argument: the property name if `items` is an object, or the index if `items` is an array.
  - Second argument: the property value if `items` is an object, or the value if `items` is an array.

You can stop the iteration by returning `false` in the iterator function

```javascript
//Iterate over an array 
kofi.each([1, 2, 3], function (index, value) {
    console.log(index + " -> " + value);
});
// 0 -> 1
// 1 -> 2
// 2 -> 3

//Iterate over an object 
kofi.each({"key1": "value1", "key2": "value2"}, function (key, value) {
    console.log(key + " -> " + value);
});
// key1 -> value1
// key2 -> value2
```

#### kofi.extract(obj, keys)

Creates a new object with only the provided keys of `obj`.

```javascript
kofi.extract({a: 1, b: 2, c: 3}, ["a", "c"]) // -> {a: 1, c: 3}
```

#### kofi.fill(length, value)
Returns a new array with size `length` filled with `value`. Only `string` or `number` values are allowed. 

```javascript
//Fill an array with a number
kofi.fill(5, 0); // -> [0, 0, 0, 0, 0]

//Fill an array with a string
kofi.fill(3, "abc"); // -> ["abc", "abc", "abc"]
```

#### kofi.format(str, obj)

Replace all handlebars expressions from `str` with values of `obj`.

```javascript
kofi.format('My car is {{ color }}!', { color: 'blue' }); // --> "My car is blue!"
```

#### kofi.isEmpty(value)

Check if `value` is an empty object, array or string.

```javascript
//Empty array
kofi.isEmpty([]); // -> true
kofi.isEmpty([null]); // -> false

//Empty string
kofi.isEmpty(""); // -> true
kofi.isEmpty(" "); // -> false

//Empty object
kofi.isEmpty({}); // -> true
kofi.isEmpty({"key": null}); // -> false
```

#### kofi.kebabCase(str)

Returns the kebab-case form of the string `str`.

```javascript
kofi.kebabCase("hello world");  // -> "hello-world"
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

#### kofi.omit(obj, keys)

Creates an object with all the keys of `obj` that are not in `keys`.

```javascript
kofi.omit({a: 1, b: 2, c: 3}, ["b"]); // -> {a: 1, c: 3}
```

#### kofi.pad(num, length[, chars])

Pad a number `num` adding zeros on the left side if it has less digits than `length`. You can also specify the characters used for padding.

```javascript
kofi.pad(1234, 5);  // -> "01234"
kofi.pad(1234, 3);  // -> "1234"
kofi.pad(1234, 6, "-");  // -> "--1234"
```

#### kofi.random(min, max)

Returns a random number between `min` and `max` (not included). If this functions is called only with one argumet, it returns a random number between `0` and that number.

```javascript
kofi.random(0, 5);  // -> 3.7561160836655425
```

#### kofi.range(start, end\[, step\])

Returns a new array with values starting in `start` to `end` (included). You can specify the distance between each number in the sequence by providing a `step` value. Default `step` value is `1`.

```javascript
kofi.range(0, 5); // -> [0, 1, 2, 3, 4, 5]
kofi.range(0, 4, 2); // -> [0, 2, 4] 
```

#### kofi.repeat(str, n)

Repeats a string `n` times.

```javascript
kofi.repeat("x", 5);  // -> "xxxxx"
```

#### kofi.sign(num)

Returns the sign of `num`.

```javascript
kofi.sign(-45);  // -> -1
kofi.sign(62);  // -> 1
```

#### kofi.snakeCase(str)

Returns the snake-case form of the string `str`.

```javascript
kofi.snakeCase("hello world");  // -> "hello_world"
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

#### kofi.timestamp(pattern)

Returns a formatted timestamp. The `pattern` argument is a string where the following matches will be replaced:
- `YYYY`: replaced with the current full year.
- `MM`: replaced with the current month.
- `DD`: replaced with the current day.
- `hh`: replaced with the current hours.
- `mm`: replaced with the current minutes.
- `ss`: replaced with the current seconds.

```javascript
kofi.timestamp("Current year: YYYY")
// -> "Current year: 2018"
```

#### kofi.truncate(str, opt)

Truncates the provided `str` text if is longer than a provided `length`. The `opt` argument is an `object` with the following entries:
- `length`: (**mandatory**) a `number` with the maximum length of `str`.
- `separator`: a `string` used to truncate the string `str`.
- `omission`: the `string` to be used to represent clipped text. Default is `"..."`. This text is added to the returned string, so the ammount of text displayed from `str` will be decreased.

```javascript
truncate("Lorem ipsum dolor sit amet", {length: 11}) 
// -> "Lorem ip..."
truncate("Lorem ipsum dolor sit amet", {length: 11, omission: ""})
// -> "Lorem ipsum"
truncate("Lorem ipsum dolor sit amet", {length: 15, separator: " "});
// -> "Lorem ipsum..."
```

#### kofi.uniqueId()

Generates a unique random string of 15 characters.

```javascript
kofi.uniqueId();  // -> str = "wv1ufiqj5e6xd3k"
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


## License 

Under the [MIT LICENSE](./LICENSE).
