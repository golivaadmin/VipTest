
var UsuarioSchema = require('../../db/usuariosModel');
var mail = require("../../controllers/mail");

var jwt = require('jwt-simple');
var secret = global.secret_diggest;
var uuid = require('node-uuid');
var sha1 = require('sha1');

var activacion_new_pass = true; // en el caso que la activación genere una nueva contraseña

module.exports.pide_recupera = function (req,callback) {

    try {

        var uuid_aux_token = uuid.v4();

        UsuarioSchema.findOneAndUpdate({email: req.email},{aux_token:uuid_aux_token},function (err,obj) {


            if (err) {
                callback({is_ok:false , err:err});
            }

            if(obj) {

                if(obj.activado) {

                  var nombre_apellido = obj.user_data.nombre + " " + obj.user_data.apellido;

                    mail.recuperaPass(req.email,nombre_apellido, uuid_aux_token, function (data) {

                    });

                    callback({is_ok: true, msg: "E-mail de recuperación enviado"});
                }
                else {
                    callback({is_ok: false, msg: "Primero necesita estar activado"});
                }


            }
            else {
                callback({is_ok: false, msg: "El usuario no se a podido recuperar su contraseña en estos momentos, favor verifique que el mail usado fue con el que creo la cuenta."});
            }



        });


    }catch (e){callback(null);};

};

module.exports.recupera = function (req,callback) {

    var salt = uuid.v4();

    var auxuid = uuid.v4();

    var pass = sha1(req.pass + salt);

    UsuarioSchema.findOneAndUpdate({aux_token: req.aux_token},{aux_token:auxuid,salt:salt,pass:pass},function (err,obj) {

        if (err) {
            callback({is_ok:false , err:err});
        }

        if(obj) {

            if(obj.activado) {

                callback({is_ok: true, msg: "Contraseña cambiada exitosamente"});
            }
            else {
                callback({is_ok: false, msg: "Primero necesita estar activado"});
            }


        }
        else {
            callback({is_ok: false, msg: "E-mail del usuario no valido"});
        }



    });

};

module.exports.login = function (req,callback) {

    try {

        UsuarioSchema.findOne({email: req.email},function (err,obj) {


            if (err) {
                callback({is_ok:false , err:err});
            }

            else if(obj) {

                if(obj.activado) {

                    var pass_test = sha1(req.pass + obj.salt);
                    var pass = obj.pass;

                    if (pass_test == pass) {

                        var payload = {
                            token: obj.token,
                            type: "user"
                        };

                        var tokenJson = jwt.encode(payload, secret);

                        callback({is_ok: true, user: {test:true}, token: tokenJson});


                    } else {
                        callback({is_ok: false, msg: "Contraseña o usuario invalido"});
                    }

                }else {
                    callback({is_ok: false, msg: "Primero necesita estar activado"});
                }

            }else{
                    callback({is_ok: false, msg: "Contraseña o usuario invalido"});
            }

        });



    }catch (e){callback(null);};

};

module.exports.pide_activa= function (req,callback) { // cuando el usuario pide un nuevo mail de activación

    try{
        var uuid_aux_token = uuid.v4();

        UsuarioSchema.findOneAndUpdate({email: req.email},{aux_token: uuid_aux_token},function (err,obj) {

            if (err) {
                callback({is_ok:false , err:err});
            }

            if(obj){

                if(obj.activado){

                    callback({is_ok: false, msg: "No se a podido enviar un mail de activación, ya que el usario ya tiene su cuenta activada."});

                }else{


                    mail.activarUser(req.email,uuid_aux_token,function (data) {
                        // no esperamos al envio del mail para dar la respuesta
                    });

                    callback({is_ok: true , msg:"Se se ha reenviado un E-mail con un link para que pueda activarse."});
                }



            }else{
                callback({is_ok: false, msg: "No se a podido enviar un mail de activación, favor verifique que el mail usado fue con el que creo la cuenta."});
            }


        });

    }catch (e){
        callback(null);
    }

};

module.exports.activa = function (req,callback) {

    try {

        var salt = uuid.v4();

        var pass = sha1(req.pass + salt);

        var auxuid = uuid.v4();

        UsuarioSchema.findOneAndUpdate({aux_token: req.aux_token},{aux_token: auxuid,salt:salt,pass:pass,activado:true},function (err,obj) {

            if (err) {
                callback({is_ok:false , err:err});
            }

            if(obj) {

                callback({is_ok:true , msg:"Usuario activado satisfactoriamente"});

            }else{
                callback({is_ok: false, msg: "El usuario no se a podido activar en estos momentos, favor verifique que abrio el ultimo mail enviado, ya que el sistema elimina peticiones antiguas."});
            }

        });



    }catch (e){callback(null);};

};

module.exports.new_user = function (req,callback) {

    try {

        UsuarioSchema.findOne({email: req.email},function (err,obj) {

            if (err) {
                callback({is_ok: false, err: err});
            }

            if(obj){

                callback({is_ok: false, msg: "Ya existe un usuario con el E-mail ingresado"});

            }else{

                var salt = uuid.v4();
                var token = uuid.v4();

                var uuid_aux_token = uuid.v4();

                var pass = sha1(req.pass + salt);

                var date = new Date();

                var user_data = req.user_data;

                var nombre_apellido = req.user_data.nombre + " " + req.user_data.apellido;

                var User = new UsuarioSchema({
                    email: req.email,
                    salt: salt,
                    activado: true,
                    pass: pass,
                    token:token,
                    aux_token:uuid_aux_token,
                    push_token : "none",
                    user_data:user_data,
                    fecha_creacion:date,
                    fecha_last_login:date,
                    delete: false
                });

                var payload = {
                    token: token,
                    type: "user"
                };

                var tokenJson = jwt.encode(payload, secret);


                User.save(function (err) {
                    if (err) {
                        callback({is_ok:false , err:err});
                    }
                    else {
                        mail.activarUser(req.email,nombre_apellido,uuid_aux_token,function (data) {


                        });

                        callback({is_ok: true, token:tokenJson});
                    }
                });

            }

        });

    }catch (e){callback(null);};

};
