var express = require('express');
var router = express.Router();

var security = require("../../controllers/security/check_user");
var login_controllers = require("../../controllers/go_panel/loginController");


router.post('/nuevo', function(req, res, next) {

  login_controllers.new_user (req.body,function (data) {
        res.json(data);
  })

});

router.post('/login', function(req, res, next) {

  login_controllers.login ({email: req.body.email,pass: req.body.pass},function (data) {
        res.json(data);
  })

});

router.post('/recuperar/pide', function(req, res, next) {

  login_controllers.pide_recupera ({email: req.body.email},function (data) {
        res.json(data);
  })

});

module.exports = router;
