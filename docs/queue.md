# kofi Queue

> Asynchronous functions orchestration  

## Usage

```javascript
var queue = kofi.queue();

//Register sync functions to run
queue.then(function (next) {
    /**/
    /* Do your magic */
    /**/
    return next();
});

//Register async functions 
queue.then(function (next) {
    return yourAsyncMethod(args, function (more_args) {
        /**/
        /* Do your magic */
        /**/
        return next();
    });
});

//Call the next function with an error to stop the execution
queue.then(function (next) {
    if (someBadCondition === true) {
        return next(new Error("Something went wrong..."));
    }
    //IF not, continue  
    return next();
});

//Finish method --> all functions have been executed successful
queue.finish(function () {
    console.log("All functions executed!");
});

//Catch errors
queue.catch(function (error) {
    console.log("Error generated executing the functions...");
    console.log(error.mesage);
});
```

## API

### var queue = kofi.queue();

Generates a new instance of the queue manager.

### queue.then(handler);

Registers a new function to the functions queue. This function will be called with a `next` argument, that is a function that will pass to the next function defined with `queue.then`.

Note that calling the `next` argument with an error will make that all functions that were added after this function won't run. Also, this will immediately invoke the `queue.catch` function with the error passed to the `next` function.

```javascript
queue.then(function (next) {
    var input = document.getElementById("user-input");
    setTimeOut(function () {
        if (input.value === "") {
            //Abort the queue
            return next(new Error("User input is empty"));
        } 
        //If not, continue with the next registered function
        return next();
    }, 5000);
});
```

### queue.finish(handler);

Registers the function that will be called when all functions registered with `queue.then` has been executed.

### queue.catch(handler);

Registers the function that will be called when the functions queue was aborted due to an error. 

