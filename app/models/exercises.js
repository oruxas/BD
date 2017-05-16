//app/models.exercises.js

//get mongoose module
var mongoose = require('mongoose');

//Schema definition:
var Schema = mongoose.Schema;

var exercises = new Schema(
    {
        selectedExercises : {
            title : String,
            link : String,
            tags : [ { type : String } ]         
        }
    }
);

module.exports = mongoose.model('exercises', exercises);
