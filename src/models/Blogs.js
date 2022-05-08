var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blog = new Schema ({
    titulo: String,
    url_imagen: String,
    descripcion : String,
    fecha: Date,
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