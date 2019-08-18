var mongoose = require('mongoose');

var compraSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  carrito: Array,
  usuario: String,
  monto: Number
});

module.exports = mongoose.model('Compra', compraSchema,'Compras'); 