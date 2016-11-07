//Server code

// modules

var express = require('express');
var app = express();
var bodyParser =  require('body-parser');
var methodOverride = require('method-override');

//configuration

//config files
//require file with real credentials
var db = require('/4Kursas/db_real_credentials'); 

//port set up
var port = process.env.PORT || 8080;

//uncomment after entering credentials in config/db.js
//mongoose.connect(db.url);

//get all data/stuff of the body (POST) parameters
//parse application/json

app.use(bodyParser.json());

//parse application/x-www-form-urlencencoded

app.use(bodyParser.urlencoded({ extended: true}));


//override with the X-HTTP-Methd-Override header in the request.  simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

//set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

//ROUTES ===========================================================================
require('./app.routes')(app); //configure routes

//START APP ========================================================================

//startup our app at http http://localhost:8080
app.listen(port);

//checking
concole.log('Prisijunges prie port\'o: ' + port);

//expose appexports = module.exports = app


