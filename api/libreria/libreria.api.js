var Libreria = require('./libreria.model');
var mongoose = require('mongoose');

module.exports.listarLibrerias = function(req, res){
  Libreria.find().sort({nombreComercial: 'asc'}).then(
      function(libreria){
          res.send(libreria);
      }
  )
};

module.exports.obtener_libreria = function(req, res){
  Libreria.find({nombreComercial : new RegExp(req.body.nombreComercial, "i")}).then(function(libreria){
      if(libreria){
          res.send(libreria);
      }else{
          res.send(false); 
      }
  })
};

module.exports.libById = function(req, res) {
  var admin_id = req.body.admin_id;
  Libreria.findOne({admin_id: admin_id}).exec()
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

module.exports.buscarLibreria = function(req, res) {
  var nombreComercial = req.body.nombreLibreria;
  Libreria.findOne({nombreComercial:nombreComercial}).exec()
  .then(
    function(result){
      console.log("lib"+result);
      res.send(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
} 

  