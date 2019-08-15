/**
 * @function deepClone(obj)
 * @since 0.1.0
 * @description Returns a deep clone of `obj`. Supports cloning arrays, objects, strings, booleans and numbers.
 * @example
 * let obj = [{"foo": true}, {"bar": false}];
 * let clonedObj = deepClone(obj);
 * console.log(clonedObj[0] === obj[0]);
 * // -> false
 * console.log(clonedObj[1] === obj[1]);
 * // -> false
 */

export default function deepClone (obj) {
    return cloneObject(obj, [], []);    
}

//Clone an object
let cloneObject = function (obj, circularObjs, clonedObjs) {
    //Check for non object 
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }
    //Check for array 
    if (Array.isArray(obj) === true) {
        return obj.map(function (value) {
            return cloneObject(value, [], []);
        });
    }
    //Generate a new object 
    let newObj = {};
    circularObjs.push(obj);
    clonedObjs.push(newObj);
    Object.keys(obj).forEach(function (key) {
        //Check if the value of this key in the circular array
        let index = circularObjs.indexOf(obj[key]);
        if (index > -1) {
            //Add the reference to this item
            newObj[key] = clonedObjs[index];
        } else {
            //Preform a deep clone of this item 
            newObj[key] = cloneObject(obj[key], circularObjs, clonedObjs);
        }
    });
    //Return the cloned object 
    return newObj;
};

