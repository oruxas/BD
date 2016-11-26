//app/models.wourkoutPlanModel.js

//get mongoose module
var mongoose = require('mongoose');
var db = mongoose.connection;
//define our models
//module.exports allows to pass this to other files when called


//Schema definition:
var Schema = mongoose.Schema;

var workoutPlan = new Schema(
    {
        userId : {type : Number},
        userEmail : {type : String, required : true},
        userPassword : {type : String, required : true},
            workoutType : {
                bodyweight: {   totalDuration : Number, 
                                daysPerWeek : Number, 
                                bodyPart : String, 
                                selectedExercise : {
                                    title : String,
                                    link : String,
                                    tags : [ { type : String } ]   
                                }, 
                                sets : Number, 
                                reps : Number,
                                restTime : Number
                            },
                weights: {   totalDuration : Number, 
                                daysPerWeek : Number, 
                                bodyPart : String, 
                                selectedExercise : {
                                    title : String,
                                    link : String,
                                    tags : [ { type : String } ]       
                                },  
                                sets : Number, 
                                reps : Number,
                                restTime : Number
                            },
                mixed: {   totalDuration : Number, 
                                daysPerWeek : Number, 
                                bodyPart : String, 
                                selectedExercise : {
                                    title : String,
                                    link : String,
                                    tags : [ { type : String } ]      
                                },  
                                sets : Number, 
                                reps : Number,
                                restTime : Number
                            },
            }


    }
);

module.exports = mongoose.model('workoutPlan', workoutPlan);