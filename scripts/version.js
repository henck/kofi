let fs = require("fs");
let path = require("path");
let args = require("get-args")();

//Check if the package argument is provided
if (typeof args.options.package === "string") {
    try {
        let pkg = args.options.package;
        let pkgPath = path.join(process.cwd(), "packages", pkg, "package.json");
        //Read the package content
        let pkgContent = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        //Print the package version
        process.stdout.write(pkgContent.version);
    } catch (e) {
        //Error reading the package.json file
        process.stdout.write("Invalid package \n");
        process.exit(1);
    }
}
else {
    //No package provided, display error
    process.stdout.write("No package name provided \n");
    process.exit(1);
}

