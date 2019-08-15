/**
 * @function timestamp(pattern)
 * @description Returns a formatted timestamp. The `pattern` argument is a string where the following matches will be replaced:
 * - `YYYY`: replaced with the current full year.
 * - `MM`: replaced with the current month.
 * - `DD`: replaced with the current day.
 * - `hh`: replaced with the current hours.
 * - `mm`: replaced with the current minutes.
 * - `ss`: replaced with the current seconds.
 *
 * @example
 * timestamp("Current year: YYYY")
 * // -> "Current year: 2018"
 */

import pad from "./pad.js";

//Available values
let values = ["YYYY", "MM", "DD", "hh", "mm", "ss"];

//Get the current time
let currentTime = function () {
    let date = new Date();
    let result = {};
    let regex = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d).\d\d\dZ/g;
    let current = regex.exec(date.toJSON());
    if (current === null || current.length < 7) {
        return null;
    }
    for (let i = 0; i < 6; i++) {
        //The first element is the full matched string
        result[values[i]] = current[i + 1];
    }
    return result;
};

//Parse the provided pattern and return the wanted timestamp
export default function timestamp (pattern) {
    if (typeof pattern !== "string") {
        pattern = "YYYY-MM-DD hh:mm:ss";
    }
    let current = currentTime();
    if (current === null) {
        return "";
    }
    let regex = new RegExp("(" + values.join("|") + ")", "g");
    return pattern.replace(regex, function (match) {
        return pad(current[match], match.length);
    });
}
