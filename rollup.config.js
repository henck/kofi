let uglify = require("rollup-plugin-uglify");
let pkg = require("./package.json");

//Generate the banner
let banner = [];
banner.push("/**");
banner.push(" * @license kofi v" + pkg.version);
banner.push(" *");
banner.push(" * This source code is licensed under the MIT license found in the");
banner.push(" * LICENSE file in the root directory of this source tree.");
banner.push(" */");
banner.push("");

//Initialize the configuration object
let config = {
    "input": "./index.js",
    "output": {
        "format": "umd",
        "name": "kofi",
        "banner": banner.join("\n")
    },
    "plugins": []
};

//Check for production build
let isMin = typeof process.env.MINIFY === "string" && process.env.MINIFY === "true";

if(isMin === true) {
    config.plugins = [uglify()];
    config.output.file = "./dist/kofi.min.js";
} else {
    config.output.file = "./dist/kofi.js";
}

export default config;

