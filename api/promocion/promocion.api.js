var Promocion = require('./promocion.model');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var fs = require('fs');

//Configuracion de multer
var multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req,file,cb){
    cb(null,file.originalname);
  }
});
const upload = multer({
  storage: storage
}).single('foto');

/**
 * Upload de multer
 */
module.exports.localUploadImg = function (req, res) {
  upload(req, res, function(err){
    console.log(req.file);
    res.send(req.file);
  })
}

module.exports.registrarPromocion = async function(req, res) {
  try{
    var libro = req.body.libro;
    var sucursal = req.body.sucursal;
    var porcentaje = req.body.porcentaje;
    var fechaInicio = req.body.fechaInicio;
    var fechaFinaliza = req.body.fechaFinaliza;
    var path = req.body.path;


    var promos = await Promocion.find({sucursal:sucursal,libro:libro}).exec();
    if(promos.length == 0){
      var image = await cloudinary.uploader.upload(path, { tags: 'basic_sample' })
      console.log(image);
      fs.unlinkSync(path);

      var nuevaPromocion = new Promocion({
        _id: new mongoose.Types.ObjectId(),
        sucursal:sucursal,
        libro: libro,
        porcentaje: porcentaje,
        fechaInicio: fechaInicio,
        fechaFinaliza: fechaFinaliza,
        imgUrl:image['url']
      });

      await nuevaPromocion.save()
      res.json({result: "exito"});
      console.log(result);

    } else {
      res.json({result: "repetido"});
    }

  } catch(err){
    console.log(err);
  }
}

module.exports.listarPromo = function (req, res) {
  Promocion.find().exec()
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
