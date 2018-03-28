import cleanup from "rollup-plugin-cleanup";

export default {
    "input": "./index.js",
    "output": {
        "file": "./dist/kofi.js",
        "format": "umd",
        "name": "kofi"
    },
    "plugins": [
        cleanup()
    ]
}
