if (process.env.NODE_ENV === "production") {
      module.exports = require("./{{package}}.min.js");
} else {
      module.exports = require("./{{package}}.js");
}

