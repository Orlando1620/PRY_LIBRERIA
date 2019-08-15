var Venta = require('./venta.model');
var mongoose = require('mongoose');

module.exports.listar = function(req, res) {
  var sucursal = req.body.sucursal;
  Venta.find({sucursal: sucursal}).sort({libro: 'asc'})
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

module.exports.registrar = function(req, res) {
  var sucursal = req.body.sucursal;
  var libro = req.body.libro;
  var cantidad = req.body.cantidad;
  
  var nuevaVenta = new Venta({
      _id: new mongoose.Types.ObjectId(),
      sucursal: sucursal,
      libro: libro,
      cantidad: cantidad
  });

  nuevaVenta.save()
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
