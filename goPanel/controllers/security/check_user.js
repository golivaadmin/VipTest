var jwt = require('jwt-simple');
var secret = global.secret_diggest;

module.exports.check_user = function (token,res,callback) {

    try{
      
      var decode = jwt.decode(token, secret);
      callback(decode);

    }catch(e){

        res.json({is_ok:false,security_problem:true});
    }

};

module.exports.user_token = function (user,callback) {


}

module.exports.encode = function (object,callback) {
      var encode = jwt.encode(object, secret);
      callback(encode);
};

module.exports.decode = function (object,callback) {

      var decoded = jwt.decode(object, secret);
      callback(decoded);

};
