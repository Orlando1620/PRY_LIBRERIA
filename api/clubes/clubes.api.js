var Clubes = require('./clubes.model');
var MiembrosClub = require('./miembros.model');
var Libro = require('../libro/libro.model');
var Sucursal = require('../sucursal/sucursal.model');
var mongoose = require('mongoose');

module.exports.addFisico = function (req, res) {
  var nombre = req.body.nombre;
  var genero = req.body.genero;
  var tipo = req.body.tipo;
  var dia = req.body.dia;
  var horaInicio = req.body.horaInicio;
  var horaFinalizacion = req.body.horaFinalizacion;
  var libro = req.body.libro;
  var sucursal = req.body.sucursal;
  var descripcion = req.body.descripcion;
  var creador = req.body.creador;

  Clubes.find({ nombre: nombre }).exec()
    .then(
      function (result) {
        if (result.length == 0) {
          var nuevoClub = new Clubes({
            _id: new mongoose.Types.ObjectId(),
            nombre: nombre,
            genero: genero,
            tipo: tipo,
            dia: dia,
            horaInicio: horaInicio,
            horaFinalizacion: horaFinalizacion,
            libro: libro,
            sucursal: sucursal,
            descripcion: descripcion,
            fechaReg: new Date(),
            creador: creador
          });

          nuevoClub.save()
            .then(
              function (result) {
                console.log(result);
                res.json({ result: 'exito' });
              }
            )
            .catch(
              function (err) {
                console.log(err);
              }
            );
        } else {
          res.json({ result: 'repetido' });
        }
      }
    )
}

module.exports.addVirtual = function (req, res) {
  var nombre = req.body.nombre;
  var genero = req.body.genero;
  var tipo = req.body.tipo;
  var dia = req.body.dia;
  var horaInicio = req.body.horaInicio;
  var horaFinalizacion = req.body.horaFinalizacion;
  var libro = req.body.libro;
  var descripcion = req.body.descripcion;
  var creador = req.body.creador;

  Clubes.find({ nombre: nombre }).exec()
    .then(
      function (result) {
        if (result.length == 0) {
          var nuevoClub = new Clubes({
            _id: new mongoose.Types.ObjectId(),
            nombre: nombre,
            genero: genero,
            tipo: tipo,
            dia: dia,
            horaInicio: horaInicio,
            horaFinalizacion: horaFinalizacion,
            libro: libro,
            descripcion: descripcion,
            fechaReg: new Date(),
            creador: creador
          });

          nuevoClub.save()
            .then(
              function (result) {
                console.log(result);
                res.json({ result: 'exito' });
              }
            )
            .catch(
              function (err) {
                console.log(err);
              }
            );
        } else {
          res.json({ result: 'repetido' });
        }
      }
    )
}

module.exports.listarClubes = function (req, res) {
  Clubes.find().sort({ nombre: 'asc' })
    .then(
      function (result) {
        //console.log(result);
        res.send(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}

module.exports.listarClubesById = function (req, res) {
  var creador = req.body.creador;
  Clubes.find({ creador: creador }).exec()
    .then(
      function (result) {
        //console.log(result);
        res.send(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}

module.exports.filtrarGenTipo = function (req, res) {
  var gen = req.body.genero;
  var tipo = req.body.tipo;
  if (gen == "Generos" && tipo != "Tipo") {
    Clubes.find({ tipo: tipo }).sort({ nombre: 'asc' })
      .then(
        function (result) {
          res.send(result);
        }
      )
      .catch(
        function (err) {
          console.log(err);
        }
      );
  } else {
    if (tipo == "Tipo" && gen != "Generos") {
      Clubes.find({ genero: gen }).sort({ nombre: 'asc' })
        .then(
          function (result) {
            res.send(result);
          }
        )
        .catch(
          function (err) {
            console.log(err);
          }
        );
    } else {
      if (tipo != "Tipo" && gen != "Generos") {
        Clubes.find({ genero: gen, tipo: tipo }).sort({ nombre: 'asc' })
          .then(
            function (result) {
              res.send(result);
            }
          )
          .catch(
            function (err) {
              console.log(err);
            }
          );
      } else {
        Clubes.find().sort({ nombre: 'asc' })
          .then(
            function (result) {
              res.send(result);
            }
          )
          .catch(
            function (err) {
              console.log(err);
            }
          );
      }
    }
  }

}

module.exports.obtenerClub = function (req, res) {
  Clubes.findOne({ nombre: new RegExp(req.body.nombre, "i") }).then(function (club) {
    if (club) {
      res.send(club);
    } else {
      res.send(false);
    }
  })
};

module.exports.obtenerLibroClub = function (req, res) {
  Libro.findOne({ _id: req.body.libro }).then(function (libro) {
    if (libro) {
      res.send(libro);
    } else {
      res.send(false);
    }
  })
};

module.exports.obtenerSucursalClub = function (req, res) {
  Sucursal.findOne({ _id: req.body.sucursal }).then(function (suc) {
    if (suc) {
      res.send(suc);
    } else {
      res.send(false);
    }
  })
};

module.exports.unirseAlClub = function (req, res) {
  let usuarioId = req.body.usuarioId;
  let clubId = req.body.clubId;
  MiembrosClub.findOne({ usuarioId: usuarioId, clubId: clubId }).then(function (usu) {

    if (!usu) {
      let nuevoMiembro = new MiembrosClub({
        usuarioId: usuarioId,
        clubId: clubId
      });
      nuevoMiembro.save(function (error) {
        if (error) {
          console.log(error);
          res.json({ codigo: 'errorADmin' });
        } else {
          res.json({ codigo: 'exitoso' });
        }
      })
    }
  })
};

module.exports.deleteUsuario = function (req, res) {
  let usuarioId = req.body.usuarioId;
  let clubId = req.body.clubId;
  MiembrosClub.findOneAndDelete({ usuarioId: usuarioId, clubId: clubId }).then(del => {
    if (del) {
      res.send(true);
    } else {
      res.send(false);
    }
  });

};

module.exports.verificarUsuario = function (req, res){
  let usuarioId = req.body.usuarioId;
  let clubId = req.body.clubId;
  MiembrosClub.findOne({ usuarioId: usuarioId, clubId: clubId }).then(function (verf) {
    if (verf) {
      res.send(true);
    }else{
      res.send(false);
    }
  });

};