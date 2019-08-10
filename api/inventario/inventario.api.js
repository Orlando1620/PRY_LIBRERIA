var Inventario = require('./inventario.model');
var mongoose = require('mongoose');

module.exports.listarInventario = function(req, res) {
  var sucursal = req.body.sucursal;
  Inventario.find({sucursal: sucursal}).sort({libro: 'asc'})
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
  
module.exports.registrarInventario = function(req, res) {
  var idSuc = req.body.idSuc;
  var idLibro = req.body.libro;
  var cantidad = req.body.cantidad;
  var precio = req.body.precio;
  
  var nuevoInventario = new Inventario({
      _id: new mongoose.Types.ObjectId(),
      sucursal: idSuc,
      libro: idLibro,
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

module.exports.eliminarInventario = async function(req, res) {
  await Inventario.deleteMany(
    { nombreSuc: req.body.nombreSuc }
  );
  res.json({result: "exito"});
}