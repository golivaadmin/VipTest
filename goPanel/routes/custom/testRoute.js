var express = require('express');
var router = express.Router();

var test_controller = require("../../controllers/custom/testController");
var security = require("../../controllers/security/check_user");

router.post('/obtener', function(req, res, next) {

  security.check_user(req.body.token,res,function (user) {
    test_controller.get_test(
     {},function (data) {
         res.json(data);
     }
   );
  });

});

router.post('/nuevo', function(req, res, next) {

  test_controller.new_test(req.body,function (data) {
        res.json(data);
  });

});

module.exports = router;
