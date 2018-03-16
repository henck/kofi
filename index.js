//
// Kofi - A tasty JavaScript utility library
// Released under the MIT LICENSE.
//


//
// Global utilities
// 

//Time out wrapper
module.exports.delay = function (delay, fn) {
    return setTimeout(fn, delay);
};

//Manage events
module.exports.dispatch = function () {
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
};

//Queue management
module.exports.queue = function (fn) {
    let taskList = [];
    let taskError = function() {
        return null;
    };
    //Check the initial function
    if (typeof fn === "function") {
        taskList.push(fn);
    }
    //Queue management
    let q = {
        then: function (fn) {
            if (typeof fn === "function") {
                taskList.push(fn);
            }
            return q;
        },
        catch: function (fn) {
            if (typeof fn === "function") {
                taskError = fn;
            }
            return q;
        },
        finish: function (fn) {
            let numTasks = taskList.length;
            let taskRun = function (index) {
                //Check for no more tasks to execute
                if (index >= numTasks) {
                    if (typeof fn === "function") {
                        return fn.call(null);
                    }
                    return;
                }
                //Execute the next function
                return taskList[index].call(null, function (error) {
                    if (error) {
                        //Call the task error 
                        return taskError.call(null, error);
                    }
                    //Continue with the next function in the list
                    return taskRun(index + 1);
                });
            };
            //Terrible hack to run this task in async mode
            //TO_DO: change this with a method like process.nextTick in node.js
            setTimeout(function () {
                return taskRun(0);
            }, 0);
            return q;
        }
    };
    return q;
};

//Set interval wrapper 
module.exports.timer = function (time, fn) {
    return setInterval(fn, time);
};



//
// Array utilities 
//

//Array concat 
module.exports.concat = function() {
    let output = [];
    for (let i = 0; i < arguments.length; i++) {
        let item = arguments[i];
        if (Array.isArray(item) === true) {
            output = output.concat(item);
        } else {
            output.push(item); 
        }
    }
    return output;
};

//Array each method
module.exports.each = function (array, fn) {
    if (typeof array !== "object" || array === null || Array.isArray(array) === false) {
        throw new Error("No array provided");
    }
    if (typeof fn !== "function") {
        throw new Error("No iterator function provided");
    }
    //Iterate over each item in the array
    for (let i = 0; i < array.length; i++) {
        if (fn.call(null, array[i], i) === false) {
            break;
        }
    }
};

//Check if an element exists inside the array
module.exports.has = function (array, item) {
    return array.indexOf(item) !== -1;
};

//Array max method
module.exports.max = function (array) {
    return Math.max.apply(Math, array);
};

//Array min method
module.exports.min = function (array) {
    return Math.min.apply(Math, array);
};

//Return a range of values
module.exports.range = function (start, end, step) {
    if (typeof start !== "number") {
        return [];
    }
    if (typeof end !== "number") {
        end = start;
        start = 0;
    }
    //Check if start < end and if start is not negative
    if (0 <= start && start < end) {
        if (typeof step !== "number") {
            step = 1;
        }
        if (step <= 0) {
            throw new Error("Step value must not be zero or negative");
        }
        let len = Math.floor((end - start) / step);
        return Array(len).fill().map(function (el, idx) {
            return start + (idx * step);
        });
    } else {
        //Start or end values not valid, return an empty array
        return [];
    }
};

//Create an array with zeros
module.exports.zeros = function (num) {
    return Array.apply(null, Array(num)).map(Number.prototype.valueOf, 0);
};



//
// Comparison utilities
//

//Check if 'value' is an empty object, array or string
module.exports.isEmpty = function (value) {
    if (typeof value === "string") {
        return value.length === 0;
    } else if (Array.isArray(value) === true && value !== null) {
        return value.length === 0;
    } else if (typeof value === "object" && value !== null) {
        return Object.keys(value).length === 0;
    }
    //Default, return false 
    return false;
};

//Check if a string is in lower-case format
module.exports.isLowerCase = function (str) {
    if (typeof str === "string") {
        return str.toLowerCase() === str;
    }
    return false;
};

//Check if a string is in upper-case format
module.exports.isUpperCase = function (str) {
    if (typeof str === "string") {
        return str.toUpperCase() === str;
    }
    return false;
};



//
// Object utilities 
// 

//Get a list with all the keys of an object
module.exports.keys = function (obj) {
    return Object.keys(obj);
};

//Get a list with the values of an object
module.exports.values = function (obj) {
    return Object.keys(obj).map(function (key) { 
        return obj[key]; 
    });
};



//
// String utilities
// 

//Generate the camelCase varsion of a string
module.exports.camelCase = function (str) {
    if (typeof str !== "string") {
        return str; 
    }
    return str.replace(/^([A-Z])|[\s-_](\w)/g, function (match, reg1, reg2) { 
        if (typeof reg2 !== "undefined" && reg2) {
            return reg2.toUpperCase();
        } else {
            return reg1.toLowerCase();
        }
    });
};

//Format a template string
module.exports.format = function (str, obj, opt) {
    if (typeof obj === "undefined") { 
        return str; 
    }
    if (typeof opt !== "object") { 
        opt = {}; 
    }
    opt.prefix = (typeof opt.prefix === "string") ? opt.prefix.trim() : "{{"; 
    opt.suffix = (typeof opt.suffix === "string") ? opt.suffix.trim() : "}}";
    let reg = new RegExp(opt.prefix + "([^{}]+)" + opt.suffix, "g");
    return str.replace(reg, function (match, found) {
        found = found.trim();
        if (typeof obj[found] !== "undefined") {
            return obj[found].toString();
        } else {
            return match;
        }
    });
};

//Return a string in kebab-case format
//https://en.wikipedia.org/wiki/Letter_case#Special_case_styles
module.exports.kebabCase = function (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
};

//Return a string in snake case format
module.exports.snakeCase = function (str) {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/\s+/g, '_').toLowerCase();
};

//Repeat a string n times
module.exports.repeat = function (str, n) {
    return new Array(n).join(str);
};

//Generate a unique string
module.exports.uniqueId = function () {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
};

