var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FormsSchema   = new Schema({
    token: String,
    token_user : String,
    titulo : String,
    form : Array,
    estado : Number,
    hasta : String,
    fecha_creacion : Date,
    delete : Boolean
});

module.exports = mongoose.model('FormsSchema', FormsSchema);
