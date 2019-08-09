var mongoose = require('mongoose');

var bitacoraSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  correo: String,
  accion: String,
  fecha: Date
});

module.exports = mongoose.model('Bitacora', bitacoraSchema,'Bitacoras'); 