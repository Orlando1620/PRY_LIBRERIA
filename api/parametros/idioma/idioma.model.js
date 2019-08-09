var mongoose = require('mongoose');

var idiomaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  nombre: String
});

module.exports = mongoose.model('Idioma', idiomaSchema,'Idiomas'); 