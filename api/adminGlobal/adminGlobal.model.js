var mongoose = require('mongoose');

var adminGlobalSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  tipo: String,
  fechaRegistro: Date,
  nombre: String,
  apellido1: String,
  apellido2: String,
  correo: String,
  contrasena: String,
  tipoIdentificacion: String,
  identificacion:String
});

module.exports = mongoose.model('AdminGlobal', adminGlobalSchema,'Usuarios'); 