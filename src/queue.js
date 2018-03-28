/**
 * @function queue()
 * @description Queue management
 * @example 
 * let q = queue();
 *
 * //Register tasks to run
 * q.then(function (next) {
 *     console.log("Task 1 completed");
 *     return next();
 * });
 * q.then(function (next) {
 *     console.log("Task 2 completed");
 *     return next();
 * });
 * q.then(function (next) {
 *     console.log("Running an async task");
 *     return asyncMethod(args, function (error) {
 *         // If error is not null, passing the error to the next method will stop the queue 
 *         // and the catch method will be triggered.
 *         return next(error);
 *     });
 * });
 *
 * //Finish the queue
 * q.finish(function () {
 *     console.log("Tasks finished");
 * });
 *
 * //Error listener 
 * q.catch(function (error) {
 *     console.log("Something went wrong running your tasks...");
 *     console.log(error.message);
 * });
 *
 */

export default function queue (fn) {
    //Queue management
    let q = {
        _list: [], 
        _error: null
    };
    //Check the initial function
    if (typeof fn === "function") {
        q._list.push(fn);
    }
    //Add a new function to the list
    q.then = function (fn) {
        if (typeof fn === "function") {
            q._list.push(fn);
        }
        return q;
    };
    //Add an error listener
    q.catch = function (fn) {
        if (typeof fn === "function") {
            q._error = fn;
        }
        return q;
    };
    //Finish the tasks to run
    q.finish = function (fn) {
        let numTasks = q._list.length;
        let taskRun = function (index) {
            //Check for no more tasks to execute
            if (index >= numTasks) {
                if (typeof fn === "function") {
                    return fn.call(null);
                }
                return;
            }
            //Execute the next function
            return q._list[index].call(null, function (error) { 
                if (error) {
                    //Call the error listener
                    if (typeof q._error === "function") {
                        return q._error.call(null, error);
                    }
                } else {
                    //Continue with the next function in the list
                    return taskRun(index + 1);
                }
            });
        };
        //Terrible hack to run this task in async mode
        //TO_DO: change this with a method like process.nextTick in node.js
        setTimeout(function () {
            return taskRun(0);
        }, 0);
        return q;
    };
    return q;
}

