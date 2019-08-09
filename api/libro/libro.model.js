var mongoose = require('mongoose');

var libroSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //String único aleatorio
  nombre: String,
  isbn: String,
  idioma: String,
  autor: String,
  genero: String,
  categoria: String,
  descripcion: String,
  urlImg: String,
  urlPdf: String,
  fechaRegistro: Date,
  formato: String,
  calificacion: Number
});

module.exports = mongoose.model('Libro', libroSchema,'Libros'); // Define el collection que se crea en la base de datos