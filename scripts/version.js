let fs = require("fs");
let path = require("path");
let args = require("get-args")();

//Check if the package argument is provided
if (typeof args.options.package === "string") {
    try {
        //Package path
        let pkgPath = path.join(process.cwd(), "packages", args.options.package, "package.json");
        //Read the package content
        let pkgContent = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        //Print the package version
        process.stdout.write("v" + pkgContent.version);
    } catch (e) {
        //Error reading the package.json file
        process.stdout.write("Invalid package");
    }
}
else {
    //No package provided, display error
    process.stdout.write("No package name provided");
}

