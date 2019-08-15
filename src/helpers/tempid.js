/**
 * @function tempid
 * @description Generates a unique random string of 15 chracters.
 * @example 
 * tempid();
 * // -> "wv1ufiqj5e6xd3k"
 */

export default function tempid () {
    return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

