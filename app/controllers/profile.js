var mongoose = require('mongoose');
var user = require('../models/User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    user
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};


// module.exports.profileLogout = function(req, res) {

//   if (!req.payload._id) {
//     res.status(401).json({
//       "message" : "UnauthorizedError: private profile"
//     });
//   } else {
//     user
//       .findById(req.payload._id)
//       .exec(function(err, user) {
//         res.status(200).json(user);
//       });
//   }

// };