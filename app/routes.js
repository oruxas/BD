// grab the model

var workoutPlan = require('./models/workoutPlan');

    module.exports = function(app){
        //server routes 
        //handle things like api calls
        //authentication routes
        

        //sample routes
        app.get('/api/workoutPlans', function(req, res){
            // using mongoose to get all plans in the db:
            workoutPlan.find(function(err, workoutPlans){
                //check for errors, nothing after res.send(err) gets executed
                if (err) {             
                    res.send(err);
                } else {
                    res.json(workoutPlans);
                    console.log(JSON.stringify(workoutPlans));

                }

            }); //end workoutPlan.find
        });//end app.get()

        //route to handle creating goes here (app.post)
        //route to handle delete goes here (app.delete)

        // frontend routes
        
        //route to handle all angular requests
        app.get('*', function(req, res){
            res.sendfile('./public/views/index.html'); //loads public/index.html file
        });

    };