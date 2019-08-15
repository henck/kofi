let fs = require("fs");
let path = require("path");
let opt = require("get-args")().options;

//Check the package name and the wanted version
if (typeof opt.version === "string" && typeof opt.package === "string") {
    try {
        //Read the bundle file
        let bundlePath = path.join(process.cwd(), "packages", opt.package, "dist", opt.package + ".js");
        let bundleContent = fs.readFileSync(bundlePath, "utf8");
        if (bundleContent.substring(0, 100).indexOf(opt.version) !== -1) {
            //Version valid
            process.stdout.write("Package valid");
        } 
        else {
            //Package bundle not valid
            process.stdout.write("ERROR: bundle version does not matches with the provided version");
        }
    }
    catch (e) {
        //Error reading or parsing the bundle
        process.stdout.write("ERROR: can not read the bundle file");
    }
} 
else {
    //No package or version provided
    process.stdout.write("ERROR: no package name or version provided");
}

