var mongoose = require('mongoose');

var Roles = require('./roles.model');

module.exports.listarRoles = function (req, res) {

  Roles.find().exec()
    .then(
      function (result) {
        res.send(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );

}


