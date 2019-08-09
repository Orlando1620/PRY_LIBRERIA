var mongoose = require('mongoose');

var sexoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //String único aleatorio
  nombre: String
});

module.exports = mongoose.model('Sexo', sexoSchema,'Sexos'); // Define el collection que se crea en la base de datos