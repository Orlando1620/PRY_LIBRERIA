var Clubes = require('./clubes.model');
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


module.exports.validarGeneroClubes = function (req, res) {
  var genero = req.body.genero;
  Clubes.find({ genero: genero }).exec()
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

module.exports.eliminarClub = async function (req, res) {

  await Clubes.deleteOne(
    { _id: req.body.id }
  )
  res.json({ result: "exito" });
}

module.exports.modificarClub = async function (req, res) {
  try {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var genero = req.body.genero;
    var tipo = req.body.tipo;

    var result = await Clubes.find({ nombre: nombre }).exec();
    console.log(result[0]);
    console.log(result[0]['_id']);
    if (result.length > 0) {
      if (result[0]['_id'] != id) {
        res.json({ result: 'repetido' });
        return false;
      }
    }
    console.log(genero);

    await Clubes.updateOne(
      { _id: id },
      {
        $set: {
          nombre: nombre,
          genero: genero,
          tipo: tipo
        },
        $currentDate: { lastModified: true }
      }
    );
    res.json({ result: 'exito' });
  } catch (err) {
    console.log(err);
  }
}
