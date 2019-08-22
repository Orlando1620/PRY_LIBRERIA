var Genero = require('./genero.model');
var mongoose = require('mongoose');

module.exports.listarGeneros = function (req, res) {
  Genero.find().sort({ nombre: 'asc' })
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

module.exports.registrarGenero = function (req, res) {
  var fechaRegistro = req.body.fechaRegistro;
  var nombre = req.body.nombre;


  var nuevoGenero = new Genero({
    _id: new mongoose.Types.ObjectId(),
    fechaRegistro: fechaRegistro,
    nombre: nombre
  });

  nuevoGenero.save()
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
}

module.exports.eliminarGenero = async function (req, res) {

  await Genero.deleteOne(
    { _id: req.body.id }
  )
  res.json({ result: "exito" });
}

module.exports.modificarGenero = async function (req, res) {
  try {
    var id = req.body.id;
    var nombre = req.body.nombre;

    var result = await Genero.find({ nombre: nombre }).exec();

    if (result.length > 0) {
      res.json({ result: 'repetido' });
      return false;
    }

    await Genero.updateOne(
      { _id: id },
      {
        $set: {
          nombre: nombre
        },
        $currentDate: { lastModified: true }
      }
    );
    res.json({ result: 'exito' });
  } catch (err) {
    console.log(err);
  }
}
