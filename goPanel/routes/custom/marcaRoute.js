var express = require('express');
var router = express.Router();

var marca_controller = require("../../controllers/custom/marcaController");
var security = require("../../controllers/security/check_user");

router.post('/obtener', function(req, res, next) {

  security.check_user(req.body.token,res,function (user) {
    marca_controller.get_marca(
     {},function (data) {
         res.json(data);
     }
   );
  });

});

router.post('/nuevo', function(req, res, next) {


  marca_controller.new_marca(req.body,function (data) {
        res.json(data);
  });

});


module.exports = router;
