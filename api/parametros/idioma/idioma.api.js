var Idioma = require('./idioma.model');
var mongoose = require('mongoose');

module.exports.listarIdiomas = function(req, res) {
  Idioma.find().sort({nombre: 'asc'})
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
