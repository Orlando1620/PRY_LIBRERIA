var Impuesto = require('./impuesto.model');
var mongoose = require('mongoose');

module.exports.listarImpuesto = function(req, res) {
  Impuesto.find().exec()
    .then(
      function(result){
        res.send(result);
      }
    )
    .catch(
      function(err){
        console.log(err);
      }
    );
}
