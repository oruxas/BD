//app/models.tags.js

//get mongoose module
var mongoose = require('mongoose');

//Schema definition:
var Schema = mongoose.Schema;

var tags = new Schema(
    {
        tag : {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('tags', tags);