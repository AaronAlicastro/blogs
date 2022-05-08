const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", __dirname + "/src/views");
app.set("view engine", "ejs");

mongoose.connect(
    "mongodb+srv://Laiton785:LaitonMongo1@cluster0.vy8yi.mongodb.net/Blogs_Data?retryWrites=true&w=majority"
).then(function (db) {
    console.log("Conectado con la base de datos");
}).catch(function (err) {
    console.log("Ha ocurrido un error");
});

const SkemaBlogs = require("./src/models/Blogs");

app.get("/blogs", async (req, res) => {
    let datos_blogs = await SkemaBlogs.find();
    res.render('blogs', { blogs: datos_blogs });
});

app.get("/verMas/:id", async (req, res) => {
    let blog_data = await SkemaBlogs.findById(req.params.id);
    res.render('verMas', { blogs: blog_data });
});
app.post("/anadirComentario/:id", async (req, res) => {
    let blog_data = await SkemaBlogs.findById(req.params.id);
    blog_data.commentBlog.comments.push({
        userName: req.body.nameUsuario,
        comentario: req.body.comentario
    })
    await blog_data.save();
    res.redirect("/verMas/" + req.params.id);
});
app.post("/aumentarLike/:id", async (req,res)=>{
    let blog_data = await SkemaBlogs.findById(req.params.id);
    blog_data.commentBlog.cantidadLikes += 1;
    await blog_data.save();
    res.end("lesto");
});

app.get('/crear', async function (req, res) {
    res.render('crear', {});
});

app.post('/guardar', async function (req, res) {
    let blog = req.body;
    blog.fecha = new Date();
    let doc = new SkemaBlogs(blog);
    await doc.save();
<<<<<<< HEAD
    res.end("Se ha creado el blog correctamente");
});

app.get("/editar/:id",async (req,res)=>{
    let datosEditar = await SkemaBlogs.findById(req.params.id);
    res.render('editar', { blogs: datosEditar });
});
app.post("/guardarEdicion/:id", async (req,res)=>{
    let datosEditar = await SkemaBlogs.findById(req.params.id);
    datosEditar.titulo = req.body.inpTitulo;
    datosEditar.url_imagen = req.body.inpUrl;
    datosEditar.descripcion = req.body.contenido;
    await datosEditar.save();
    res.end("/blogs");
=======
    res.send("blogs");
});

app.get("/editar/:id", async (req, res) => {
    res.render('editar');
    var id = req.params.id;
    
>>>>>>> 4d4ea3203eebc108196a78c2504e9da3f4f41cec
});

app.put('/editar', (req,res)=>{
    var editados = req.body;
//var datosEditar = await SkemaBlogs.find(id);
    console.log(editados)

    // datosEditar.titulo = req.body.titulo;
    // datosEditar.url_imagen = req.body.url_imagen;
    // datosEditar.descripcion = req.body.descripcion;
    // var editados = new SkemaBlogs(datosEditar)
    // await editados.save();
    // console.log(editados)
})
app.listen(2000);