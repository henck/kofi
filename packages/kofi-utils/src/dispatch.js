/**
 * @function dispatch()
 * @description The `dispatch` allows you to bind and trigger custom named events. Calling `dispatch` without arguments returns a new object with the following functions:
 * - `on(event, listener)`: register a new `listener` function to `event`. The `listener` function will be called when the `event` is fired.
 * - `emit(event[, args])`: trigger all listeners of `event`. All listeners will be called with the arguments passed to this method.
 * @example
 * let dispatcher = dispatch();
 *
 * //Register an event listener 
 * dispatcher.on("warning", function (value) {
 *     console.log("WARNING MESSAGE: " + value);
 * });
 *
 * //Trigger an event
 * dispatcher.emit("warning", "A warning message generated");
 * // -> "WARNING MESSAGE: A warning message generated"
 *
 */

export default function dispatch () {
    let dispatcher = {};
    //Event listeners
    dispatcher._listeners = {};
    //Add a new event listener
    dispatcher.on = function (name, listener) {
        if (typeof dispatcher._listeners[name] === "undefined") {
            dispatcher._listeners[name] = [];
        }
        dispatcher._listeners[name].push(listener);
        return dispatcher;
    };
    //Emit an event
    dispatcher.emit = function () {
        if (arguments.length === 0) {
            return;
        }
        //Get the event name 
        let name = arguments[0];
        //Check if there are listeners registered for this event
        if (typeof dispatcher._listeners[name] !== "undefined") {
            let args = [];
            for (let i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            let listeners = dispatcher._listeners[name];
            for (let i = 0; i < listeners.length; i++) {
                listeners[i].apply(null, args);
            }
        }
        return;
    };
    //Return the dispatcher 
    return dispatcher;
}

