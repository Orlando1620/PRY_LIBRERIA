var Categoria = require('./categoria.model');
var mongoose = require('mongoose');


module.exports.listarCategorias = function(req, res) {
  Categoria.find().sort({nombre: 'asc'})
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

module.exports.registrarCategoria = function(req, res){
  var fechaRegistro = req.body.fechaRegistro;
  var nombre = req.body.nombre;
  
  var nuevaCategoria = new Categoria({
      _id: new mongoose.Types.ObjectId(),
      fechaRegistro: fechaRegistro,
      nombre: nombre
  });

  nuevaCategoria.save()
  .then(
      function(result){
          console.log(result);
          res.json({result: 'exito'});
      }
  )
  .catch(
      function(err){
          console.log(err);
      }
  );
 
}

/**
* Extrae los libros de la base de datos, que coincidan con la busqueda
*/
module.exports.validarCategoria = function(req, res) {
  
  Categoria.find({nombre:req.body.categoria}).exec()
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
* Extrae los libros de la base de datos, que coincidan con la busqueda
*/
module.exports.filtrarCategoria = function(req, res) {
  
  Categoria.find({nombre:req.body.categoria}).exec()
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