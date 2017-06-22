var PedidoSchema = require('../../db/custom/pedidosModel');
var UsuarioSchema = require('../../db/usuariosModel');
var mail = require('../../controllers/mail');

// ESTADOS: RECIBIDO , PROCESO , CANCELADO , ENVIADO , RESPUESTAS , TERMINADO

module.exports.get_pedido = function (req,callback) {

  try {

      PedidoSchema.findOne({token_user: req.token_user, estado : { $ne: "TERMINADO" } , delete: false},{'_id': 0,'__v': 0,'delete':0},function (err, doc) {

          if (err) {
              callback({is_ok : false , err : err});
          }else {
              callback({is_ok : true , data : doc});
          }
      });

  }catch (e){callback(null);};

};

module.exports.change_cancelado = function (req,callback) {

  try{

    var uuid = require('node-uuid');
    var token = uuid.v4();

    PedidoSchema.findOneAndUpdate({token:req.token},{estado:"CANCELADO"},function (err,obj) {
      if(err){
        callback({is_ok:false , err:"Pedido no encontrado"});
      }else{

        mail.pedidoCancelado(obj.email,obj.datos_pedidos.nombre,obj.datos_pedidos.apellido);
          callback({is_ok: true, obj:obj});
      }
    });

  }catch(e){
    callback({is_ok: false});
  }

};

module.exports.terminado = function (req,callback) {

  try{

    PedidoSchema.findOneAndUpdate({token:req.token},{estado:"TERMINADO"},function (err,obj) {
      if(err){
        callback({is_ok:false , err:"Pedido no encontrado"});
      }else{

        callback({is_ok: true , obj:obj});
      }

    });


  }catch(e){
    callback({is_ok: false});
  }

}

module.exports.pedido_respuesta = function (req,callback) {

    try{

      PedidoSchema.findOneAndUpdate({token:req.token},{estado:"RESPUESTAS"},function (err,obj) {
        if(err){
          callback({is_ok:false , err:"Pedido no encontrado"});
        }else{

          callback({is_ok: true , obj:obj});
        }

      });

    }catch(e){
      callback({is_ok: false});
    }
}

module.exports.pedido_enviado = function (req,callback) {

  try{

    PedidoSchema.findOneAndUpdate({token:req.token},{estado:"ENVIADO",fecha_estimada:req.fecha_estimada,link:req.link},function (err,obj) {
      if(err){
        callback({is_ok:false , err:"Pedido no encontrado"});
      }else{
        mail.pedidoEnviado(obj.email,obj.datos_pedidos.nombre,obj.datos_pedidos.apellido,obj.id_pedido,req.fecha_estimada,req.link);
        callback({is_ok: true , obj:obj});
      }

      /*  mail.pedidoAceptado(obj.email,obj.datos_pedidos.nombre,obj.datos_pedidos.apellido);
          callback({is_ok: true , obj:obj});
      } */
    });

  }catch(e){
    callback({is_ok: false});
  }

};


module.exports.pedido_aceptado = function (req,callback) {

  try{

    var uuid = require('node-uuid');
    var token = uuid.v4();

    PedidoSchema.findOneAndUpdate({token:req.token},{estado:"ACEPTADO",id_pedido:req.id_pedido},function (err,obj) {
      if(err){
        callback({is_ok:false , err:"Pedido no encontrado"});
      }else{

        mail.pedidoAceptado(obj.email,obj.datos_pedidos.nombre,obj.datos_pedidos.apellido,req.id_pedido);
          callback({is_ok: true , obj:obj});

      }
    });

  }catch(e){
    callback({is_ok: false});
  }

};

module.exports.new_pedido = function (req,callback) {

  try{

    var uuid = require('node-uuid');
    var token = uuid.v4();

      UsuarioSchema.findOne({token: req.token_user},function (err,obj) {

        if(err){
          callback({is_ok:false , err:"Usuario no encontrado"});
        }else{

          var ListaSchema = new PedidoSchema({token: token ,token_user: req.token_user,estado:"RECIBIDO",
            test: req.test  ,datos_pedidos : obj.user_data,fecha_estimada:"none", email: obj.email,push_token : obj.push_token,
            fecha: "30/12/16" ,id_despacho:"none",link:"none", fecha_creacion : new Date(),delete : false});

            ListaSchema.save(function (err) {
                if (err) {
                    callback({is_ok:false , err:err});
                }
                else {
                  mail.pedidoRecivido(obj.email,obj.user_data.nombre ,obj.user_data.apellido,obj.user_data.direccion,obj.user_data.comuna,obj.user_data.region,obj.user_data.telefono,"30/12/16",function() {

                  } );

                    callback({is_ok: true});
                }
            });
        }

      });

  }catch(e){
    callback({is_ok: false});
  }
};
