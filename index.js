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

app.get("/blogs/:isFiltro", async (req, res) => {
    let filtro = req.params.isFiltro + "";
    let blog_data = await SkemaBlogs.find({
        $or: [
            { titulo: { $regex: filtro } },
            { descripcion: { $regex: filtro } },
            { url_imagen: filtro },
            {fecha: {$in: parseInt(filtro)}},
            {fecha: {$in: obterPosibleFecha(filtro)}}
        ]
    });
    res.render('blogs', { blogs: blog_data });
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
app.post("/aumentarLike/:id", async (req, res) => {
    let blog_data = await SkemaBlogs.findById(req.params.id);
    blog_data.commentBlog.cantidadLikes += 1;
    await blog_data.save();
    res.end("lesto");
});

app.get('/crear', async function (req, res) {
    res.render('crear', {});
});

app.post('/guardar', async function (req, res) {
    let blog = req.body; blog.fecha = [];
    let fecha = new Date();
    blog.fecha.push(fecha.getDate());
    blog.fecha.push(fecha.getMonth() + 1);
    blog.fecha.push(fecha.getYear() + 1900);
    let doc = new SkemaBlogs(blog);
    await doc.save();
    res.end("Se ha creado el blog correctamente");
});

app.get("/editar/:id", async (req, res) => {
    let datosEditar = await SkemaBlogs.findById(req.params.id);
    res.render('editar', { blogs: datosEditar });
});
app.post("/guardarEdicion/:id", async (req, res) => {
    let datosEditar = await SkemaBlogs.findById(req.params.id);
    datosEditar.titulo = req.body.inpTitulo;
    datosEditar.url_imagen = req.body.inpUrl;
    datosEditar.descripcion = req.body.contenido;
    await datosEditar.save();
    res.end("/blogs");
});
function obterPosibleFecha(fecha) {
    fecha = fecha.toLowerCase();
    if("mes enero" == fecha || "enero" == fecha) return 1;
    else if("mes febrero" == fecha || "febrero" == fecha) return 2;
    else if("mes marzo" == fecha || "marzo" == fecha) return 3;
    else if("mes abril" == fecha || "abril" == fecha) return 4;
    else if("mes mayo" == fecha || "mayo" == fecha) return 5;
    else if("mes junio" == fecha || "junio" == fecha) return 6;
    else if("mes julio" == fecha || "julio" == fecha) return 7;
    else if("mes agosto" == fecha || "agosto" == fecha) return 8;
    else if("mes septiembre" == fecha || "septiembre" == fecha) return 9;
    else if("mes octubre" == fecha || "octubre" == fecha) return 10;
    else if("mes noviembre" == fecha || "noviembre" == fecha) return 11;
    else if("mes diciembre" == fecha || "diciembre" == fecha) return 12;
    else return -1;
}

app.listen(2000);