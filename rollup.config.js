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
    "input": "index.js",
    "output": Object.values({
        "defaultExport": {
            "file": "./dist/kofi.js",
            "format": "umd",
            "name": "kofi",
            "banner": banner.join("\n")
        },
        "minExport": {
            "file": "./dist/kofi.min.js",
            "format": "umd",
            "name": "kofi",
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

