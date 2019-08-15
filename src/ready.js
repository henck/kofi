export function ready (fn) {
    if (document.readyState !== "loading") {
        return fn(null);
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        if (document.readyState === "loading") {
            return;
        }
        return fn(event);
    });
}

