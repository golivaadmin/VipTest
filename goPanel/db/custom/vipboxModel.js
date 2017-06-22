var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VipBoxSchema   = new Schema({
    token: String,
    test : Array,
    puntos : Number,
    estado : Number,
    fecha_creacion : Date,
    delete : Boolean
});

module.exports = mongoose.model('VipBoxSchema', VipBoxSchema);
