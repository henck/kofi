/**
 * @function timer(time, fn)
 * @description This is just [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) but with the arguments reverted (first the delay `time` in ms and then the callback `fn` function).
 * @example 
 * let counter = 0;
 * timer(1000, function () {
 *     counter = counter + 1;
 *     console.log(counter);
 * });
 */

export default function timer (time, fn) {
    return setInterval(fn, time);
}

