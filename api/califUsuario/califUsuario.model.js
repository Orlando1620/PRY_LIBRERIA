// JavaScript Document

var mongoose = require('mongoose');

var califUsuarioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  usuario1: String,
  calif: Number,
  resena: String,
  usuario2: String,
  fecha: Date
});

module.exports = mongoose.model('CalifUsuario', califUsuarioSchema,'CalifsUsuarios'); 