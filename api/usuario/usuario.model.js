var mongoose = require('mongoose');

var usuarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fechaRegistro: Date,
    nombre: String,
    apellido1: String,
    apellido2: String,
    tipo: String,
    correo: String,
    contrasena: String
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'Usuarios');
