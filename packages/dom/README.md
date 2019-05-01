# @kofijs/dom

> Delightful DOM manipulation library

[![npm](https://img.shields.io/npm/v/@kofijs/dom.svg?style=flat-square)](https://www.npmjs.com/package/@kofijs/dom)
[![npm](https://img.shields.io/npm/dt/@kofijs/dom.svg?style=flat-square)](https://www.npmjs.com/package/@kofijs/dom)
[![npm](https://img.shields.io/npm/l/@kofijs/dom.svg?style=flat-square)](https://github.com/jmjuanes/kofi)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()


## Installation

Use [npm](https://npmjs.com) to install this module: 

```
$ npm install --save @kofijs/dom
```

You can import it in your HTML files using a `script` tag: 

```html
<script type="text/javascript" src="./node_modules/@kofijs/dom/kofi-dom.js"></script>
```

Or you can import it in your ES6 modules: 

```javascript
//Import the full library
import * as kofi from "@kofijs/dom";

//Import individual modules
import {createNode, ready} from "@kofijs/dom";
```

## Getting started




## API

### kofi.createNode(tag, attr, ...children)


#### Use it with JSX

You can use the babel's plugin [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) for creating DOM elements using JSX. 

For example, this example using JSX: 

```jsx
/** @jsx createNode */
import {createNode} from "@kofijs/dom";

let user = (
    <div>
        <img className="avatar" src="/path/to/user.png" />
        <span>Hello user</span>
    </div>
);
```

Compiles to:

```javascript
/** @jsx createNode */
let createNode = require("#kofijs/dom").createNode;

let user = createNode("div", null, 
    createNode("img", {"className": "avatar", "src": "/path/to/user.png"}),
    createNode("span", null, "Hello user")
);
```



### kofi.createRef()

### kofi.ready(fn)

Executes the provided function `fn` when the DOM becomes ready. This utility is similar to [jQuery's ready method](https://api.jquery.com/ready/).

```javascript 
//Execute this function when the DOM is ready
kofi.ready(function () {
    console.log("DOM is ready");
});
```

## License 

Under the **MIT LICENSE**.

