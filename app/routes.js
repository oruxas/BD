// grab the model

var WorkoutPlan = require('./models/workoutPlan');
var Exercise = require('./models/exercises');
var Tag = require('./models/tags');
//var User = require('../app/models/user');
var passport = require('passport');
var express = require('express');
var router = express.Router();

var fileUrl = require('file-url');
var fs = require('fs');

//for pdf generation
//node-render module for pdf generation
var nRender = require('node-render');
var open = require('open');

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

           app.get('/api/workoutPlan/:id', function(req, res){
            // using mongoose to get all plans in the db:
           // alert(JSON.stringify(req.params.id));
           console.log(JSON.stringify(req.params.id));
            var planId = req.params.id;
            WorkoutPlan.findOne({_id: req.params.id},function(err, workoutPlan){
                console.log('ID is: '+ planId);
                //check for errors, nothing after res.send(err) gets executed
                if (err) {             
                    res.send(err);
                } else {
                    console.log(JSON.stringify(workoutPlan));

                    //format this input
                    var input="<h1> Jūsų plano pavadinimas: "+ "<span style ='color: blue'>"+workoutPlan.workoutPlanTitle+"</span>"+"</h1> <br /> \
                    <h3> Jūsų plano trukmė: "+ "<span style ='color: blue'>"+workoutPlan.totalDuration+"</span>"+"</h3> <br /> \
                    <h3> Jūsų treniruočių dienos: "+ "<span style ='color: blue'>"+workoutPlan.daysPerWeek+"</span>"+"</h3> <br /> \
                    <h3> Jūsų pasirinkta/os kūno dalys: "+ "<span style ='color: blue'>"+workoutPlan.bodyPart+"</span>"+"</h3> <br /> \
                    <h3> Jūsų pasirinkti pratimai: "+ "<span style ='color: blue'>"+workoutPlan.selectedExercises+"</span>"+"</h3> <br /> \
                    <h3> Jūsų pasirinkti setai: "+ "<span style ='color: blue'>"+workoutPlan.sets+"</span>"+"</h3> <br /> \
                    <h3> Jūsų pasirinkti pakartojimai: "+ "<span style ='color: blue'>"+workoutPlan.reps+"</span>"+"</h3> <br /> \
                    <h3> Jūsų pasirinktas poilsio laikas: "+ "<span style ='color: blue'>"+workoutPlan.restTime+"</span>"+"</h3> <br />";
                    var options = null;

                    var date = new Date().toDateString();
                    date.replace(/ /g,'');

                    var output = './file'+date;

                    
                    //fix

                    nRender.render(input, output, options);
                   // console.log(newFileUrl);
                    //time to create file

                      var newFileUrl = fileUrl("file"+date+".pdf");
                      

                      if(fs.existsSync(newFileUrl)){
                          open(newFileUrl,"chrome");
                      } else{
                          setTimeout( function(){
                            nRender.render(input, output, options);
                            open(newFileUrl,"chrome");
                        },1500 );
                      }
                    
                    

                    res.json(workoutPlan);                  
                }
            }); //end workoutPlan.find
            //might need to add html here for pdf
        });//end app.get()

        app.get('/api/workoutPlans/:email', function(req, res){
            // using mongoose to get all plans in the db:
            //console.log(req.params.email);
            var email = req.params.email;
            WorkoutPlan.find({userEmail: email},function(err, workoutPlans){
                //console.log('Email is: '+email);
                //check for errors, nothing after res.send(err) gets executed
                if (err) {             
                    res.send(err);
                } else {
                    console.log(JSON.stringify(workoutPlans));
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
                    restTime : req.body.restTime,
                    upvotes : 0 
    });
            newPlan.save(function(err, plan) {
                if (err) throw err;
                    //find and console.log all plans, cuz of asynch behavior
                    WorkoutPlan.find({}, function(err, workoutPlans){
                        if (err) throw err;
                        console.log(JSON.stringify(workoutPlans));
                    });
            }); //end save
        }); //end post route

        app.post('/api/workoutPlans/:id', function (req, res){
            console.log('update happening');
           
           var updateDoc = req.body;
            //delete updateDoc._id;
            //alert(updateDoc);

            WorkoutPlan.findOneAndUpdate({_id: req.body._id}, updateDoc, function(err, doc) {
                if (err) {
                console.log('error updating');
                } else {
                res.status(204).end();
                }
            });
        }); //end update route

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
        selectedExercises : {                       //not needed?
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
        app.post('/api/tag', function (req, res){
            console.log('post happening');
           console.log(req.body);
           var newTag =  new Tag({
                        tag : req.body.title
            });
            newTag.save(function(err, tag) {
                if (err) throw err;

                //console.log('NAUJAS PLANAS: '+ plan);
                    //find and console.log all plans, cuz of asynch behavior
                    Tag.find({}, function(err, tags){
                        if (err) throw err;

                        console.log(JSON.stringify(tags));
                    });

            }); //end save
        }); //end post route

         app.get('/api/tag', function(req, res){
            // using mongoose to get all plans in the db:
           Tag.find(function(err, tags){
                //check for errors, nothing after res.send(err) gets executed
                if (err) {             
                    res.send(err);
                } else {
                    res.json(tags);                  
                }
            }); //end exercise.find
        });//end app.get()


       //END TAGS ROUTES


        //AUTHENTICATION ROUTES

        var ctrlProfile = require('../app/controllers/profile');
        var ctrlAuth = require('../app/controllers/authentication');

        

        // authentication
        app.post('/api/register', ctrlAuth.register);
        app.post('/api/login', ctrlAuth.login);

        // profile
       app.get('/api/profile', auth, ctrlProfile.profileRead);

       app.get('/logout', ctrlAuth.logout);
        

       
        // frontend routes
        
        //route to handle all angular requests
         
    };

