/**
 * @function uniqueId
 * @description Generates a unique random string of 15 chracters.
 * @example 
 * uniqueId();
 * // -> "wv1ufiqj5e6xd3k"
 */

export default function uniqueId () {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

