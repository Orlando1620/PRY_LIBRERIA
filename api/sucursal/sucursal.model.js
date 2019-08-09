var mongoose = require('mongoose');

var sucursalSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombreSucursal: String,
  telefono: Number,
  latitud: Number,
  longitud: Number,
  direccion: String,
  provincia: String,
  canton: String,
  distrito:String,
  nombreLibreria: String,
  fechaRegistro: Date
});

module.exports = mongoose.model('Sucursal', sucursalSchema,'Sucursales');