var Impuesto = require('./impuesto.model');
var mongoose = require('mongoose');

module.exports.listarImpuesto = function(req, res) {
  Impuesto.find().exec()
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

module.exports.modificarImpuesto = async function(req, res) {
  try{
    var valor = req.body.valor;
    var id = req.body.id;

      await Impuesto.updateOne(
        { id: id},
        {
          $set: {
          valor : valor
          },
          $currentDate: { lastModified: true }
        }
      );
      res.json({result: 'exito'});
  } catch(err){
    console.log(err);
  }
}