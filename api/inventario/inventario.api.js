var Inventario = require('./inventario.model');
var mongoose = require('mongoose');



/**
 * Extrae todos los autores de la base de datos
 */
module.exports.listarInventario = function(req, res) {
  var nombreSuc = req.body.nombreSuc;
  Inventario.find({nombreSuc: nombreSuc}).sort({libro: 'asc'})
    .then(
      function(result){
        console.log(result);
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
module.exports.registrarInventario = function(req, res) {
  var nombreSuc = req.body.nombreSuc;
  var isbn = req.body.isbn;
  var libro = req.body.libro;
  var cantidad = req.body.cantidad;
  var precio = req.body.precio;
  
  var nuevoInventario = new Inventario({
      _id: new mongoose.Types.ObjectId(),
      nombreSuc: nombreSuc,
      isbn: isbn,
      libro: libro,
      cantidad: cantidad,
      precio: precio,
      fechaReg: new Date()
  });

  nuevoInventario.save()
  .then(
      function(result){
      console.log(result);
      res.json(result);
      }
  )
  .catch(
      function(err){
      console.log(err);
      }
  );
}
  
module.exports.listarPerfilLibro = function(req, res) {
  var isbn = req.body.isbn;
  Inventario.find({isbn: isbn}).exec()
    .then(
      function(result){
        console.log(result);
        res.send(result);
      }
    )
    .catch(
      function(err){
        console.log(err);
      }
    );
}