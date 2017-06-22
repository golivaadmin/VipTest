var sendNotification = function(data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic MmVhMWU3NzgtOWFkNi00MTNmLWJjZTMtYWNjZDUzNzBjZDFl"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function(res) {
    res.on('data', function(data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function(e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};

module.exports.send_push_users = function () {

  var message = {
    app_id: "5eb5a37e-b458-11e3-ac11-000c2940e62c",
    contents: {"es": "Push Test"},
    included_segments: ["All"]
  };

  sendNotification(message);
};
