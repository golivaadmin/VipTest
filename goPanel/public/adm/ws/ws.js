
var url_server = "http://localhost:3000/ws/";

var server_get_data = function (url,$http,exito,error){

  var request =
  {

  };

  make_get($http,url,exito,error);

};

var server_delete_data = function (_id,url,$http,exito,error) {

  var request =
  {
    _id : _id
  };

  make_delete($http,request,exito,error,url);
};

var make_get = function ($http,url,exito,error) {

  $http({
    method: 'GET',
    url: url_server+url
  }).success(function(data){
    exito(data);
  }).error(function(err){
    error(err);
  });

};

var make_post = function ($http,request,exito,error,url) {

  $http.post(url_server+url,request)
    .success(function(data) {
      console.log(data);
      exito(data);

    })
    .error(function(e) {
      console.log(e);
      error(e);
    });

};

var make_put = function ($http,request,exito,error,url) {

  $http.put(url_server+url,request)
    .success(function(data) {
      console.log(data);
      exito(data);

    })
    .error(function(e) {
      console.log(e);
      error(e);
    });


};

var make_delete = function ($http,request,exito,error,url) {


  $http({
    method  : 'DELETE',
    url     : url_server+url,
    headers : { 'Content-Type': 'application/json' },
    data    :  request

  }).success(function(data) {
    console.log(data);
    exito(data);

  })
    .error(function(e) {
      console.log(e);
      error(e);
    });


};

