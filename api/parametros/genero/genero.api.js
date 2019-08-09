var Genero = require('./genero.model');
var mongoose = require('mongoose');

module.exports.listarGeneros = function(req, res) {
  Genero.find().sort({nombre: 'asc'})
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

module.exports.registrarGenero = function(req, res){
  var fechaRegistro = req.body.fechaRegistro;
  var nombre = req.body.nombre;


  var nuevoGenero = new Genero({
      _id: new mongoose.Types.ObjectId(),
      fechaRegistro: fechaRegistro,
      nombre: nombre
  });

  nuevoGenero.save()
  .then(
      function(result){
          console.log(result);
          res.json({result: 'exito'});
      }
  )
  .catch(
      function(err){
          console.log(err);
      }
  );
}
