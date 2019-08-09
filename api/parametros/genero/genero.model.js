var mongoose = require('mongoose');

var generoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fechaRegistro: Date,
  nombre: String
});

module.exports = mongoose.model('Genero', generoSchema,'Generos'); 