/**
 * Created by goliva on 26-08-16.
 */
app.controller('TablaController', function($scope,$http, $ionicModal, $timeout) {

    $scope.to_excel = function () {

    };

  $scope.delete = function (id) {

    server_delete_data(id,"listas",$http,function (responce) {

      if(responce.is_ok){

        server_get();


      }else{
        alert('error');
      }

    },function (error) {
      alert(error);
    });

  };

    var server_get = function () {

      server_get_data("listas",$http,function (responce) {



        var panel_preferences = {
          can_edit : true,
          can_block : false,
          can_delete : true,
          create : {can_create: true , text : "Nueva Lista"}
        }


        var tabla_headers  = [{nombre: "Nombre" , key : "name"},{nombre:"Versión",key: "version"}];
        $scope.tabla_headers = tabla_headers;
        $scope.panel_preferences = panel_preferences;
        $scope.tabla_name = "Listas";
        $scope.numero_data = responce.data.length;
        $scope.data = responce.data;
        console.log($scope.data);



      },function (error) {
        alert(error);
      });

    };

  server_get();

});
