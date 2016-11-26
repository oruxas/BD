//Server code

// modules

var express = require('express');
var app = express();
var bodyParser =  require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');


//configuration

//config files
//require file with real credentials
var db = require('./config/db'); 

//db.createCollection('workoutPlansCollection');

//grab model
var WorkoutPlan = require('./app/models/workoutPlan');

//create new model 
var newWorkoutPlan = WorkoutPlan({
    userId : 1,
        userEmail : "evaldaskal@gmail.com",
        userPassword : "admin123",
            workoutType : {
                bodyweight: {   totalDuration : 3, 
                                daysPerWeek : 3, 
                                bodyPart : "chest", 
                                selectedExercise : "pushups", 
                                sets : 5, 
                                reps : 15,
                                restTime : 3
                            }/*,
                weights: [     {totalDuration : 3}, 
                                {daysPerWeek :3}, 
                                {bodyPart : "chest"}, 
                                {selectedExercise : "pushups"}, 
                                {sets : 5}, 
                                {reps : 15},
                                {restTime : 3}
                            ],
                mixed: [        {totalDuration : 3}, 
                                {daysPerWeek :3}, 
                                {bodyPart : "chest"}, 
                                {selectedExercise : "pushups"}, 
                                {sets : 5}, 
                                {reps : 15},
                                {restTime : 3}
                            ]*/
            }
});

//port set up
var port = process.env.PORT || 8080;

//uncomment after entering credentials in config/db.js
mongoose.connect(db.url);
console.log('Prisijungta prie db!');

//save workoutPlan:
newWorkoutPlan.save(function(err){
    if(err) throw err;
    console.log('Workout Plan Created!');

        //find and console.log all plans, cuz of asynch behavior
        WorkoutPlan.find({}, function(err, workoutPlans){
            if (err) throw err;

            console.log(JSON.stringify(workoutPlans));
        });

});



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
require('./app/routes')(app); //configure routes

//START APP ========================================================================

//startup our app at http http://localhost:8080
app.listen(port);

//checking
console.log('Prisijunges prie port\'o: ' + port);

//expose appexports = module.exports = app


