var express = require('express');
var router = express.Router();

/* SEGURIDAD */
var jwt = require('jwt-simple');
var secret = '61b94161-c9c7-475f-b7f2-62fa58fef871';

/* LLAMADOS EXTERNOS */

var login = require('../ws/login');


/* LOGIN DE USUARIO */
router.post('/login', function(req, res, next) {
   var request = { email: req.body.email, pass : req.body.pass };
    login.login(request,function (data) {
       res.json(data);
    });
});

router.post('/registro', function(req, res, next) {
    var request = { email: req.body.email, pass : req.body.pass, user_data: req.body.user_data };
    login.new_user(request,function (data) {
        res.json(data);
    });
});

router.post('/login/activa', function(req, res, next) {
    var request = { aux_token: req.body.aux_token , pass : req.body.pass };
    login.activa(request,function (data) {
        res.json(data);
    });
});

router.post('/activa/pide', function(req, res, next) {
    var request = { email: req.body.email };
    login.pide_activa(request,function (data) {
        res.json(data);
    });
});

router.post('/recupera/pide', function(req, res, next) {
    var request = { email: req.body.email };
    login.pide_recupera(request,function (data) {
        res.json(data);
    })
});

router.post('/recupera/pass', function(req, res, next) {
    var request = { aux_token: req.body.aux_token, pass : req.body.pass };
    login.recupera(request,function (data) {
        res.json(data);
    })
});


/* LISTAS */
router.get('/', function(req, res, next) {
        res.json({version : "1.0",developer:"gsw"});
});

router.post('/listas', function(req, res, next) {

        try{
          var listas = require('../ws/listas');
        listas.get_listas_maestras(function (data) {
          res.json(data);
        });
      }catch(e){ console.log(e); }


});



module.exports = router;
