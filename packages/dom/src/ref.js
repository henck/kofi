//Create ref
export function createRef () {
    return Object.seal({
        "current": null
    });
}

//Check if a provided value is a reference
export function isRef (value) {
    return typeof value === "object" && value !== null && typeof value.current === "object";
}

