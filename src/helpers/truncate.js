/**
 * @function truncate(str, opt)
 * @description Truncates the provided `str` text if is longer than a provided `length`. The `opt` argument is an `object` with the following entries:
 * - `length`: (**mandatory**) a `number` with the maximum length of `str`.
 * - `separator`: a `string` used to truncate the string `str`.
 * - `omission`: the `string` to be used to represent clipped text. Default is `"..."`. This text is added to the returned string, so the ammount of text displayed from `str` will be decreased.
 * @example
 * truncate("Lorem ipsum dolor sit amet", {length: 11}) 
 * // -> "Lorem ip..."
 * truncate("Lorem ipsum dolor sit amet", {length: 11, omission: ""})
 * // -> "Lorem ipsum"
 * truncate("Lorem ipsum dolor sit amet", {length: 15, separator: " "});
 * // -> "Lorem ipsum..."
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
    let strOmission = (typeof opt.omission === "string") ? opt.omission : "...";
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
            if (outputLength + item.length + strOmission.length >= strLength) {
                break;
            }
            //Check for adding the separator string
            if (i !== 0) {
                output = output + strSeparator;
            }
            output = output + item;
            outputLength = output.length;
        }
        return output + strOmission;
    } else {
        //Cut the string
        return str.substring(0, strLength - strOmission.length) + strOmission;
    }
}
