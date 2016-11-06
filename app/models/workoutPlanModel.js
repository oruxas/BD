//app/models.wourkoutPlanModel.js

//get mongoose module
var mongoose = require('mongoose');

//define our models
//module.exports allows to pass this to other files when called

module.exports = mongoose.model('workoutPlan', {
    workoutType: {
        bodyweight: {type: String, default: ''},
        weights: {type: String, default: ''},
        mixed: {type: String, default: ''}
    }
});