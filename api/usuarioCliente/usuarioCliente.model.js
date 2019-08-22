var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  tipo: String,
  fechaRegistro: Date,
  nombre: String,
  apellido1: String,
  apellido2: String,
  correo: String,
  contrasena: String,
  tipoIdentificacion: String,
  identificacion: String,
  fechaNacimiento: String,
  sexo: String,
  provincia: String,
  canton: String,
  distrito: String,
  direccionExacta: String,
  latitud: Number,
  longitud: Number,
  imgUrl: String,
  generosFav: [Array],
  clubes: [Array],
  libros: [Array],
  librosFav: [Array],
  bloqueado: Boolean
});

module.exports = mongoose.model('UsuarioCliente', usuarioSchema, 'Usuarios'); 