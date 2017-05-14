//app/models.userSchema.js

//get mongoose module
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var crypto = require('crypto');
var jwt = require('jsonwebtoken');
//Schema definition:
var userSchema = mongoose.Schema;

var user = new userSchema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role : {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});;

//methods

//generate hash
user.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

user.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

user.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000),
  }, "abc123" ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', user);