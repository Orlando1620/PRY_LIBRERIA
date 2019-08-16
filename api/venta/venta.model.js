var mongoose = require('mongoose');

var ventaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  sucursal: String,
  libro: String,
  cantidad: Number
});

module.exports = mongoose.model('Venta', ventaSchema,'Ventas'); 