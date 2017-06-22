var MensajeSchema = require('../../db/custom/mensajesModel');

module.exports.get_mensajes = function (req,callback) {

  try {

      MensajeSchema.find({delete:false},{'_id': 0,'__v': 0,'delete':0},function (err, doc) {

          if (err) {
              callback({is_ok : false , err : err});
          }else {
              callback({is_ok : true , data : doc});
          }
      });

  }catch (e){callback(null);};

};

module.exports.new_mensaje = function (req,callback) {

  try{

    var uuid = require('node-uuid');
    var token = uuid.v4();

    var path = global.incial_path +  "/public/img";

    var foto = uuid.v4() + ".jpg";

    var image = path + "/" + foto;

    require("fs").writeFile(image, req.foto, 'base64', function(err) {
      if(err){  callback({is_ok:false , err:"Error almacenamiento de la fotografia."});}
      else{

        var ListaSchema = new MensajeSchema({token: token ,titulo:req.titulo,sub_titulo:req.sub_titulo,
          cuerpo: req.cuerpo  , foto : foto ,
          fecha_creacion : new Date(),fecha:"29/12/16",delete : false});

          ListaSchema.save(function (err) {
              if (err) {
                  callback({is_ok:false , err:err});
              }
              else {
                  callback({is_ok: true});
              }
          });

      }
    });

  }catch (e){callback(null);};

};
