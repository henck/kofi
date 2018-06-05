if (process.env.NODE_ENV === "production") {
    module.exports = require("./kofi-{{package}}.min.js");
} else {
    module.exports = require("./kofi-{{package}}.js");
}

