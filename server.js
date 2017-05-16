//Server code

// modules

var express = require('express');
var app = express();
var path = require('path');
var bodyParser =  require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');

//FOR BALANCING, registering port
var seaport = require('seaport');
var ports = seaport.connect('localhost', 9090);
//var args = process.argv.splice(2);

var morgan = require('morgan');
//var flash = require('connect-flash');

//config files
//require file with real credentials
var db = require('./app/config/db'); 

//grab model
var WorkoutPlan = require('./app/models/workoutPlan');
var Exercise = require('./app/models/exercises');
var User = require('./app/models/User')
//var User = require('./app/models/user');
var userConfig = require('./app/config/passport');

//port set up
var port = process.argv[2] || 18070;
//var port = process.env.PORT || 8080;

//uncomment after entering credentials in config/db.js
mongoose.connect(db.url, ()=>{
    console.log('Prisijungta prie db!');
});


//LOG RWEQUESTS TO CONSOLE
//app.use(morgan('dev')); //log requests to console

//parse application/json

app.use(bodyParser.json());

//specify your view folder and parse the engine to HTML
app.use(express.static(__dirname + '/public'));
//parse application/x-www-form-urlencencoded
app.use(bodyParser.urlencoded({ extended: true}));

//override with the X-HTTP-Methd-Override header in the request.  simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));


// required for passport
app.use(passport.initialize());




// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

//required for login/out setup
app.get('/logout', function(req, res){
            console.log('logging out');
            req.logout();
            res.redirect('/');
});
// used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


//ROUTES ===========================================================================

//support page refresh, move to routes.js

 
require('./app/routes')(app); //configure routes ; load routes and pass in app and fully configured passport  


app.use(function(req, res) {
           console.log(req.socket.address().port);
            res.sendfile(__dirname + '/Public/index.html');
});  




//START APP ========================================================================

//start app at http single server
// app.listen(port, ()=>{
//     //checking
//     console.log('Prisijunges prie port\'o: ' + port);   
// });


//start app with seaport
app.listen(ports.register('server'), ()=>{
    //checking
    console.log('listening on ' , ports.query('server').shift().port);
    //console.log('Prisijunges prie port\'o: ' + port);   
});



//expose appexports = module.exports = app


