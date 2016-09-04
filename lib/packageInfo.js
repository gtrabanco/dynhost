"use strict";


//A function to help with the reading of a package.json file
//Copied from other repo that is mine:
//  https://github.com/gtrabanco/packageInfo
exports.packageInfo = function (packageFile) {

    //First declare the return value var
    var packageInfo = false;

    //We need fs module
    var fs = require("fs");
    var path = require("path");

    //Check if we have access to the file
    var stats = fs.statSync(packageFile);

    //We need a file, if not just do nothing
    if (stats.isFile()) {
        try {
            fs.accessSync(packageFile, fs.F_OK | fs.R_OK);

            var contents = fs.readFileSync(packageFile, "utf8");

            packageInfo = JSON.parse(contents);

            //Just to make us sure we didn't process a different file and retrieve a secure trust information
            //about the package
            if(!packageInfo.name || !packageInfo.version) {
                packageInfo = false;
            }

        } catch (e) {
            packageInfo = false;
        }
    } else if(stats.isDir()) {
        //If it is dir, try if it is our lucky day and search if there is any package.json
        return readPackageInfo(path.join(packageFile, "package.json"));
    }

    return packageInfo;
};