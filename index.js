
// Global utilities
// ===========================

//Time out wrapper
module.exports.delay = function (delay, fn) {
    return setTimeout(fn, delay);
};

//Set interval wrapper 
module.exports.timer = function (time, fn) {
    return setInterval(fn, time);
};



// Array utils 
// =============================

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
    if (typeof array !== 'object' || array === null || Array.isArray(array) === false) {
        throw new Error('No array provided');
    }
    if (typeof fn !== 'function') {
        throw new Error('No iterator function provided');
    }
    //Iterate over each item in the array
    for (let i = 0; i < array.length; i++) {
        let result = fn.call(null, i, array[i]);
        if (typeof result === 'undefined') {
            continue;
        }
        if (result === false) {
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


// Object methods 
// ========================

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




