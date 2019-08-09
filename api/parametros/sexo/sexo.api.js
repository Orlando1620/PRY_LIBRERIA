
var mongoose = require('mongoose');

var Sexo = require('./sexo.model');

module.exports.listarSexo = function(req, res) {
  
  Sexo.find().sort({nombre: 'asc'})
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
