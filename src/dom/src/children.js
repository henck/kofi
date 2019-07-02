//Check if a value is a node element
export function isDomNode (value) {
    return typeof value === "object" && value !== null && typeof value.nodeType === "number";
}

//Add children to a node
export function addNodeChildren (node, children) {
    children.forEach(function (child) {
        if (child !== null) {
            //Check for text or number child
            if (typeof child === "string" || typeof child === "number") {
                node.appendChild(document.createTextNode(child));
            }
            //Check for array
            else if (typeof child === "object" && Array.isArray(child) === true) {
                addNodeChildren(node, child);
            }
            //Check for node element
            else if (isDomNode(child) === true) {
                node.appendChild(child);
            }
            //Otherwise, ignore this child element
        }
    });
};

//Remove all children nodes of an element
export function removeNodeChildren (node) {
    while(node.lastElementChild) {
        node.removeChild(node.lastElementChild);
    }
}

