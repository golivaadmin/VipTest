var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TestSchema   = new Schema({
    token: String,
    puntos: Number,
    titulo : String,
    sub_titulo: String,
    cuerpo : String,
    stock : Number,
    hasta : String,
    foto_resumen: String,
    foto_detalle: String,
    fecha_creacion :Date,
    delete : Boolean
});

module.exports = mongoose.model('TestSchema', TestSchema);
