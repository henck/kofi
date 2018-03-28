import cleanup from "rollup-plugin-cleanup";
import uglify from "rollup-plugin-uglify";

let isMin = process.wnv.MINIFY === "true";
let plugins = (isMin === true) ? [uglify()] : [cleanup()];

export default {
    "input": "./index.js",
    "output": {
        "file": "./dist/kofi.js",
        "format": "umd",
        "name": "kofi"
    },
    "plugins": plugins
};

