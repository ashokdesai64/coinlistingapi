var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var validate = require('express-validation');
var coins = require('./routes/coins');
var user = require('./routes/user');
// var validation = require('./validation/login');
// var validate = require('express-validator');

var app = express();
// var validation = require('./validation/login.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1', coins);
app.use('/api/v1', user);
// app.use('/api/v1', user);
// app.post('/api/v1/login', validate(validation.login), respond200);
// app.post('/api/v1/login', validate(validation.login), function(req, res){
//     console.log(req.body); // => { email: "user@domain", password: "pwd" }
//     res.json(200);
// });

module.exports = app;
