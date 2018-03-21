/**
 * @function dispatch()
 * @description The `dispatch` allows you to bind and trigger custom named events. Calling `dispatch` without arguments returns a new object with the following functions:
 * - `on(event, listener)`: register a new `listener` function to `event`. The `listener` function will be called when the `event` is fired.
 * - `emit(event[, args])`: trigger all listeners of `event`. All listeners will be called with the arguments passed to this method.
 * @example
 * let dispatcher = dispatch();
 *
 * //Register a event listener 
 * dispatcher.on("warning", function (value) {
 *     console.log("WARNING MESSAGE: " + value);
 * });
 *
 * //Trigger a event
 * dispatcher.emit("warning", "A warning message generated");
 * // -> "WARNING MESSAGE: A warning message generated"
 *
 */

export default function dispatch () {
    let listeners = {};
    let dispatcher = {};
    //Add a new event listener
    dispatcher.on = function (name, listener) {
        if (typeof listeners[name] === "undefined") {
            listeners[name] = [];
        }
        listeners[name].push(listener);
        return dispatcher;
    };
    //Emit an event
    dispatcher.emit = function () {
        if (arguments.length === 0) {
            return null;
        }
        let name = arguments[0];
        //Check if there are listeners registered for this event
        if (typeof listeners[name] !== "undefined") {
            let args = [];
            for (let i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            for (let i = 0; i < listeners[name].length; i++) {
                listeners[name][i].apply(null, args);
            }
        }
        return null;
    };
    //Return the dispatcher 
    return dispatcher;
}

