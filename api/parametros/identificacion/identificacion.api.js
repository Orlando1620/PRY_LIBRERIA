
var mongoose = require('mongoose');

var Identificacion = require('./identificacion.model');

module.exports.listarIdentificacion = function(req, res) {
  
  Identificacion.find().sort({nombre: 'asc'})
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
