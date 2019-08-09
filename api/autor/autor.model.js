var mongoose = require('mongoose');

var autorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  nombre: String,
  apellido1: String,
  apellido2: String,
  nac: Date,
  bio: String,
  imgUrl: String,
  fechaRegistro: Date,
  libros: Array 
});

module.exports = mongoose.model('Autor', autorSchema,'Autores'); 