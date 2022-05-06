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

app.get("/blogs",(req,res)=>{
    res.render('blogs', { saludo:"hola" } );
});

app.get("/verMas",(req,res)=>{
    res.render('verMas', { } );
});
app.get("/home",(req,res)=>{
    res.render('home', { saludo:"hola" } );
});

app.get('/editar', async function(req,res){
    res.render('editar', { objeto: "vacío"});

});

app.get('/crear', async function(req,res){
    res.render('crear', { objeto: "vacío"});
});

app.listen(2000);