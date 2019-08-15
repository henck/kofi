import {terser} from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import {version} from "./package.json";

//Generate the banner
let banner = [];
banner.push("/*!*");
banner.push(" * @license kofi " + version);
banner.push(" *");
banner.push(" * This source code is licensed under the MIT license found in the");
banner.push(" * LICENSE file in the root directory of this source tree.");
banner.push(" */");
banner.push("");

//Initialize the configuration object
let config = {
    "input": "src/index.js",
    "output": Object.values({
        "umdExport": {
            "file": "./dist/kofi.umd.js",
            "format": "umd",
            "name": "kofi",
            "banner": banner.join("\n")
        },
        "umdMinExport": {
            "file": "./dist/kofi.umd.min.js",
            "format": "umd",
            "name": "kofi",
            "banner": banner.join("\n")
        },
        "cjsExport": {
            "file": "./dist/kofi.cjs.js",
            "format": "cjs",
            "banner": banner.join("\n")
        },
        "cjsMinExport": {
            "file": "./dist/kofi.cjs.min.js",
            "format": "cjs",
            "banner": banner.join("\n")
        },
        "esmExport": {
            "file": "./dist/kofi.esm.js",
            "format": "esm",
            "banner": banner.join("\n")
        },
        "esmMinExport": {
            "file": "./dist/kofi.esm.min.js",
            "format": "esm",
            "banner": banner.join("\n")
        }
    }),
    "plugins": [
        cleanup(),
        terser({
            "output": {
                "comments": "all"
            },
            "include": [/^.+\.min\.js$/]
        })
    ]
};

//Export the configuration object
export default config;

