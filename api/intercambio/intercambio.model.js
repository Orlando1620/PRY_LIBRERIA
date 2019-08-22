var mongoose = require('mongoose');

var intercambioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  libro1: String,
  libro2: String,
  sucursal: String,
  fecha: Date,
  hora: String,
  usuario1: String,
  usuario2: String,
  aceptada: Boolean,
  pendiente: Boolean,
  entrega1: Boolean,
  entrega2: Boolean,
  devolucion1: Boolean,
  devolucion2: Boolean
});

module.exports = mongoose.model('Intercambio', intercambioSchema,'Intercambios'); 