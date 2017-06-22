var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MensajesSchema   = new Schema({
    token: String,
    titulo : String,
    sub_titulo: String,
    cuerpo : String,
    foto: String,
    fecha : String,
    fecha_creacion : Date,
    delete : Boolean
});

module.exports = mongoose.model('MensajesSchema', MensajesSchema);
