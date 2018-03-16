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




