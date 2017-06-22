var TestSchema = require('../../db/custom/testModel');

/* CUSTOM CONTROLLERS*/

// CUSTOM / obtenemos los test
module.exports.get_test = function (req,callback) {

    try {

        TestSchema.find({delete:false},{'_id': 0,'__v': 0},function (err, doc) {

            if (err) {
                callback({is_ok : false , err : err});
            }else {
                callback({is_ok : true , data : doc});
            }
        });

    }catch (e){callback(null);};


};

/* ADMIN CONTROLLERS*/

// ADMIN / nuevo  test
module.exports.new_test = function (req,callback) {

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

            var Lista = new TestSchema({token: token , puntos:req.puntos,titulo:req.titulo,sub_titulo:req.sub_titulo,
              cuerpo: req.cuerpo , stock: req.stock , hasta: req.hasta , foto_resumen : foto_resumen ,
              foto_detalle: foto_detalle , fecha_creacion : new Date(),delete : false});

            Lista.save(function (err) {
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

    }catch (e){
      callback({is_ok:false});
    }

};

// ADMIN / borra el test
module.exports.delete= function (req , callback) {

    try{

        TestSchema.findOneAndUpdate({_id:req._id},{delete:true},function (err,doc) {
            if (err) {
                callback({is_ok:false , err:err});
            }
            else {
                console.log(doc);
                callback({is_ok: true});
            }
        });


    }catch(e){callback(null);}

};

module.exports.update_lista = function (req,callback) {

    try{

        TestSchema.findOneAndUpdate({_id:req._id},req,function (err,doc) {
            if (err) {
                callback({is_ok:false , err:err});
            }
            else {
                console.log(doc);
                callback({is_ok: true});
            }
        });


    }catch (e){callback(null);}

};
