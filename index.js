const express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname+"/src/views");
app.set("view engine", "ejs");

mongoose.connect(
    "mongodb+srv://Laiton785:LaitonMongo1@cluster0.vy8yi.mongodb.net/22_04Crud?retryWrites=true&w=majority"
).then(function (db) {
    console.log("Conectado con la base de datos");
}).catch(function (err) {
    console.log("Ha ocurrido un error");
});


app.get("/home",(req,res)=>{
    res.render('index', { saludo:"hola" } );
});


app.put("/editar/:id_editar", async (req, res) => {
    var id = req.params.id_editar;
    res.render('index');
});

app.get("/editar",(req,res)=>{
    res.render('editar');
})
app.listen(2000);