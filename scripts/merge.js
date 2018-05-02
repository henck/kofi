let fs = require("fs");
let path = require("path");

//Read a file and split by lines
let splitFile = function (filePath) {
    return fs.readFileSync(filePath, "utf8").split("\n").filter(function (line) {
        return line.trim() !== "";
    });
};

//Import packages list 
let pkgs = splitFile("./pkgs.txt");
//Output merge
let merge = [];
//Add a warning message
merge.push("/**");
merge.push(" * WARNING - THIS IS AN AUTO-GENERATED FILE. DO NOT EDIT IT DIRECTLY");
merge.push(" */");
merge.push("");
//Process all packages
pkgs.forEach(function (pkg) {
    //Read the index entry file and parse each line
    merge.push("//Export modules from " + pkg + "");
    splitFile(path.join("./packages", pkg, "index.js")).forEach(function (line) {
        line = line.trim();
        let items = line.split(" ");
        let lastIndex = items.length - 1;
        //Update the path to this file
        items[lastIndex] = "\"" + path.join("../" + pkg, items[lastIndex].slice(1, -2)) + "\";";
        //Save to the merged list
        merge.push(items.join(" "));
    });
    //Add an empty line
    merge.push("");
});
//Save to the output file
fs.writeFileSync("./packages/kofi/index.js", merge.join("\n"), "utf8");

