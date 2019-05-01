import {isRef} from "./ref.js";
import {addNodeChildren} from "./children.js";

//Create a node element
export function createNode (tag, attr) {
    let node = null;
    //Check for null attributes
    if (attr === null) {
        attr = {};
    }
    //Build children elements
    let children = [];
    for (let i = 2; i < arguments.length; i++) {
        children.push(arguments[i]);
    }
    //Check for string tag
    if (typeof tag === "string") {
        //Create the node tag
        node = document.createElement(tag);
        //Add attributes to new node
        setNodeAttributes(node, attr);
        //Add children
        if (children.length > 0) {
            addNodeChildren(node, children);
        }
    }
    //Check for function tag
    else if (typeof tag === "function") {
        //Create the node element calling the tag function
        node = tag(Object.assign({}, attr, {
            "children": children
        }));
    }
    //Unknow tag type
    else {
        let typeOfTag = typeof tag;
        throw new Error("Unknown tag type. Expected string or function, provided " + typeOfTag);
    }
    //Check for referenced element
    if (isRef(attr.ref) === true) {
        attr.ref.current = node;
    }
    //Return the node element
    return node;
}

//Add attributes to a node
export function setNodeAttributes (node, attr) {
    //For each attribute
    Object.keys(attr).forEach(function (key) {
        //Get the attribute value
        let value = attr[key];
        //Check for not supported keys or values
        if (key === "ref" || value === null) {
            return null;
        }
        //Check the key type
        if (key === "className") {
            node.className = value;
        }
        else if (key === "htmlFor") {
            node.setAttribute("for", value);
        }
        else if (key === "dataset") {
            Object.keys(value).forEach(function (dataKey) {
                if (value[dataKey] !== null) {
                    node.dataset[dataKey] = value[dataKey];
                }
            });
        }
        else if (key === "style") {
            Object.assign(node.style, value);
        }
        //Check for event listeners
        else if (key.indexOf("on") === 0) {
            node.addEventListener(key.slice(2).toLowerCase(), value);
        }
        //Other values
        else if (value === true) {
            node.setAttribute(key, "");
        }
        else if (value !== false) {
            node.setAttribute(key, value);
        }
    });
};

//Remove a node from the dom
export function removeNode (node) {
    node.parentNode.removeChild(node);
}


