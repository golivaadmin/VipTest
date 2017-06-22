var express = require('express');
var router = express.Router();

var EmpresaSchema = require('../../db/custom/empresaModel');
/* SEGURIDAD */
var jwt = require('jwt-simple');
var secret = '61b94161-c9c7-475f-b7f2-62fa58fef871';


// data standart de go_panel
router.post('/data', function(req, res, next) {

    var panel_preferences = {
        can_edit : true,
        can_block : false,
        can_delete : true,
        can_excel : true,
        can_link : true,
        create : {can_create: true , text : "Nueva Empresa" , link:"listas/editacrea/empresa/crea/a/custom"}
    };

    var tabla  = { content: [
        {nombre: "E-mail" , key : "mail" , Type : 'String'},
        {nombre: "Rut" , key : "rut" , Type : 'String'},
        {nombre: "Razon Social" , key : "razonSocial_nombre" , Type : 'String'},
        {nombre: "Dirección" , key : "direccion" , Type : 'String'},
        {nombre: "Región" , key : "region" , Type : 'String'},
        {nombre:"Comuna",key: "comuna" ,Type : 'String'},
        {nombre:"Nombre",key: "nombre" ,Type : 'String'},
        {nombre:"Apellidos",key: "apellidos" ,Type : 'String'},
        {nombre:"Telefono",key: "telefono" ,Type : 'String'},
        {nombre:"Fecha creación",key: "fecha_creacion" ,Type : 'Date'},
        {nombre:"Grupos",key: "grupos" ,Type : 'Link' , link:'listas/grupo'},
        ]};

        EmpresaSchema.find({delete : false}, function (err, docs) {

          tabla.data = docs;

          var listas = {
              is_ok: true,
              panel_preferences :panel_preferences,
              tabla_name:'Empresas',
              tabla_sub_name:'',
              numero_data: (tabla.data.length + ' listas'),
              tabla :tabla
          };

          res.json(listas);

        });

});

module.exports = router;

router.post('/crea', function(req, res, next) {


    var nombre_form = "Nueva Empresa";
    var data_form = [

      { type : 'rut' , key: 'rut' , label: 'Rut' , value: '' , obligatorio: true , error_text: 'Favor ingrese un rut correcto' , is_error:false , opciones: ['',''] },
          { type : 'text' , key: 'razonSocial_nombre' , label: 'Razon social/nombre' , value: '' , obligatorio: true , error_text: 'Favor ingrese el texto', is_error:false   , opciones: ['',''] },
          { type : 'text' , key: 'direccion' , label: 'Dirección' , value: '' , obligatorio: true , error_text: 'Favor ingrese la dirección', is_error:false   , opciones: ['',''] },
          { type : 'region' , key: 'region' , label: 'Region' , value: '' , obligatorio: true , error_text: 'Favor ingrese la región', is_error:false   , opciones: ['',''] },
          { type : 'comuna' , key: 'comuna' , label: 'Comuna' , value: '' , obligatorio: true , error_text: 'Favor ingrese la comuna', is_error:false   , opciones: ['',''] },
          { type : 'email' , key: 'mail' , label: 'E-mail' , value: '' , obligatorio: true , error_text: 'Favor ingrese un mail valido', is_error:false   , opciones: ['',''] },
          { type : 'text' , key: 'nombre' , label: 'Nombre' , value: '' , obligatorio: true , error_text: 'Favor ingrese un nombre', is_error:false   , opciones: ['',''] },
          { type : 'text' , key: 'apellidos' , label: 'Apellidos' , value: '' , obligatorio: true , error_text: 'Favor ingrese los apellidos', is_error:false   , opciones: ['',''] },
          { type : 'telefono' , key: 'telefono' , label: 'Telefono' , value: '56' , obligatorio: true , error_text: 'Favor ingrese un telefono valido', is_error:false   , opciones: ['',''] },

    ];

    res.json({
        nombre_form : nombre_form,
        data_form : data_form
    });

});

router.post('/edita', function(req, res, next) {

  var token = req.body.token;

  var nombre_form = "Edita Empresa";
  var data_form = [

    { type : 'rut' , key: 'rut' , label: 'Rut' , value: '' , obligatorio: true , error_text: 'Favor ingrese un rut correcto' , is_error:false , opciones: ['',''] },
    { type : 'text' , key: 'razonSocial_nombre' , label: 'Razon social/nombre' , value: '' , obligatorio: true , error_text: 'Favor ingrese el texto', is_error:false   , opciones: ['',''] },
    { type : 'text' , key: 'direccion' , label: 'Dirección' , value: '' , obligatorio: true , error_text: 'Favor ingrese la dirección', is_error:false   , opciones: ['',''] },
    { type : 'region' , key: 'region' , label: 'Region' , value: '' , obligatorio: true , error_text: 'Favor ingrese la región', is_error:false   , opciones: ['',''] },
    { type : 'comuna' , key: 'comuna' , label: 'Comuna' , value: '' , obligatorio: true , error_text: 'Favor ingrese la comuna', is_error:false   , opciones: ['',''] },
    { type : 'email' , key: 'mail' , label: 'E-mail' , value: '' , obligatorio: true , error_text: 'Favor ingrese un mail valido', is_error:false   , opciones: ['',''] },
    { type : 'text' , key: 'nombre' , label: 'Nombre' , value: '' , obligatorio: true , error_text: 'Favor ingrese un nombre', is_error:false   , opciones: ['',''] },
    { type : 'text' , key: 'apellidos' , label: 'Apellidos' , value: '' , obligatorio: true , error_text: 'Favor ingrese los apellidos', is_error:false   , opciones: ['',''] },
    { type : 'telefono' , key: 'telefono' , label: 'Telefono' , value: '56' , obligatorio: true , error_text: 'Favor ingrese un telefono valido', is_error:false   , opciones: ['',''] },

  ];

  EmpresaSchema.findOne({token: token},function (err,obj) {

      if (err) {
          res.json({is_ok: false, err: err});
      }
      else {

        res.json({
            is_ok: true,
            data_obj : obj,
            nombre_form : nombre_form,
            data_form : data_form
        });
      }

  });

});


router.post('/insert', function(req, res, next) {

        var date = new Date();
        var uuid = require('node-uuid');
        var token = uuid.v4();

        var new_empresa = new EmpresaSchema({
            token : token,
            rut: req.body.rut,
            razonSocial_nombre: req.body.razonSocial_nombre,
            direccion: req.body.direccion,
            region: req.body.region,
            comuna: req.body.comuna,
            mail: req.body.mail,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            fecha_creacion: date,
            delete: false
        });

        new_empresa.save(function (err) {
            if (err) {
                res.json({is_ok: false, err: err});
            }
            else {

                res.json({is_ok: true});
            }
        });


});

router.post('/update', function(req, res, next) {

    var token_id = req.body.token;

    var obj_update = req.body.obj_update;

    EmpresaSchema.findOneAndUpdate({token: token_id},obj_update,function (err,obj) {

        if (err) {
            res.json({is_ok: false, err: err});
        }
        else {

            res.json({is_ok: true});
        }


    });

});

router.post('/delete', function(req, res, next) {

    var token_id = req.body.token;

    EmpresaSchema.findOneAndUpdate({token: token_id},{delete:true},function (err,obj) {

        if (err) {
            res.json({is_ok: false, err: err});
        }
        else {

            res.json({is_ok: true});
        }

    });

});

module.exports = router;
