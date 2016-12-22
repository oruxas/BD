// grab the model

var WorkoutPlan = require('./models/workoutPlan');
var Exercise = require('./models/exercises');
//var User = require('../app/models/user');
var passport = require('passport');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});



    module.exports = function(app){
        //server routes 
        //handle things like api calls
        //authentication routes
        

        //sample routes
        app.get('/api/workoutPlans', function(req, res){
            // using mongoose to get all plans in the db:
            WorkoutPlan.find(function(err, workoutPlans){
                //check for errors, nothing after res.send(err) gets executed
                if (err) {             
                    res.send(err);
                } else {
                    res.json(workoutPlans);                  
                }
            }); //end workoutPlan.find
        });//end app.get()

        //route to handle creating goes here (app.post)
        app.post('/api/workoutPlans', function (req, res){
            console.log('post happening');
           
           var newPlan =  new WorkoutPlan({
        userName : req.body.userName,
        userEmail : req.body.userEmail,
        userPassword : req.body.password,
        workoutPlanTitle : req.body.title,        //required = true
              //bodyweight, weights, mixed
                    totalDuration : req.body.totalLength, 
                    daysPerWeek : req.body.trainDays, 
                    bodyPart : req.body.bodyPart, 
                    selectedExercises : req.body.exerciseTitle, 
                    sets : req.body.sets, 
                    reps : req.body.reps,
                    restTime : req.body.restTime

           
    });
            newPlan.save(function(err, plan) {
                if (err) throw err;


                //console.log('NAUJAS PLANAS: '+ plan);

                    //find and console.log all plans, cuz of asynch behavior
                    WorkoutPlan.find({}, function(err, workoutPlans){
                        if (err) throw err;

                        console.log(JSON.stringify(workoutPlans));
                    });

            }); //end save
   

        }); //end post route

        //route to handle delete goes here (app.delete)

       //END PLANS ROUTES 

       //EXERCISES ROUTES

        app.get('/api/exercises', function(req, res){
            // using mongoose to get all plans in the db:
           Exercise.find(function(err, exercises){
                //check for errors, nothing after res.send(err) gets executed
                if (err) {             
                    res.send(err);
                } else {
                    res.json(exercises);                  
                }
            }); //end exercise.find
        });//end app.get()

        //route to handle creating goes here (app.post)
        app.post('/api/exercises', function (req, res){
            console.log('post happening');
           
           var newExercise =  new Exercise({
        selectedExercises : {
                        title : req.body.title,
                        link : req.body.link,
                        tags : req.body.tags        
                    }

           
    });
            newExercise.save(function(err, exercise) {
                if (err) throw err;

                //console.log('NAUJAS PLANAS: '+ plan);
                    //find and console.log all plans, cuz of asynch behavior
                    Exercise.find({}, function(err, exercises){
                        if (err) throw err;

                        console.log(JSON.stringify(exercises));
                    });

            }); //end save
        }); //end post route

       //END EXERCISES ROUTES


        //AUTHENTICATION ROUTES

        var ctrlProfile = require('../app/controllers/profile');
        var ctrlAuth = require('../app/controllers/authentication');

        // profile
       app.get('/api/profile', auth, ctrlProfile.profileRead);

        // authentication
        app.post('/register', ctrlAuth.register);
        app.post('/api/login', ctrlAuth.login);
       app.get('/logout', ctrlAuth.logout);
        


        // frontend routes
        
        //route to handle all angular requests
        app.get('*', function(req, res){
            res.sendfile('./public/views/index.html'); //loads public/index.html file , required for other routes caching
        });
    };

