//Dispatch handler
export default function dispatch () {
    let dispatcher = {};
    //Event listeners
    dispatcher._listeners = {};
    //Add a new event listener
    dispatcher.addListener = function (name, listener) {
        if (typeof dispatcher._listeners[name] === "undefined") {
            dispatcher._listeners[name] = [];
        }
        //Register the listener
        dispatcher._listeners[name].push(listener);
    };
    //Remove a listener
    dispatcher.removeListener = function (name, listener) {
        if (typeof dispatcher._listeners[name] !== "undefined") {
            //Find the listener 
            dispatcher._listeners[name].filter(function (value) {
                return value !== listener;
            });
            //Check the number of dispatchers
            //if (dispatcher._listeners[name].length === 0) {
            //    delete dispatcher._listeners[name];
            // }
        }
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

