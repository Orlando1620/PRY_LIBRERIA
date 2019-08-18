var mongoose = require('mongoose');

var impuestoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  valor: Number
});

module.exports = mongoose.model('Impuesto', impuestoSchema,'Impuesto'); 