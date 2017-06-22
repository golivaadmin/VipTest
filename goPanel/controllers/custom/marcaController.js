var MarcaSchema = require('../../db/custom/marcasModel');

module.exports.get_marca = function (req,callback) {

  try {

      MarcaSchema.find({delete:false},{'_id': 0,'__v': 0,'delete':0},function (err, doc) {

          if (err) {
              callback({is_ok : false , err : err});
          }else {
              callback({is_ok : true , data : doc});
          }
      });

  }catch (e){callback(null);};

};

module.exports.new_marca = function (req,callback) {

try{

  var uuid = require('node-uuid');
  var token = uuid.v4();

  var path = global.incial_path +  "/public/img";

  var foto_resumen = uuid.v4() + ".jpg";
  var foto_detalle = uuid.v4() + ".jpg";

  var image1 = path + "/" + foto_resumen;
  var image2 = path + "/" + foto_detalle;

  var error_storage = false;

  require("fs").writeFile(image1, req.foto_resumen, 'base64' , function(err) {
    if(err){ error_storage = true; console.log(err);}
    require("fs").writeFile(image2, req.foto_detalle, 'base64', function(err) {
        if(err){ error_storage = true; }

        if(error_storage){ callback({is_ok:false , err:"Error almacenamiento de la fotografia."}); }
        else{

        var ListaSchema = new MarcaSchema({token: token ,titulo:req.titulo,sub_titulo:req.sub_titulo,
          cuerpo: req.cuerpo  , foto_resumen : foto_resumen ,
          foto_detalle: foto_detalle , fecha_creacion : new Date(),delete : false});

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

  });

}catch(e){
    callback({is_ok:false});
}


};
