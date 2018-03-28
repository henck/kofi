import cleanup from "rollup-plugin-cleanup";
import uglify from "rollup-plugin-uglify";

let config = {"input": "./index.js"};
let isMin = typeof process.env.MINIFY === "string" && process.env.MINIFY === "true";

if(isMin === true) {
    config.plugins = [uglify()];
    config.output = {
        "file": "./dist/kofi.min.js",
        "format": "umd",
        "name": "kofi"
    };
} else {
    config.plugins = [cleanup()];
    config.output = {
        "file": "./dist/kofi.js",
        "format": "umd",
        "name": "kofi"
    };
}

export default config;

