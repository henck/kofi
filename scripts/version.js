let fs = require("fs");
let path = require("path");

let pkgPath = path.join(process.cwd(), "package.json");
//Read the package content
let pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
//Print the package version
process.stdout.write(pkg.version);

