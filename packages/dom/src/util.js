//Check if a value is a node element
export function isDomNode (value) {
    return typeof value === "object" && value !== null && typeof value.nodeType === "number";
}

//Parse class-names
export function classNames (values) {
    //Check for string
    if (typeof values === "string") {
        return [values];
    }
    //Check for array
    else if (Array.isArray(values) === true) {
        return values.filter(function (v) {
            return typeof v === "string" && v.length > 0; 
        });
    }
    //Default: not valid classname
    return [""];
};



