var Libreria = require('./libreria.model');
var Sucursal = require('../sucursal/sucursal.model');
var mongoose = require('mongoose');

module.exports.listarLibrerias = function (req, res) {
  Libreria.find().sort({ nombreComercial: 'asc' }).then(
    function (libreria) {
      res.send(libreria);
    }
  )
};

module.exports.obtener_libreria = function (req, res) {
  Libreria.findOne({ nombreComercial: new RegExp(req.body.nombreComercial, "i") }).then(function (libreria) {
    if (libreria) {
      res.send(libreria);
    } else {
      res.send(false);
    }
  })
};

module.exports.libById = function (req, res) {
  var admin_id = req.body.admin_id;
  Libreria.findOne({ admin_id: admin_id }).exec()
    .then(
      function (result) {
        console.log(result);
        res.send(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}

module.exports.buscarLibreria = function (req, res) {
  let nombreComercial = req.body.nombreLibreria;
  Libreria.findOne({ nombreComercial: nombreComercial }).exec()
    .then(
      function (result) {
        console.log("lib" + result);
        res.send(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}


module.exports.buscarPorId = function (req, res) {
  let id = req.body.id;
  Libreria.findOne({ _id: id }).exec()
    .then(
      function (result) {
        console.log("lib" + result);
        res.send(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}


module.exports.modificarLibreria = function (req, res) {
  let id = req.body._id;
  let lib = req.body;

  Libreria.findOne({ _id: id }, function (err, libdb) {
    if (err) {
      console.log("errr", err);
      //return done(err, null);
    } else {
      let nombreComercialAnterior = libdb.nombreComercial;

      Libreria.updateOne({ _id: id }, { $set: lib }, function (err, result) {
        if (err) {
          console.log(err);
        }
        else {
          if (nombreComercialAnterior !== lib.nombreComercial){
            Sucursal.updateMany({ nombreLibreria: nombreComercialAnterior }, { $set: {nombreLibreria: lib.nombreComercial} },
               function (err, actualizacionSucursal) {
              if (err) {
                console.log(err);
          
              }
              else {
                console.log(actualizacionSucursal);
              }
            });
          }
        }
      });
      
    
      res.send(lib);
    }
  })

};

module.exports.eliminarLibreria = async function (req, res) {
  await Libreria.deleteOne(
    { nombreComercial: req.body.libreria }
  )
  res.json({result: "exito"});

};