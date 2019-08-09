var Autor = require('./autor.model');
var Libro = require("../libro/libro.model");
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

/**
 * Registra un nuevo autor en la base de datos
 */
module.exports.registrarAutor = function(req, res) {
  var nombre = req.body.nombre;
  var apellido1 = req.body.apellido1;
  var apellido2 = req.body.apellido2;
  var nac = req.body.nac;
  var bio = req.body.bio;
  var path = req.body.path;
 
  Autor.find({nombre:nombre,apellido1:apellido1,apellido2:apellido2}).exec()
  .then(
    function(result){

      if(result.length == 0){
        cloudinary.uploader.upload(path, { tags: 'basic_sample' })
        .then(
          function (image) {
            console.log(image);
            fs.unlinkSync(path);

            var nuevoAutor = new Autor({
              _id: new mongoose.Types.ObjectId(),
              nombre: nombre,
              apellido1: apellido1,
              apellido2: apellido2,
              nac: nac,
              bio: bio,
              imgUrl: image['url'],
              fechaRegistro: new Date()
            });
            
            nuevoAutor.save()
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
        })
        .catch(function (err) {
          console.log('error');
          console.log("** File Upload (Promise)");
          if (err) { console.warn(err); }
        });
      } else {
        res.json({result: 'repetido'});
      }
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}


module.exports.modificarAutor = async function(req, res) {
  try{
      var idAutor = req.body.idAutor;
      var nombreOrig = req.body.nombreOrig;
      var nombre = req.body.nombre;
      var apellido1 = req.body.apellido1;
      var apellido2 = req.body.apellido2;
      var nac = req.body.nac;
      var bio = req.body.bio;
      var path = req.body.path;
      var foto = req.body.foto;
    
      var result = await Autor.find({nombre:nombre,apellido1:apellido1,apellido2:apellido2}).exec(); 
      var nombreCompletoRes;
      if(result.length>0){
        for(var i=0;i<result.length;i++){
          nombreCompletoRes = result[i]["nombre"]+result[i]["apellido1"]+result[i]["apellido2"];
          console.log(nombreCompletoRes);
          if(nombreOrig != nombreCompletoRes){
            res.json({result: 'repetido'});
            return false;
          }
        }
      }

      if(foto){
        console.log(path);
        var image = await cloudinary.uploader.upload(path, { tags: 'basic_sample' });
        fs.unlinkSync(path);
        path = image['url'];
      }
      
      await Autor.updateOne(
        { _id: idAutor },
        {
          $set: { 
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            nac: nac,
            bio: bio,
            imgUrl: path 
          },
          $currentDate: { lastModified: true }
        }
      );
      res.json({result: 'exito'});
  } catch(err){
    console.log(err);
  }
}

/**
 * Extrae todos los autores de la base de datos
 */
module.exports.listarAutores = function(req, res) {
  Autor.find().sort({nombre: 'asc'})
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

module.exports.autorById = function(req, res) {
  var id = req.body.id;
  Autor.find({_id:id}).exec()
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

/**
 * Extrae los autores, que coincidan con la busqueda, de la base de datos
 */
module.exports.filtrarAutores = function(req, res) {
  var nombre = req.body.nombre;
  Autor.find({nombre:nombre}).exec()
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


module.exports.obtenerAutor = function (req, res) {
  Autor.findOne({ _id: req.body.id }).then(function (autor) {
      if (autor) {
          let autorId = autor["_id"];
          let libros = []
          Libro.find({autor:autorId}).then(function (respuesta) {
              if (respuesta) {
                  libros = respuesta;
              }
              autor.libros = libros;
              res.send(autor);
          })
         
      } else {
          res.send(autor);
      }
  })
};
