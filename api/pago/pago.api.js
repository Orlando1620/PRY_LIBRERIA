// JavaScript Document

var Pago = require('./pago.model');
var mongoose = require('mongoose');

module.exports.add = function(req, res) {
  var nombreTarjeta = req.body.nombreTarjeta;
  var numTarjeta = req.body.numTarjeta;
  var fechaVenc = req.body.fechaVenc;
  var codSeg = req.body.codSeg;
  var idUsuario = req.body.idUsuario;

  var nuevoPago = new Pago({
    _id: new mongoose.Types.ObjectId(),
    nombreTarjeta: nombreTarjeta,
    numTarjeta: numTarjeta,
    fechaVenc: fechaVenc,
    codSeg: codSeg,
    idUsuario: idUsuario
  });
  
  nuevoPago.save()
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

module.exports.checkMetPago = function(req, res){
  var id = req.body.id;
  Pago.find({idUsuario: id}).exec()
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