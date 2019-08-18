var Compra = require('./compra.model');
var mongoose = require('mongoose');

module.exports.listar = function(req, res) {
  var usuario = req.body.usuario;
  Compra.find({usuario: usuario}).exec()
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
  var carrito = req.body.carrito;
  var usuario = req.body.usuario;
  var monto = req.body.monto;
  
  var nuevaCompra = new Compra({
      _id: new mongoose.Types.ObjectId(),
      carrito: carrito,
      usuario: usuario,
      monto: monto
  });

  nuevaCompra.save()
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
