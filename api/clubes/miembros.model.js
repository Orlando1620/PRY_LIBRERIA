var mongoose = require('mongoose');

var miembrosClub = mongoose.Schema({
  usuarioId: String,
  clubId: String
});

module.exports = mongoose.model('Miembros', miembrosClub,'UsuariosClubLectura'); // Define el collection que se crea en la base de datos