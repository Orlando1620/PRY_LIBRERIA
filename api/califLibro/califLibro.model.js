// JavaScript Document

var mongoose = require('mongoose');

var califLibroSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  libro: String,
  calif: Number,
  resena: String,
  usuario: String,
  fecha: Date
});

module.exports = mongoose.model('CalifLibro', califLibroSchema,'CalifsLibros'); 