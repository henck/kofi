import {setNodeChildren} from "./node.js";

//Export fragment component
export function Fragment (attr) {
    //Create the node fragment
    let node = document.createDocumentFragment();
    //Check for children nodes
    if (attr.children !== null && Array.isArray(attr.children) === true) {
        setNodeChildren(node, attr.children);
    }
    //Return the fragment node
    return node;
}


