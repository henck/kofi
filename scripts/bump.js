let path = require("path");
let fs = require("fs");
let opt = require("get-args")().options;

//Extract the bump type
let extractBump = function () {
    if (typeof opt.major === "boolean") {
        return 0;
    } else if (typeof opt.minor === "boolean") {
        return 1;
    } else if (typeof opt.patch === "boolean") {
        return 2;
    }
    return null;
};

//Get the package name and the bump type
let pkgName = opt.package;
let bumpType = extractBump();
if (typeof pkgName !== "string") {
    console.log("You must provide a valid package name with the option --package");
    process.exit(1);
}
if (bumpType === null) {
    console.log("You must provide the bump type (--major, --minor or --patch).");
    process.exit(1);
}

//Package source
let pkgPath = path.join(process.cwd(), "packages", pkgName, "package.json");
//Read the package 
try {
    let pkgContent = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    let pkgVersion = pkgContent.version.split(".");
    //Update the package version
    pkgVersion[bumpType] = (parseInt(pkgVersion[bumpType]) + 1).toString();
    //Save the  new version
    pkgContent.version = pkgVersion.join(".");
    fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 4), "utf8");
} catch (error) {
    //Error updating the package version
    console.log("Error updating the package version");
    console.log(error.message);
    process.exit(1);
}

