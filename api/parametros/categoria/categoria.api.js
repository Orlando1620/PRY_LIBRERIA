var Categoria = require('./categoria.model');
var mongoose = require('mongoose');


module.exports.listarCategorias = function (req, res) {
  Categoria.find().sort({ nombre: 'asc' })
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

module.exports.registrarCategoria = function (req, res) {
  var fechaRegistro = req.body.fechaRegistro;
  var nombre = req.body.nombre;

  var nuevaCategoria = new Categoria({
    _id: new mongoose.Types.ObjectId(),
    fechaRegistro: fechaRegistro,
    nombre: nombre
  });

  nuevaCategoria.save()
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

/**
* Extrae los libros de la base de datos, que coincidan con la busqueda
*/
module.exports.validarCategoria = function (req, res) {

  Categoria.find({ nombre: req.body.categoria }).exec()
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

/**
* Extrae los libros de la base de datos, que coincidan con la busqueda
*/
module.exports.filtrarCategoria = function (req, res) {

  Categoria.find({ nombre: req.body.categoria }).exec()
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

module.exports.eliminarCategoria = async function (req, res) {

  await Categoria.deleteOne(
    { _id: req.body.id }
  )
  res.json({ result: "exito" });
}

module.exports.modificarCategoria = async function (req, res) {
  try {
    var id = req.body.id;
    var nombre = req.body.nombre;

    var result = await Categoria.find({ nombre: nombre }).exec();

    if (result.length > 0) {
      res.json({ result: 'repetido' });
      return false;
    }

    await Categoria.updateOne(
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