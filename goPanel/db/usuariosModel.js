var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UsuarioSchema   = new Schema({
    email: String,
    salt: String,
    activado: Boolean,
    pass: String,
    token: String,
    aux_token: String,
    push_token : String,
    user_data: Object,
    fecha_creacion :Date,
    fecha_last_login: Date,
    delete : Boolean
});

module.exports = mongoose.model('UsuarioSchema', UsuarioSchema);
