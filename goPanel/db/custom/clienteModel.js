
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ClienteSchema   = new Schema({
    token: String,
    token_grupo: String,
    nombre: String,
    apellidos: String,
    rut: String,
    direccion: String,
    region: String,
    comuna: String,
    mail: String,
    sexo: String,
    edad: String,
    telefono: String,

    /* Imagen Electrocardiograma */
    adjunto: String,
    campo_texto: String,
    diagnostico: String,

    /* Reporte Electrocardiograma */
    hr: String,
    pr: String,
    qrstime: String,
    qrsdegree: String,
    qt: String,
    qtc: String,
    p: String,
    t: String,
    rv5: String,
    sv1: String,
    rv5_sv1: String,
    status: String,
    fecha_creacion :Date,
    delete : Boolean
});

module.exports = mongoose.model('ClienteSchema', ClienteSchema);
