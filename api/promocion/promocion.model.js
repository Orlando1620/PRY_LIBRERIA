var mongoose = require('mongoose');

var sucursalSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  sucursal: String,
  libro: String,
  porcentaje: Number,
  fechaInicio: Date,
  fechaFinaliza: Date,
  imgUrl: String,
});

module.exports = mongoose.model('Promocion', sucursalSchema,'Promociones');
