/**
 * @function equal(value1, value2)
 * @description Determines if two values are equal. Works with strings, numbers, booleans, objects and arrays.
 * @example 
 * let obj1 = {"key": "value"};
 * let obj2 = {"key": "value"};
 * let obj3 = {"key": null};
 *
 * equal(obj1, obj2); // --> true
 * equal(obj1, obj3); // --> false
 */

export default function equal (value1, value2) {
    //Check the type of each value 
    if (typeof value1 !== typeof value2) {
        return false;
    }
    //Check for number, string or boolean
    if (typeof value1 === "object" && value1 !== null && value2 !== null) {
        let val1IsArray = Array.isArray(value1);
        let val2IsArray = Array.isArray(value2);
        if (val1IsArray !== val2IsArray) {
            return false;
        }
        //Check if values are an array
        if (val1IsArray === true) {
            //Check the length 
            if (value1.length !== value2.length) {
                return false;
            }
            //Check all the values 
            for (let i = 0; i < value1.length; i++) {
                if (equal(value1[i], value2[i]) === false) {
                    return false;
                }
            }
            //All the values in the array are equals
            return true;
        }
        else {
            //Generate the keys of the object 
            let keysVal1 = Object.keys(value1);
            let keysVal2 = Object.keys(value2);
            //Check the number of theks of both objects
            if (keysVal1.length !== keysVal2.length) {
                return false;
            }
            for (let i = 0; i < keysVal1.length; i++) {
                let key = keysVal1[i];
                //Check if this key does not exists in the second value
                if (typeof value2[key] === "undefined") {
                    return false;
                }
                //Check if both values are the same
                if (equal(value1[key], value2[key]) === false) {
                    return false;
                }
            }
            //Both objects contains the same keys and values
            return true;
        }
    }
    //Return if the two values are the same
    return value1 === value2;
} 

