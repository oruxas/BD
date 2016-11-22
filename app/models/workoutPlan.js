//app/models.wourkoutPlanModel.js

//get mongoose module
var mongoose = require('mongoose');

//define our models
//module.exports allows to pass this to other files when called

module.exports = mongoose.model('workoutPlan', [
    {
        userId : Number,
        userName : String,
        password : String
    },
    {
        workoutType: {
            bodyweight: [   {totalDuration : Date}, 
                            {daysPerWeek : Date}, 
                            {bodyPart : String}, 
                            {selectedExercise : String}, 
                            {sets : Number}, 
                            {reps : Number}
                        ],
            weights: [      {totalDuration : Date}, 
                            {daysPerWeek : Date}, 
                            {bodyPart : String}, 
                            {selectedExercise : String}, 
                            {sets : Number}, 
                            {reps : Number}
                        ],
            mixed: [        {totalDuration : Date}, 
                            {daysPerWeek : Date}, 
                            {bodyPart : String}, 
                            {selectedExercise : String}, 
                            {sets : Number}, 
                            {reps : Number}
                        ]
    }
}]);