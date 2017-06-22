var express = require('express');
var router = express.Router();

var mensajes_controller = require("../../controllers/custom/mensajesController");
var security = require("../../controllers/security/check_user");

router.post('/obtener', function(req, res, next) {

  security.check_user(req.body.token,res,function (user) {
    mensajes_controller.get_mensajes(
     {},function (data) {
         res.json(data);
     }
   );
  });

});

router.post('/nuevo', function(req, res, next) {


  mensajes_controller.new_mensaje(req.body,function (data) {
        res.json(data);
  });

});


module.exports = router;
