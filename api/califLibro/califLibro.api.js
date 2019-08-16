var Calif = require('./califLibro.model');
var mongoose = require('mongoose');

module.exports.add = function(req, res) {
  var libro = req.body.libro;
  var calif = req.body.calif;
  var resena = req.body.resena;
  var usuario = req.body.usuario;

  var nuevaCalif = new Calif({
    _id: new mongoose.Types.ObjectId(),
    libro: libro,
    calif: calif,
    resena: resena,
    usuario: usuario,
    fecha: new Date()
  });
  
  nuevaCalif.save()
  .then(
    function(result){
      console.log(result);
      res.json({result:"exito"});
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}

module.exports.listar = function(req, res) {
  var libro = req.body.libro;
  
  Calif.find({libro:libro}).exec()
  .then(
    function(result){
      console.log(result);
      res.send(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}

module.exports.listarById = function(req, res) {
  var libro = req.body.libro;
  var usuario = req.body.usuario;
  
  Calif.find({libro:libro, usuario:usuario}).exec()
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
