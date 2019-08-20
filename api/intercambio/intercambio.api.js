var Intercambio = require('./intercambio.model');
var mongoose = require('mongoose');

module.exports.add = async function(req, res) {

  var result = await Intercambio.find({usuario2:req.body.usuario2,libro1:req.body.libro}).exec(); 
  if(result.length != 0){
      res.json({result: 'repetido'});
      return false;
  }

  var nuevoIntercambio = new Intercambio({
    _id: new mongoose.Types.ObjectId(),
    libro1: req.body.libro,
    libro2: '',
    sucursal: req.body.sucursal,
    fecha: req.body.fecha,
    hora: req.body.hora,
    usuario1: req.body.usuario1,
    usuario2: req.body.usuario2,
    aceptada: false,
    pendiente: true,
    entrega1: false,
    entrega2: false,
    devolucion1: false,
    devolucion2: false
  });
  
  nuevoIntercambio.save()
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

module.exports.recibidos = function(req, res) {

  Intercambio.find({usuario2:req.body.id}).exec()
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

module.exports.enviados = function(req, res) {

  Intercambio.find({usuario1:req.body.id}).exec()
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

