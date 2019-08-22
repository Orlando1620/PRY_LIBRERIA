var Calif = require('./califUsuario.model');
var mongoose = require('mongoose');

module.exports.add = function(req, res) {

  var nuevaCalif = new Calif({
    _id: new mongoose.Types.ObjectId(),
    usuario1: req.body.usuario1,
    calif: req.body.calif,
    resena: req.body.resena,
    usuario2: req.body.usuario2,
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
  var usuario2 = req.body.usuario2;
  
  Calif.find({usuario2:usuario2}).exec()
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
