var http = require("https");
module.exports.get_token=function(credentials,next_function){
  var options = {
    "method": "POST",
    "hostname": "api-et.hellocash.net",
    "port": null,
    "path": "/authenticate",
    "headers": {
      "content-type": "application/json"

    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];
    if(res.statusCode!=200){
      var error={
        statusCode: res.statusCode,
        detail: res.statusMessage      
      }
      next_function(error,null);
    }
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
    // console.log(body.toString());
    var my_token=JSON.parse(body.toString()).token
    // console.log("The token I got from HelloCash is :",my_token, "\n Therefore I can request for Invoices");
    next_function(null,JSON.parse(body.toString()));  
  });
  });

  req.write(credentials);
  req.end();
};
module.exports.get_invoices=function(api_token,next_function){
  var options = {
    "method": "GET",
    "hostname": "api-et.hellocash.net",
    "port": null,
    "path": "/invoices",
    "headers": {
      "content-type": "application/json",
      "Authorization": "Bearer "+ api_token  
    }
  };

  var req = http.request(options, function (res) {
    var chunks = [];
    if(res.statusCode!=200){
      var error={
        statusCode: res.statusCode,
        detail: res.statusMessage      
      }
      next_function(error,null);
    }
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
    // console.log(body.toString());
    var my_token=JSON.parse(body.toString()).token
    // console.log("The token I got from HelloCash is :",my_token, "\n Therefore I can request for Invoices");
    next_function(null,JSON.parse(body.toString()));  
  });
  });

  req.write(api_token);
  req.end();
};