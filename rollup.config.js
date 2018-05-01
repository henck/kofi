let uglify = require("rollup-plugin-uglify");
let path = require("path");

//Module to build
let kofiPkg = process.env.PKG;
//Import package information 
let pkg = require("./" + path.join("packages", kofiPkg, "package.json"));

//Generate the banner
let banner = [];
banner.push("/**");
banner.push(" * @license " + kofiPkg + " " + pkg.version);
banner.push(" *");
banner.push(" * This source code is licensed under the MIT license found in the");
banner.push(" * LICENSE file in the root directory of this source tree.");
banner.push(" */");
banner.push("");

//Initialize the configuration object
let config = {
    "input": path.join("packages", kofiPkg, "index.js"),
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
    config.plugins = [uglify({
        "output": {
            "preamble": banner.join("\n")
        }
    })];
    config.output.file = path.join("packages", kofiPkg, ".bundle", kofiPkg + ".min.js");
} else {
    config.output.file = path.join("packages", kofiPkg, ".bundle", kofiPkg + ".js");
}

//Export the configuration object
export default config;

