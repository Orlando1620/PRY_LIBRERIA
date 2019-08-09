// JavaScript Document

var mongoose = require('mongoose');

var pagoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  nombreTarjeta: { type: String, required: true },
  numTarjeta: { type: String, required: true },
  fechaVenc: { type: String, required: true },
  codSeg: { type: String, required: true },
  idUsuario: String
});

module.exports = mongoose.model('Pago', pagoSchema,'MetodoDePago'); 