var mongoose = require('mongoose');

var inventarioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  nombreSuc: String,
  isbn: String,
  libro: String,
  cantidad: Number,
  precio: Number,
  fechaReg: Date
});

module.exports = mongoose.model('Inventario', inventarioSchema,'Inventarios'); 