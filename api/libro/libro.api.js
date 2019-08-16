var Libro = require('./libro.model');
var ClubLectura = require('../clubes/clubes.model');
var Promociones = require('../promocion/promocion.model');
var Inventarios = require('../inventario/inventario.model');
var Ventas = require('../venta/venta.model');
var ISBN = require('isbn-validate');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var fs = require('fs');

//Configuracion de multer
var multer = require('multer');
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage
}).fields([{
  name: 'portada', maxCount: 1
}, {
  name: 'pdf', maxCount: 1
}]);
/**
 * Upload de multer img
 */
module.exports.localUpload = function (req, res) {
  upload(req, res, function (err) {
    console.log(req.file);
    res.send(req.file);
  })
}

/**
 * Registra un nuevo libro en la base de datos
 */
module.exports.registrarLibroDigital = function (req, res) {
  var nombre = req.body.nombre;
  var isbn = req.body.isbn;
  var idioma = req.body.idioma;
  var autor = req.body.autor;
  var genero = req.body.genero;
  var categoria = req.body.categoria;
  var desc = req.body.desc;
  var pathImg = req.body.pathImg;
  var pathPdf = req.body.pathPdf;

  Libro.find({ isbn: isbn }).exec()
    .then(
      function (result) {
        if (result.length == 0) {
          cloudinary.uploader.upload(pathImg, { tags: 'basic_sample' })
            .then(
              function (image) {
                console.log(image);
                fs.unlinkSync(pathImg);
                cloudinary.uploader.upload(pathPdf, { tags: 'basic_sample' })
                  .then(
                    function (pdf) {
                      console.log(pdf);
                      fs.unlinkSync(pathPdf);
                      var nuevoLibro = new Libro({
                        _id: new mongoose.Types.ObjectId(),
                        nombre: nombre,
                        isbn: isbn,
                        idioma: idioma,
                        autor: autor,
                        genero: genero,
                        categoria: categoria,
                        descripcion: desc,
                        urlImg: image['url'],
                        urlPdf: pdf['url'],
                        fechaRegistro: new Date(),
                        formato: 'digital',
                        calificacion: 0
                      });

                      nuevoLibro.save()
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
                    })
              })
        } else {
          res.json({ result: 'repetido' });
        }
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}

module.exports.registrarLibroImpreso = function (req, res) {
  var nombre = req.body.nombre;
  var isbn = req.body.isbn;
  var idioma = req.body.idioma;
  var autor = req.body.autor;
  var genero = req.body.genero;
  var categoria = req.body.categoria;
  var desc = req.body.desc;
  var pathImg = req.body.pathImg;

  Libro.find({ isbn: isbn }).exec()
    .then(
      function (result) {
        if (result.length == 0) {
          cloudinary.uploader.upload(pathImg, { tags: 'basic_sample' })
            .then(
              function (image) {
                console.log(image);
                fs.unlinkSync(pathImg);

                var nuevoLibro = new Libro({
                  _id: new mongoose.Types.ObjectId(),
                  nombre: nombre,
                  isbn: isbn,
                  idioma: idioma,
                  autor: autor,
                  genero: genero,
                  categoria: categoria,
                  descripcion: desc,
                  urlImg: image['url'],
                  fechaRegistro: new Date(),
                  formato: 'impreso',
                  calificacion: 0
                });

                nuevoLibro.save()
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
              })
        } else {
          res.json({ result: 'repetido' });
        }
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}

module.exports.modificarLibroDigital = async function (req, res) {
  var idLibro = req.body.idLibro;
  var nombre = req.body.nombre;
  var isbn = req.body.isbn;
  var idioma = req.body.idioma;
  var autor = req.body.autor;
  var genero = req.body.genero;
  var categoria = req.body.categoria;
  var desc = req.body.desc;
  var pathImg = req.body.pathImg;
  var pathPdf = req.body.pathPdf;
  var portada = req.body.portada;
  var pdf = req.body.pdf;

  var result = await Libro.find({ isbn: isbn }).exec();
  // var nombreCompletoRes;
  // if(result.length>0){
  //   for(var i=0;i<result.length;i++){
  //     nombreCompletoRes = result[i]["isbn"];
  //     console.log(nombreCompletoRes);
  //     if(nombreOrig != nombreCompletoRes){
  //       res.json({result: 'repetido'});
  //       return false;
  //     }
  //   }
  // }

  if (portada && pdf) {
    var image = await cloudinary.uploader.upload(pathImg, { tags: 'basic_sample' });
    fs.unlinkSync(pathImg);
    pathImg = image['url'];
    var pdfUpload = await cloudinary.uploader.upload(pathPdf, { tags: 'basic_sample' });
    fs.unlinkSync(pathPdf);
    pathPdf = pdfUpload['url'];
  }
  if (!portada && pdf) {
    var pdfUpload = await cloudinary.uploader.upload(pathPdf, { tags: 'basic_sample' });
    fs.unlinkSync(pathPdf);
    pathPdf = pdfUpload['url'];
  }
  if (portada && !pdf) {
    var image = await cloudinary.uploader.upload(pathImg, { tags: 'basic_sample' });
    fs.unlinkSync(pathImg);
    pathImg = image['url'];
  }

  await Libro.updateOne(
    { _id: idLibro },
    {
      $set: {
        nombre: nombre,
        isbn: isbn,
        idioma: idioma,
        autor: autor,
        genero: genero,
        categoria: categoria,
        descripcion: desc,
        urlImg: pathImg,
        urlPdf: pathPdf,
        formato: 'digital'
      },
      $currentDate: { lastModified: true }
    }
  );
  res.json({ result: 'exito' });
}

module.exports.modificarLibroImpreso = async function (req, res) {
  try {
    var idLibro = req.body.idLibro;
    var nombre = req.body.nombre;
    var isbn = req.body.isbn;
    var idioma = req.body.idioma;
    var autor = req.body.autor;
    var genero = req.body.genero;
    var categoria = req.body.categoria;
    var desc = req.body.desc;
    var pathImg = req.body.pathImg;
    var portada = req.body.portada;

    var result = await Libro.find({ isbn: isbn }).exec();
    // var nombreCompletoRes;
    // if(result.length>0){
    //   for(var i=0;i<result.length;i++){
    //     nombreCompletoRes = result[i]["isbn"];
    //     console.log(nombreCompletoRes);
    //     if(nombreOrig != nombreCompletoRes){
    //       res.json({result: 'repetido'});
    //       return false;
    //     }
    //   }
    // }


    if (portada) {
      var image = await cloudinary.uploader.upload(pathImg, { tags: 'basic_sample' });
      fs.unlinkSync(pathImg);
      pathImg = image['url'];
    }

    await Libro.updateOne(
      { _id: idLibro },
      {
        $set: {
          nombre: nombre,
          isbn: isbn,
          idioma: idioma,
          autor: autor,
          genero: genero,
          categoria: categoria,
          descripcion: desc,
          urlImg: pathImg,
          formato: 'impreso'
        },
        $currentDate: { lastModified: true }
      }
    );
    res.json({ result: 'exito' });

  } catch (err) {
    console.log(err);
  }

}

/**
 * Revisa que el formato del ISBN sea correcto
 */
module.exports.validarISBN = function (req, res) {
  var isbn = req.body.isbn;
  if (ISBN.Validate(isbn)) {
    res.send(true);
  } else {
    res.send(false);
  }
}

/**
 * Extrae todos los libros de la base de datos
 */
module.exports.listarLibros = function (req, res) {
  Libro.find().sort({ nombre: 'asc' })
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

module.exports.filtrarLibrosGenCat = function (req, res) {
  var gen = req.body.gen;
  var cat = req.body.cat;
  if (gen == "Generos" && cat != "Categorias") {
    console.log("cat");
    Libro.find({ categoria: cat }).exec()
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
  } else {
    if (cat == "Categorias" && gen != "Generos") {
      console.log("gen");
      Libro.find({ genero: gen }).exec()
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
    } else {
      if (cat != "Categorias" && gen != "Generos") {
        console.log("catgen");
        Libro.find({ genero: gen, categoria: cat }).exec()
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
      } else {
        console.log("none");
        Libro.find().exec()
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
    }
  }

}

module.exports.perfilLibro = function (req, res) {
  var id = req.body.id;
  Libro.findOne({ _id: id }).exec()
    .then(
      function (result) {
        console.log(result);
        res.send(result);
      }
    )
}


module.exports.verificarAsociacionLibro = function (req, res) {
  var nombreLibro = req.body.nombreLibro;
  var idLibro = req.body.id;

  ClubLectura.findOne({ libro: nombreLibro }).then(function (club) {
    if (club) {
      res.send(true);
    } else {
      Promociones.findOne({ libro: idLibro }).then(function (promo) {
        if (promo) {
          res.send(true);
        } else {
          Inventarios.findOne({ libro: idLibro }).then(function (inve) {
            if (inve) {
              res.send(true);
            } else {
              Ventas.findOne({ libro: idLibro }).then(function (ven) {
                if (ven) {
                  res.send(true);
                } else {
                  res.send(false);
                }
              })
            }
          })
        }
      })
    }
  })

}

module.exports.deleteLibro = function (req, res) {
  Libro.findByIdAndDelete(req.body.id).then(libro => {
    if (libro) {
      res.send(true);
    } else {
      res.send(false);
    }
  });

}
