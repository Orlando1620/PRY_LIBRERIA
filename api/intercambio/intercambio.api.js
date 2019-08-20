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

module.exports.responder = async function(req, res) {
  try{
    var respuesta = req.body.respuesta;

    if(respuesta){
      await Intercambio.updateOne(
        { _id: req.body.id },
        {
          $set: { 
            libro2:req.body.libro2,
            aceptada: req.body.respuesta
          },
          $currentDate: { lastModified: true }
        }
      );
    } else {
      await Intercambio.updateOne(
        { _id: req.body.id },
        {
          $set: { 
            pendiente: false,
            aceptada: req.body.respuesta
          },
          $currentDate: { lastModified: true }
        }
      );
    }
  
    res.json({result:"exito"});
  } catch(err){
      console.log(err);
  }
}

module.exports.entregar = async function(req, res) {
  try{
    var entrega = req.body.entrega;

    if(entrega == 1){
      await Intercambio.updateOne(
        { _id: req.body.id },
        {
          $set: { 
            entrega1:true
          },
          $currentDate: { lastModified: true }
        }
      );
    } else {
      await Intercambio.updateOne(
        { _id: req.body.id },
        {
          $set: { 
            entrega2:true
          },
          $currentDate: { lastModified: true }
        }
      );
    }
  
    res.json({result:"exito"});
  } catch(err){
      console.log(err);
  }
}

module.exports.devolver = async function(req, res) {
  try{
    var devolucion = req.body.devolucion;

    if(devolucion == 1){
      await Intercambio.updateOne(
        { _id: req.body.id },
        {
          $set: { 
            devolucion1:true
          },
          $currentDate: { lastModified: true }
        }
      );
    } else {
      await Intercambio.updateOne(
        { _id: req.body.id },
        {
          $set: { 
            devolucion2:true
          },
          $currentDate: { lastModified: true }
        }
      );
    }
  
    res.json({result:"exito"});
  } catch(err){
      console.log(err);
  }
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

