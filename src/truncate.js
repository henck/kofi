/**
 * @function truncate(str, opt)
 * @since 0.1.3 
 * @description Truncates the provided `str` text if is longer than a provided `length`. The `opt` argument is an `object` with the following entries:
 * - `length`: (**mandatory**) a `number` with the maximum length of `str`.
 * - `separator`: a `string` used to truncate the string `str`.
 * @example
 *
 */

export default function truncate (str, opt) {
    //Check the string
    if (typeof str !== "string") {
        throw new Error("No string to truncate provided");
    }
    //Check the options object
    if (typeof opt !== "object" || opt === null) {
        opt = {};
    }
    let strLength = (typeof opt.length === "number") ? opt.length : 20;
    let strSeparator = (typeof opt.separator === "string") ? opt.separator : null;
    //Check the length of the string
    if (str.length <= strLength) {
        return str;
    }
    //Check if a separator string is provided
    if (strSeparator) {
        //Split the string by the separator
        let items = str.split(strSeparator);
        let output = "";
        let outputLength = 0;
        //Iterate over all items
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            //Check the length of the output string with the current item
            if (outputLength + item.length >= strLength) {
                break;
            }
            //Check for adding the separator string
            if (i !== 0) {
                output = output + strSeparator;
            }
            output = output + item;
            outputLength = output.length;
        }
        return output;
    } else {
        //Cut the string
        return str.substring(0, strLength);
    }
}
