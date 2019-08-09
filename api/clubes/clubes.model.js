var mongoose = require('mongoose');

var clubSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //String único aleatorio
  nombre: String,
  genero: String,
  tipo: String,
  dia: String,
  horaInicio: String,
  horaFinalizacion: String,
  libro: String,
  sucursal: String,
  descripcion: String,
  fechaReg: Date,
  creador: String
});

module.exports = mongoose.model('Club', clubSchema,'ClubesDeLectura'); // Define el collection que se crea en la base de datos