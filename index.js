const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/src/archivos"));
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
const { redirect } = require("express/lib/response");

app.get("/blogs", async (req, res) => {
    let datos_blogs = await SkemaBlogs.find();
    res.render('blogs', { blogs: datos_blogs });
});

app.post("/filtrar", async (req,res)=>{
    //console.log(req.body)
});
app.post("/buscar", async (req,res)=>{
    let filtro = req.body.busqueda + "";
    let blog_data = await SkemaBlogs.findOne({
        $or: [
            { titulo: { $regex: filtro } },
            { descripcion: { $regex: filtro } },
            { categoria: { $regex: filtro } },
            { url_imagen: filtro }
        ]
    });
    res.render('verMas', { blogs: blog_data });
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
    res.end("listo");
});

app.get('/crear', async function (req, res) {
    res.render('crear', { message:{
            send: false,
        }
    });
});
app.post('/guardar', async function (req, res) {
    let blog = req.body; blog.fecha = [];
    let fecha = new Date();
    blog.fecha.push(fecha.getDate());
    blog.fecha.push(fecha.getMonth() + 1);
    blog.fecha.push(fecha.getYear() + 1900);
    let doc = new SkemaBlogs(blog);
    await doc.save();
    res.render("crear",{ message:{
            send: true,
            value: "Se ha creado el blog correctamente"
        }
    });
});

app.get("/editar/:id", async (req, res) => {
    let datosEditar = await SkemaBlogs.findById(req.params.id);
    res.render('editar', { blogs: datosEditar });
});

app.post("/guardarEdicion/:id", async (req, res) => {
    let datosEditar = await SkemaBlogs.findById(req.params.id);
    datosEditar.autor = req.body.autor;
    datosEditar.categoria = req.body.categoria;
    datosEditar.titulo = req.body.titulo;
    datosEditar.url_imagen = req.body.url_imagen;
    datosEditar.descripcion = req.body.descripcion;
    let fecha = new Date();
    datosEditar.fecha[0] = fecha.getDate();
    datosEditar.fecha[1] = (fecha.getMonth() + 1);
    datosEditar.fecha[2] = (fecha.getYear() + 1900);
    await datosEditar.save();
    res.redirect("/blogs");
});
app.get("/eliminar/:id", async (req,res)=>{
    let blog = await SkemaBlogs.findById(req.params.id);
    await blog.remove();
    res.redirect("/blogs");
});

function realizarFiltro(fecha) {
    
}

app.listen(2000);