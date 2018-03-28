import uglify from "rollup-plugin-uglify";

export default {
    "input": "./index.js",
    "output": {
        "file": "./dist/kofi.min.js",
        "format": "umd",
        "name": "kofi"
    },
    "plugins": [
        uglify() 
    ]
}
