const webpack = require("webpack");
const path = require("path");

var buildFolder = path.resolve(__dirname, "build");
var jsFolder = path.resolve(__dirname, "js");

var config = {
    entry:{
        "login":jsFolder + "/login.js",
        "main":jsFolder + "/main.js"
    },
    output:{
        filename:"[name]bundle.js",
        path:buildFolder
    },
    plugins:[
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery"
        })
    ]
};

module.exports = config;