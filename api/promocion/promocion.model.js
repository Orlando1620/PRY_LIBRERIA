var mongoose = require('mongoose');

var sucursalSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  libroPromo: String,
  porcentaje: Number,
  fechaInicio: Date,
  fechaFinaliza: Date
});

module.exports = mongoose.model('Promocion', sucursalSchema,'Promociones');
