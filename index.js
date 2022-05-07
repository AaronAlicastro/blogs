const express = require("express");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname+"/src/views");
app.set("view engine", "ejs");

mongoose.connect(
    "mongodb+srv://Laiton785:LaitonMongo1@cluster0.vy8yi.mongodb.net/Blogs_Data?retryWrites=true&w=majority"
).then(function (db) {
    console.log("Conectado con la base de datos");
}).catch(function (err) {
    console.log("Ha ocurrido un error");
});

const SkemaBlogs = require("./src/models/Blogs");

app.get("/blogs", async (req,res)=>{
    let datos_blogs = await SkemaBlogs.find();
    res.render('blogs', {blogs: datos_blogs});
});

app.get("/verMas/:id", async (req,res)=>{
    let blog_data = await SkemaBlogs.findById(req.params.id);
    res.render('verMas', { blogs: blog_data } );
});
app.post("/anadirComentario/:id", async (req,res)=>{
    let blog_data = await SkemaBlogs.findById(req.params.id);
    blog_data.commentBlog.comments.push({
        userName: req.body.nameUsuario,
        comentario: req.body.comentario
    })
    await blog_data.save();
    res.redirect("/verMas/"+req.params.id);
});

app.post('/editar', function(req,res){
    res.render('editar');

});

app.get('/crear', async function(req,res){
    res.render('crear', {});
});

app.post('/guardar', async function(req,res){
    let blog = req.body;
    blog.fecha = new Date();
    var doc = new SkemaBlogs(blog);
    await doc.save();
    res.send("lesto");
});

app.get("/editar/:id",(req,res)=>{
    res.render('editar');
});

app.listen(2000);