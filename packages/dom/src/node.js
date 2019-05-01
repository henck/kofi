import {isRef} from "./ref.js";
import {classNames, isDomNode} from "./util.js";

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
            setNodeChildren(node, children);
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
            node.className = classNames(value).join(" ");
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

//Add children to a node
export function setNodeChildren (node, children) {
    children.forEach(function (child) {
        if (child !== null) {
            //Check for text or number child
            if (typeof child === "string" || typeof child === "number") {
                node.appendChild(document.createTextNode(child));
            }
            //Check for array
            else if (typeof child === "object" && Array.isArray(child) === true) {
                setNodeChildren(node, child);
            }
            //Check for node element
            else if (isDomNode(child) === true) {
                node.appendChild(child);
            }
            //Otherwise, ignore this child element
        }
    });
};

//Remove a node from the dom
export function removeNode (node) {
    node.parentNode.removeChild(node);
}

//Remove all children nodes of an element
export function emptyNode (node) {
    while(node.lastElementChild) {
        node.removeChild(node.lastElementChild);
    }
}

