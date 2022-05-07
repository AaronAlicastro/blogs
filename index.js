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

const SkemaBlogs = require("./src/models/Blogs");

app.get("/blogs",(req,res)=>{
    res.render('blogs', { saludo:"hola" } );
});

app.get("/verMas",(req,res)=>{
    res.render('verMas', { } );
});
app.get("/home", async (req,res)=>{
    var datos_blogs = SkemaBlogs.find();
    
    res.render('blogs', {blogs : datos_blogs});

});

app.post('/editar', function(req,res){
    res.render('editar');

});

app.get('/crear', async function(req,res){
    res.render('crear', { objeto: "vacío"});
});

app.get("/editar/:id",(req,res)=>{
    res.render('editar');
});

app.listen(2000);