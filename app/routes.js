// grab the model

var WorkoutPlan = require('./models/workoutPlan');
var mongoose = require('mongoose');

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
                console.log('req is: ' + req);
            //create plan
            //console.log(req.body.title); //req.body - my data
            // var keys = Object.keys(req.body); //keys for check
            // console.log(keys);
           // console.log('is formos: ' + JSON.stringify(req.body.title));

             //var workoutPlan = mongoose.model('workoutPlan', workoutPlan);

           function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
            }
           //works only hard coded
           var newPlan =  new WorkoutPlan({
        userId : req.body.userId,
        userEmail : req.body.email,
        userPassword : req.body.password,
        workoutPlanTitle : req.body.title,        //required = true
              //bodyweight, weights, mixed
                    totalDuration : req.body.totalLength, 
                    daysPerWeek : req.body.trainDays, 
                    bodyPart : req.body.bodyPart, 
                    selectedExercises : [{
                        title : req.body.exerciseTitle,
                        link : "linkas",
                        tags : [ "a", "1", "2" ]    
                    }] , 
                    sets : req.body.sets, 
                    reps : req.body.reps,
                    restTime : req.body.restTime

           
    });
            newPlan.save(function(err, plan) {
                if (err) throw err;


                console.log('NAUJAS PLANAS: '+ plan);

                    //find and console.log all plans, cuz of asynch behavior
                    WorkoutPlan.find({}, function(err, workoutPlans){
                        if (err) throw err;

                        console.log(JSON.stringify(workoutPlans));
                    });

            }); //end save
   

        }); //end post route

        //route to handle delete goes here (app.delete)

        // frontend routes
        
        //route to handle all angular requests
        app.get('*', function(req, res){
            res.sendfile('./public/views/index.html'); //loads public/index.html file , required for other routes caching
        });

        

    };