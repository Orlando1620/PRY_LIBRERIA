var mongoose = require('mongoose');

var identificacionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //String único aleatorio
  nombre: String
});

module.exports = mongoose.model('Identificacion', identificacionSchema,'Identificaciones'); // Define el collection que se crea en la base de datos