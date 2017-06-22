


module.exports.get_listas_maestras = function (callback) {

    try {

        var panel_preferences = {
            can_edit : false,
            can_block : false,
            can_delete : false,
            can_excel : false,
            can_link : true,
            create : {can_create: false , text : "Nueva Lista"}
        };

        var tabla  = { content: [{nombre: "Nombre" , key : "name" , Type : 'String'},{nombre:"Versión",key: "version" ,Type : 'String'},{nombre:"Ir",key: "link",Type : 'Link'}]};

        var data = [
            {name:'Empresa', version:'1.0', link:'/listas/empresa'},
            {name:'Cliente', version:'1.0', link:'/listas/cliente'},
            {name:'Grupo',   version:'1.0', link:'/listas/grupo'},
        ];

        tabla.data = data;


       var listas = {
           is_ok: true,
           panel_preferences :panel_preferences,
           tabla_name:'Listas Maestras',
           tabla_sub_name:'',
           numero_data: (data.length + ' listas'),
           tabla :tabla
       };

       callback(listas);

    }catch (e){callback(e);};

};
