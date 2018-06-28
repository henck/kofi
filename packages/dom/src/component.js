import {mountElement, updateElement} from "./element.js";

//Create a new component
export function createComponent(obj) {
    if (typeof obj !== "object" || obj === null) {
        throw new Error("createComponent argument must ve a valid object");
    }
    //Component default configuration
    let component = {
        "state": null,
        "props": null,
        "refs": null,
        "getDefaultState": function () {
            return {};
        },
        "getDefaultProps": function () {
            return {};
        }
    };
    //Assign the functions defined in the provided object
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === "function") {
            //Assign this function to the new component object
            component[key] = obj[key];
        }
        if (key === "state" || key === "props") {
            throw new Error("Invalid function name '" + key + "'. This name is already reserved");
        }
        //console.warn("Invalid type '" + key + "'. Only functions are allowed");
    });
    //Undefined component render
    if (typeof component.render !== "function") {
        throw new Error("You must implement the component's 'render' method");
    }
    //Return the new component
    return component;
}

//Mount a component
export function mountComponent(originalComponent, props, parent) {
    //Clone the component
    let component = Object.assign({}, originalComponent);
    Object.keys(component).forEach(function (key) {
        if (typeof component[key] === "function") {
            component[key] = component[key].bind(component);
        }
    });
    let currentContent = null;
    //Get the initial state and props
    component.props = Object.assign(component.getDefaultProps(), props);
    component.state = component.getDefaultState();
    //Render the component content
    let renderComponent = function () {
        let content = component.render.call(component, component.props, component.state);
        if (typeof content !== "object") {
            throw new Error("Invalid content returned from 'render' method.");
        }
        return content;
    };
    //Define component set state method
    component.setState = function (newState, cb) {
        if (typeof newState !== "object" || newState === null) {
            throw new Error("New state must be an object");
        }
        component.state = Object.assign(component.state, newState);
        let content = renderComponent();
        updateElement(content, currentContent, parent);
        currentContent = content;
        if (typeof component.onUpdate === "function") {
            component.onUpdate.call(component);
        }
        if (typeof cb === "function") {
            return cb.call(component);
        }
    };
    component.setState = component.setState.bind(this);
    //Mount the component
    currentContent = renderComponent();
    mountElement(currentContent, parent);
    if (typeof component.onReady === "function") {
        component.onReady.call(component);
    }
    return component;
}

