//app/models.wourkoutPlan.js

//get mongoose module
var mongoose = require('mongoose');
//define our models

//Schema definition:
var Schema = mongoose.Schema;

var workoutPlan = new Schema(
    {
        userId : {type : Number},
        userEmail : {type : String},
        userPassword : {type : String},
        workoutPlanType : [{type : String}],        //on select add 
        workoutPlanTitle : {type : String},        //required = true
              //bodyweight, weights, mixed
                    totalDuration : Number, 
                    daysPerWeek : Number, 
                    bodyPart : String, 
                    selectedExercises : String,
                    // selectedExercises : [{
                    //     title : String,
                    //     link : String,
                    //     tags : [ { type : String } ]    
                    // }] , 
                    sets : Number, 
                    reps : Number,
                    restTime : Number

           
    }
);

module.exports = mongoose.model('workoutPlan', workoutPlan);

/*
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

*/

/*
{
        userId : {type : Number},
        userEmail : {type : String, required : true},
        userPassword : {type : String, required : true},
        workoutPlanTitle : {type : String, required : true},
        workoutType: [
                {   workoutTypeName : String, //bodyweight, weights, mixed
                    totalDuration : Number, 
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
            {   workoutTypeName : String, //bodyweight, weights, mixed
                totalDuration : Number, 
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
           {   workoutTypeName : String, //bodyweight, weights, mixed
               totalDuration : Number, 
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
           }
        ]

*/ 