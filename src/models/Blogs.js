var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blog = new Schema ({
    titulo: String,
    url_imagen: String,
    descripcion : String
});

module.exports = mongoose.model("Blogs", blog);