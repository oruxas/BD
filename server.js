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
//latest usable for auth
//var passport = require('passport');
//var localStrategy = require('passport-local').Strategy;
//var cookieParser = require('cookie-parser');
//var session = require('express-session');

var morgan = require('morgan');
//var flash = require('connect-flash');

//configuration

//config files
//require file with real credentials
var db = require('./app/config/db'); 


//db.createCollection('workoutPlansCollection');

//grab model
var WorkoutPlan = require('./app/models/workoutPlan');
var Exercise = require('./app/models/exercises');
var User = require('./app/models/User')
//var User = require('./app/models/user');
var userConfig = require('./app/config/passport');




//create new model 
/*var newWorkoutPlan = WorkoutPlan({
    userId : 1,
        userEmail : "evaldaskal@gmail.com",
        userPassword : "admin123",
        workoutPlanTitle : "testPlan",
            workoutType : {
                bodyweight: {   totalDuration : 3, 
                                daysPerWeek : 3, 
                                bodyPart : "chest", 
                                selectedExercise : "pushups", 
                                sets : 5, 
                                reps : 15,
                                restTime : 3
                            },
                weights: {      totalDuration : 3, 
                                daysPerWeek : 3, 
                                bodyPart : "chest", 
                                selectedExercise : "pushups", 
                                sets : 5, 
                                reps : 15,
                                restTime : 3
                            },
                mixed: {        totalDuration : 3, 
                                daysPerWeek : 3, 
                                bodyPart : "chest", 
                                selectedExercise : "pushups", 
                                sets : 5, 
                                reps : 15,
                                restTime : 3
                            }
            } //end workoutType
});*/

//port set up
var port = process.env.PORT || 8080;

//uncomment after entering credentials in config/db.js
mongoose.connect(db.url);
console.log('Prisijungta prie db!');



//save workoutPlan:
// newWorkoutPlan.save(function(err){
//     if(err) throw err;
//     console.log('Workout Plan Created!');

//         //find and console.log all plans, cuz of asynch behavior
//         WorkoutPlan.find({}, function(err, workoutPlans){
//             if (err) throw err;

//             console.log(JSON.stringify(workoutPlans));
//         });

// });
WorkoutPlan.find({}, function(err, workoutPlans){
            if (err) throw err;

            console.log(JSON.stringify(workoutPlans));
        });


app.use(morgan('dev')); //log requests to console

//get all data/stuff of the body (POST) parameters
//parse application/json

app.use(bodyParser.json());

//specify your view folder and parse the engine to HTML
app.use(express.static(__dirname + '/public'));
//parse application/x-www-form-urlencencoded
app.use(bodyParser.urlencoded({ extended: true}));

//override with the X-HTTP-Methd-Override header in the request.  simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// [SH] Use the API routes when path starts with /api
//app.use('/api', routesApi);

// required for passport
app.use(session({ secret: 'MY_SECRET', resave: false, saveUninitialized: false } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


//define backend routes
app.get('/logout', function(req, res){
            console.log('logging out');
            req.logout();
            res.redirect('/');
        });

//ROUTES ===========================================================================
require('./app/routes')(app); //configure routes ; load routes and pass in app and fully configured passport


//START APP ========================================================================

//startup our app at http http://localhost:8080
app.listen(port);

//checking
console.log('Prisijunges prie port\'o: ' + port);

//expose appexports = module.exports = app


