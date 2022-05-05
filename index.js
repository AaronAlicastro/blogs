const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname+"/src/views");
app.set("view engine", "ejs");

app.get("/home",(req,res)=>{
    res.render('index', { saludo:"hola" } );
});

app.listen(2000);