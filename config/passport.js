var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../app/models/user');

passport.use( new LocalStrategy({
    usernameField: 'email'  //use email instead of username
    },
        function(username, password, done){
            User.findOne({ email: username }, function(err, user){
                if (err) { 
                    return done(err); 
                }
                //if no user
                if (!user) {
                    return done(null, false, { 
                        message: 'User not found' 
                    });
                } // end if no user
                //if password wrong
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Password is wrong'
                    }); 
                } // end wrong password
                //if correct return user obj
                return done(null,user);
            });
        }
));