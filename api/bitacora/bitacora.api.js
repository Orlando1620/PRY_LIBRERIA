var Bitacora = require('./bitacora.model');
var mongoose = require('mongoose');


/**
 * Extrae todos los autores de la base de datos
 */
module.exports.listarBitacora = function(req, res) {
    Bitacora.find().exec()
    .then(
      function(result){
        res.send(result);
      }
    )
    .catch(
      function(err){
        console.log(err);
      }
    );
  }
  
/**
 * Registra un nuevo autor en la base de datos
 */
module.exports.registrarBitacora = function(req, res) {
var correo = req.body.correo;
var accion = req.body.accion;
var fecha = req.body.fecha;

var nuevaBitacora = new Bitacora({
    _id: new mongoose.Types.ObjectId(),
    correo: correo,
    accion: accion,
    fecha: fecha
});

nuevaBitacora.save()
.then(
    function(result){
    console.log(result);
    }
)
.catch(
    function(err){
    console.log(err);
    }
);
}
  