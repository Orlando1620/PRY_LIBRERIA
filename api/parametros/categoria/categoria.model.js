var mongoose = require('mongoose');

var categoriaSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fechaRegistro: Date,
  nombre: String
});

module.exports = mongoose.model('Categoria', categoriaSchema,'Categorias'); 