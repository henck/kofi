# kofi DOM

> Delightful DOM manipulation library

## Getting started

You can use this package to create DOM nodes using the React syntax.

```jsx
/** @jsx createNode */
import {createNode} from "kofi";

//Creating DOM nodes
document.getElementById("example1").appendChild(
    <div className="toast">Hello world!</div>
);

//Funcion components
let Hello = function (props) {
    return <div align="center">Hello {props.name}!</div>;
};

document.getElementById("example2").appendChild(
    <Hello name="Bob" />
);
```

## API

### kofi.createNode(type, attr, ...children)

Based on `React.createElement`, this method creates a new DOM Node element of the specified type. 

#### Node type

The `type` argument can be either a tag name string (such as `"div"` or `"a"`) or a function.

#### Node attributes

The `attr` argument can be an object with the attributes of the node or `null` if no attributes will be specified. The attributes object follows the same syntax of React attributes.

#### Use it with JSX

You can use the babel's plugin [@babel/plugin-transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) for creating DOM elements using JSX. 

This example using JSX: 

```jsx
/** @jsx createNode */
import {createNode} from "kofi";

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
let createNode = require("kofi").createNode;

let user = createNode("div", null, 
    createNode("img", {"className": "avatar", "src": "/path/to/user.png"}),
    createNode("span", null, "Hello user")
);
```

### kofi.createRef()

Creates a new reference that can be attached to a DOM node to save the reference of this node.

```jsx
/** @jsx createNode */
import {createNode, createRef} from "kofi";

//Referenced node
let inputRef = createRef();

//Submit function
let onSubmit = function () {
    console.log("Your name: " + inputRef.current.value);
};

//Form element
let formNode = (
    <div>
        <label>Type your name: </label>
        <input ref={inputRef} type="text" placeholder="Your name..." />
        <button onClick={onSubmit}>Send</button>
    </div>
);

```

### kofi.ready(fn)

Executes the provided function `fn` when the DOM becomes ready. This utility is similar to [jQuery's ready method](https://api.jquery.com/ready/).

```javascript 
//Execute this function when the DOM is ready
kofi.ready(function () {
    console.log("DOM is ready");
});
```

