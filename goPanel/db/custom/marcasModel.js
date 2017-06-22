var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MarcaSchema   = new Schema({
    token: String,
    titulo : String,
    sub_titulo: String,
    cuerpo : String,
    foto_resumen: String,
    foto_detalle: String,
    fecha_creacion :Date,
    delete : Boolean
});

module.exports = mongoose.model('MarcaSchema', MarcaSchema);
