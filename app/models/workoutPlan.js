//app/models.wourkoutPlan.js

//get mongoose module
var mongoose = require('mongoose');
var User = require('../models/User');

//Schema definition:
var Schema = mongoose.Schema;

var workoutPlan = new Schema(
    {
        userName : String,
        userEmail : String,
        workoutPlanType : [{type : String}],        
        workoutPlanTitle : {type : String},       
              
                    totalDuration : Number, 
                    daysPerWeek : Number, 
                    bodyPart : String, 
                    selectedExercises : String,
                    sets : Number, 
                    reps : Number,
                    restTime : Number,
                    upvotes : Number
    }
);

module.exports = mongoose.model('workoutPlan', workoutPlan);