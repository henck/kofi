# kofi

> Tasty takeaway browser utilities.  

[![npm](https://img.shields.io/npm/v/kofi.svg?style=flat-square)](https://www.npmjs.com/package/kofi)
[![npm](https://img.shields.io/npm/dt/kofi.svg?style=flat-square)](https://www.npmjs.com/package/kofi)
[![npm](https://img.shields.io/npm/l/kofi.svg?style=flat-square)](https://github.com/jmjuanes/kofi)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()


**kofi** is a micro utility library for easily creating modern web applications. 

- **kofi works with ES6 modules**: you can import the whole library or only some parts of **kofi** in your ES6 modules.
- **kofi is semi-isomorphic**: some utilities can be used both in Node and browsers. For example, all utilities included in `kofi-utils` can be used in Node and in the browser.


## What is included in kofi?

The **kofi** library is composed by several packages 



## Installation

Use [npm](https://npmjs.com) to install this module: 

```
$ npm install --save kofi
```

You can import it in your HTML files using a `script` tag: 

```html
<script type="text/javascript" src="./node_modules/kofi/kofi.js"></script>
```

Or you can import it in your ES6 modules: 

```javascript
//Import the full library
import * as kofi from "kofi";

//Import individual modules
import {delay, dispatch, request} from "kofi";
```


## License 

Under the **MIT LICENSE**.

