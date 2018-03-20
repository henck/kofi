/**
 * @function delay(time, fn)
 * @description This is just [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) but with the arguments reverted (first the delay `time` in ms, then the callback `fn` function).
 * @example
 * delay(1000, function () {
 *     console.log("Hello after 1 second!!");
 * });
 */

export default function delay (time, fn) {
    return setTimeout(fn, time);
}

