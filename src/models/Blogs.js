var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blog = new Schema ({
    autor: String,
    categoria: String,
    titulo: String,
    url_imagen: String,
    descripcion : String,
    fecha: [
        //dia: Number,
        //mes: Number,
        //ano: Number
    ],
    commentBlog: {
        comments: [
            /*
            userName {},
            comentario {},
            */
        ],
        cantidadLikes: {
            type: Number,
            default: 0
        }
    }
});

module.exports = mongoose.model("Blogs", blog);