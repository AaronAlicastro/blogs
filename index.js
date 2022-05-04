var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var ejs = require("ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
    .connect(
        "mongodb+srv://Laiton785:LaitonMongo1@cluster0.vy8yi.mongodb.net/22_04Crud?retryWrites=true&w=majority"
    )
    .then(function (db) {
        console.log("Conectado con la base de datos");
    })
    .catch(function (err) {
        console.log(err);
    });


app.listen(3000);