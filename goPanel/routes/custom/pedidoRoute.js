var express = require('express');
var router = express.Router();

var pedido_controller = require("../../controllers/custom/pedidosController");
var security = require("../../controllers/security/check_user");

router.post('/obtener', function(req, res, next) {

  security.check_user(req.body.token,res,function (user) {
    pedido_controller.get_pedido(
     {token_user: user.token},function (data) {
         res.json(data);
     }
   );
  });

});

router.post('/cancelado', function(req, res, next) {


    pedido_controller.change_cancelado(
     req.body,function (data) {
         res.json(data);
     }
   );

});

router.post('/terminado', function(req, res, next) {


    pedido_controller.pedido_respuesta(
     req.body,function (data) {
         res.json(data);
     }
   );

});

router.post('/respuesta', function(req, res, next) {


    pedido_controller.pedido_respuesta(
     req.body,function (data) {
         res.json(data);
     }
   );

});

router.post('/enviado', function(req, res, next) {


    pedido_controller.pedido_enviado(
     req.body,function (data) {
         res.json(data);
     }
   );

});

router.post('/aceptado', function(req, res, next) {


    pedido_controller.pedido_aceptado(
     req.body,function (data) {
         res.json(data);
     }
   );

});

router.post('/nuevo', function(req, res, next) {

  security.check_user(req.body.token,res,function (user) {
    req.body.token_user = user.token;
  pedido_controller.new_pedido(req.body,function (data) {
        res.json(data);
  });
});

});


module.exports = router;
