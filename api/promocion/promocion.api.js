var Promocion = require('./promocion.model');
var mongoose = require('mongoose');


module.exports.registrarPromocion = function(req, res) {
  var libroPromo = req.body.libroPromo;
  var porcentaje = req.body.porcentaje;
  var fechaInicio = req.body.fechaInicio;
  var fechaFinaliza = req.body.fechaFinaliza;

  var nuevaPromocion = new Promocion({
   _id: new mongoose.Types.ObjectId(),
     libroPromo: libroPromo,
     porcentaje: porcentaje,
     fechaInicio: fechaInicio,
     fechaFinaliza: fechaFinaliza
     });

        nuevaPromocion.save()
        .then(
          function(result){
            res.json({result: "exito"});
            console.log(result);
          }
        )
        .catch(
          function(err){
            console.log(err);
          }
        );
      }
