var Inventario = require('./inventario.model');
var mongoose = require('mongoose');

module.exports.listarInventario = function(req, res) {
  var sucursal = req.body.sucursal;
  Inventario.find({sucursal: sucursal}).sort({libro: 'asc'})
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
 
module.exports.listarTodo = function(req, res) {
  Inventario.find().sort({libro: 'asc'})
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

module.exports.modificarInventario = function(req, res) {

  var idSuc = req.body.idSuc;
  var idLibro = req.body.libro;
  var cantidad = req.body.cantidad;
  var precio = req.body.precio;
  Inventario.updateOne(
    { sucursal: idSuc, libro: idLibro },
    {
      $set: { 
        sucursal: idSuc,
        libro: idLibro,
        cantidad: cantidad,
        precio: precio
      },
      $currentDate: { lastModified: true }
    }
  )
  .then(
      function(result){
      res.json(result);
      }
  )
  .catch(
      function(err){
      console.log(err);
      }
  );
}

module.exports.restarInventario = async function(req, res) {

  var idSuc = req.body.sucursal;
  var idLibro = req.body.libro;
  var cantidad = req.body.cantidad;

  var inventario = await Inventario.findOne({ sucursal: idSuc, libro: idLibro }).exec();
  

  Inventario.updateOne(
    { sucursal: idSuc, libro: idLibro },
    {
      $set: { 
        cantidad: inventario['cantidad'] - cantidad
      },
      $currentDate: { lastModified: true }
    }
  )
  .then(
      function(result){
      res.json(result);
      }
  )
  .catch(
      function(err){
      console.log(err);
      }
  );
}

module.exports.eliminarInventario = async function(req, res) {
  
  await Inventario.deleteOne(
    { sucursal: req.body.idSuc, libro: req.body.idLibro }
  )
  res.json({result: "exito"});
}
  
module.exports.listarPerfilLibro = function(req, res) {
  var libro = req.body.libro;
  Inventario.find({libro: libro}).exec()
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

module.exports.eliminarInventarioTodo = async function(req, res) {
  await Inventario.deleteMany(
    { sucursal: req.body.sucursal }
  );
  res.json({result: "exito"});
}