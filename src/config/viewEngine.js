import express from "express";
let app = express();
let path = require('path');
let configViewEngine = () => {

    app.use(express.static("./src/public"));
    // app.use('*/public', express.static('/.src/public'))
    app.set("view engine", "ejs");

    app.set("views", './src/views');

}

module.exports = configViewEngine;