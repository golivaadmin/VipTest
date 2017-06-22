var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PedidoSchema   = new Schema({
    token: String,
    token_user: String,
    id_pedido: String,
    id_despacho: String, // correos de chile
    estado : String,
    test : Array,
    email: String,
    push_token: String,
    datos_pedidos: Object,
    fecha : String,
    fecha_estimada : String,
    link: String,
    fecha_creacion : Date,
    delete : Boolean
});

module.exports = mongoose.model('PedidoSchema', PedidoSchema);
