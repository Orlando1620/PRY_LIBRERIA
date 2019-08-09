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
  identificacion:String,
  fechaNacimiento: Date,
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
  urlImg: String,
  bloqueado: Boolean
});

module.exports = mongoose.model('UsuarioCliente', usuarioSchema,'Usuarios'); 