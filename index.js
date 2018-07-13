// var request = require("request");

// var options = { method: 'POST',
//   url: 'https://api-et.hellocash.net/authenticate',
//   headers: 
//    { 'postman-token': '4a9f1f07-a7ee-dd57-565d-41ce0176da0b',
//      'cache-control': 'no-cache',
//      'content-type': 'application/json' },
//   body: 
//    { principal: '+251918724255',
//      credentials: 'portal2018',
//      system: 'lucy' },
//   json: true };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
// var auth_details=JSON.stringify({ principal: '+251918724255',credentials: 'portal2018',system: 'lucy' });
var auth_details=JSON.stringify({ 
  principal: process.env.PRINCIPAL,
  credentials: process.env.CREDENTIALS,
  system: process.env.SYSTEM 
});
console.log(auth_details);
var daveAPI= require("./native");
var latency = require("response-time");
var express= require("express");
var bodyParser = require("body-parser");

var app= express();
app.use(bodyParser.json({extended: false}));
app.use(latency());
app.set("view engine","ejs");
app.get("/",function(req,res){
  res.statusCode=200;
  res.send({ message: "Welcome to our API"})
});
app.get("/api/token",function(req,res){
  daveAPI.get_token(auth_details,function(err,token){
    if(err!=null){
      console.log([err.statusCode, err.detail].join(" - "));
    }
    if(token!=null){
      res.statusCode=200;
      res.send(token);
    }
  });
});
app.get("/api/invoices",function(req,res){
  daveAPI.get_token(auth_details,function(err,token_object){
    if(err!=null){
      console.log([err.statusCode, err.detail].join(" - "));
    }
    if(token_object!=null){
      daveAPI.get_invoices(token_object.token,function(err,invoices){
        if(err){ console.log(err);}
        if(invoices){
          // res.setHeader("Content-Type","application/json");
          res.statusCode=200;
          res.send(invoices);
        }
      });    
    }
  });
});
app.get("/invoices",function(req,res){
  daveAPI.get_token(auth_details,function(err,token_object){
    if(err!=null){
      console.log([err.statusCode, err.detail].join(" - "));
    }
    if(token_object!=null){
      daveAPI.get_invoices(token_object.token,function(err,invoices){
        if(err){ console.log(err);}
        if(invoices){
          // res.setHeader("Content-Type","application/json");
          res.statusCode=200;
          //res.render("invoices/index.html.ejs", {my_invoices: invoices});
          res.send(invoices);

        }
      });    
    }
  });
});
var PORT =process.env.DEFAULT_PORT||5000
app.listen(PORT,function(req,res){ console.log("Service running on port ", PORT)});
