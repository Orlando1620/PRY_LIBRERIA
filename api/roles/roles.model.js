var mongoose = require('mongoose');

var rolesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //String único aleatorio
  nombre: String
});

module.exports = mongoose.model('Rol', rolesSchema,'Roles'); // Define el collection que se crea en la base de datos