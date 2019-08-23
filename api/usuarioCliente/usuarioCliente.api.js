var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var Usuario = require('./usuarioCliente.model');
var fs = require('fs');
var nodemailer = require('nodemailer');

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
}).single('foto');

/**
 * Upload de multer
 */
module.exports.localUploadImg = function (req, res) {
  upload(req, res, function (err) {
    console.log(req.file);
    res.send(req.file);
  })
}

/**
 * Sube la imagen a cloudinary
 * @returns informacion de la imagen subida a cloudinary
 */
module.exports.uploadImg = function (req, res) {
  var path = req.body.path;
  cloudinary.uploader.upload(path, { tags: 'basic_sample' })
    .then(function (image) {
      console.log(image);
      res.send(image);
    })
    .catch(function (err) {
      console.log('error');
      console.log("** File Upload (Promise)");
      if (err) { console.warn(err); }
    });
}

module.exports.registrarUsuario = function (req, res) {
  var tipoUsuario = req.body.tipoUsuario;
  var fechaRegistro = req.body.fechaRegistro;
  var nombre = req.body.nombre;
  var primerApellido = req.body.primerApellido;
  var segundoApellido = req.body.segundoApellido;
  var correo = req.body.correo;
  var contrasena = req.body.contrasena;
  var tipoIdentificacion = req.body.tipoIdentificacion;
  var identificacion = req.body.identificacion;
  var fechaNacimiento = req.body.fechaNacimiento;
  var sexo = req.body.sexo;
  var provincia = req.body.provincia;
  var canton = req.body.canton;
  var distrito = req.body.distrito;
  var direccionExacta = req.body.direccionExacta;
  var latitud = req.body.latitud;
  var longitud = req.body.longitud;
  var generosFav = req.body.generosFav;
  var clubes = req.body.clubes;
  var libros = req.body.libros;
  var librosFav = req.body.librosFav;
  var path = req.body.path;

  Usuario.find({ correo: correo }).exec()
    .then(
      function (result) {
        if (result.length == 0) {
          Usuario.find({ identificacion: identificacion })
            .then(
              function (result) {
                if (result.length == 0) {
                  cloudinary.uploader.upload(path, { tags: 'basic_sample' })
                    .then(function (image) {
                      console.log(image);
                      fs.unlinkSync(path);

                      var nuevoUsuario = new Usuario({
                        _id: new mongoose.Types.ObjectId(),
                        tipo: tipoUsuario,
                        fechaRegistro: fechaRegistro,
                        nombre: nombre,
                        apellido1: primerApellido,
                        apellido2: segundoApellido,
                        correo: correo,
                        contrasena: contrasena,
                        changePassword: false,
                        tipoIdentificacion: tipoIdentificacion,
                        identificacion: identificacion,
                        fechaNacimiento: fechaNacimiento,
                        sexo: sexo,
                        provincia: provincia,
                        canton: canton,
                        distrito: distrito,
                        direccionExacta: direccionExacta,
                        latitud: latitud,
                        longitud: longitud,
                        imgUrl: image['url'],
                        generosFav: generosFav,
                        clubes: clubes,
                        libros: libros,
                        librosFav: librosFav,
                        bloqueado: false
                      });


                      nuevoUsuario.save()
                        .then(
                          function (result) {
                            console.log(result);
                            res.json({ result: "exito" });
                          }
                        )
                        .catch(
                          function (err) {
                            console.log(err);
                          }
                        );
                    }
                    )
                } else {
                  res.json({ result: "idRepetido" });
                }
              })
            .catch(function (err) {
              console.log('error');
              console.log("** File Upload (Promise)");
              if (err) { console.warn(err); }
            });
        } else {
          res.json({ result: "correoRepetido" });
        }
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}


module.exports.enviarContrasena = function (req, res) {
  const output = `
        <html>
          <head>
              <style>
                  @import url(https://fonts.googleapis.com/css?family=Open+Sans);

                  body{
                      margin: 0;
                      background-image: url("https://images.unsplash.com/photo-1550399105-05c4a7641b02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80");
                  }
                  .font{
                      font-family: 'Open Sans', sans-serif;
                  }
                  h1{
                      font-family: 'Open Sans', sans-serif;
                  } 
                  p{
                      font-family: 'Open Sans', sans-serif;
                      font-size: 1.5rem;
                  }    
                  .title-cont{
                      background-color: #000000;
                      color: white;
                      padding: 10px;
                  }
                  .title-cont img{
                      width: 100px
                  }
                  .info-cont{
                      margin: 20px 20% 20px 20%;
                      padding: 20px;
                      background-color: white;
                      text-align: justify;
                  }
                  span{
                      color: #022600;
                      font-weight: bold;
                  }
              </style>
          </head>

          <body>
              <div class="title-cont">
                  <img src="https://res.cloudinary.com/imgproyecto1/image/upload/v1565212683/xrgzbsgrdd0pywxdkkdq.png">
              </div>
              <div class="info-cont">
                  <p><span>¡Bienvenido a Leer+!</span></p>
                  <p>Nos alegra que formes parte de nuestra comunidad. A continuación podrás encontrar tu contraseña para ingresar al sitio.</p>
                  <p><span>Contraseña: </span>${req.body.contrasena}</p>
              </div>
              
          </body>
        </html>
  `

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'servicio.leemas@gmail.com',
      pass: '123queso!'
    }
  });

  const mailOptions = {
    from: 'servicio.leemas@gmail.com', // sender address
    to: req.body.correo, // list of receivers
    subject: 'Bienvenido a Leer+', // Subject line
    html: output// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports.checkCorreo = function (req, res) {
  var correo = req.body.correo;

  Usuario.find({ correo: correo }).exec()
    .then(
      function (result) {
        //console.log(result);
        res.json(result);
      }
    )
    .catch(
      function (err) {
        console.log(err);
      }
    );
}

module.exports.perfil = function (req, res) {
  var id = req.body.id;
  Usuario.findOne({ _id: id }).exec()
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

module.exports.compra = async function (req, res) {
  try {
    var usuario = req.body.usuario;
    var libro = req.body.libro;
    var cantidad = req.body.cantidad;

    var result = await Usuario.findOne({ _id: usuario }).exec();
    var libros = result['libros'];
    var nuevosLibros = [];

    var agregar = true;
    for (var i = 0; i < libros.length; i++) {
      if (libros[i][0]['libro'] == libro) {
        agregar = false;
        var nuevoLibro = {
          libro: libro,
          intercambiable: libros[i][0]['intercambiable'],
          cantidad: parseInt(libros[i][0]['cantidad'], 10) + cantidad,
          calif: libros[i][0]['calif'],
          favorito: libros[i][0]['favorito']
        }
        nuevosLibros.push(nuevoLibro);
      } else {
        nuevosLibros.push(libros[i]);
      }
    }
    if (agregar) {
      nuevosLibros.push({
        libro: libro,
        intercambiable: true,
        cantidad: cantidad,
        calif: 0,
        favorito: false
      });
    }


    await Usuario.updateOne(
      { _id: usuario },
      {
        $set: {
          libros: nuevosLibros
        },
        $currentDate: { lastModified: true }
      }
    );

    const output = `<html>
      <head>
          <style>
          @import url(https://fonts.googleapis.com/css?family=Open+Sans);

        body{
            margin: 0;
            background-image: url("https://images.unsplash.com/photo-1550399105-05c4a7641b02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80");
        }
        .font{
            font-family: 'Open Sans', sans-serif;
        }
        h1{
            font-family: 'Open Sans', sans-serif;
        } 
        p{
            font-family: 'Open Sans', sans-serif;
            font-size: 1.5rem;
        }    
        .title-cont{
            background-color: #000000;
            color: white;
        }
        .title-cont img{
            width: 100px
        }
        .info-cont{
            overflow: auto;
            margin: 20px 20% 20px 20%;
            padding: 20px;
            background-color: white;
            text-align: justify;
        }
        span{
            color: #022600;
            font-weight: bold;
        }

        .table-titles{
            background-color: #487252; 
            border-bottom: solid 1px silver;
            color: white;
        }

        .table-titles td{
            padding: 10px;
            border-bottom: 1px solid silver;
        }

        .carrito{
            width: 100%;
            border-collapse: collapse;
        }

        .carrito td{
            padding: 10px;
            border-bottom: 1px solid silver;
        }

        .carrito img{
            width: 50px;
        }

        .carrito i{
            color: #487252;
        }

        .table-cont{
            float: left;
            width: 100%;
            margin: 20px 0;
            box-sizing: border-box;
        }

        
        .total-cont{
            overflow: auto;
            float: left;
            width: 100%;
            box-sizing: border-box;
        }

        .total-cont h2,h3{
            margin: 0;
        }

        .total-text-value-cont{
            float: left;
            width: 100%;
        }

        .total-text{
            float: left;
            padding: 5px;
            padding-left: 0;
        }

        .total-imp{
            float: left;
            width: 100%;
        }

        .total-imp p{
            font-size: 0.9rem;
        }

        .text{
            font-size: 1rem;
        }

        .total-value{
            float: left;
            padding: 5px;
        }
  
          </style>
      </head>
  
      <body class="font">
      <div class="title-cont">
          <img src="https://res.cloudinary.com/imgproyecto1/image/upload/v1565212683/xrgzbsgrdd0pywxdkkdq.png">
      </div>
      <div class="info-cont">
          <p><span>¡Gracias por tu compra!</span></p>
          <p class="text">A continuación podrás encontrar los detalles de tu orden y los enlaces para descargar tu libros.</p>
  
          <div class="table-cont">
              <table class="carrito font" id="table">
                  <tr id="mainTr" class="table-titles">
                      <td colspan="2"><a>Producto</a></td>
                      <td colspan="1"><a>Cantidad</a></td>
                      <td colspan="1"><a>Precio</a></td>
                  </tr>
                  ${req.body.compras}
                  
              </table>
          </div>
  
          <div class="total-cont">
              <div class="total-text-value-cont">
                  <div class="total-text"><h3>Subtotal de la orden</h3></div>
                  
                  <div class="total-value"><h3 id='subtotal'>${req.body.subtotal}</h3></div>
                  <div class="total-imp"><p id='imp'>IVA: ${req.body.imp}</p></div>
              </div>
  
              <div class="total-text-value-cont">
                  <div class="total-text"><h3>Total de la orden</h3></div>
                  
                  <div class="total-value"><h3 id='total'>${req.body.total}</h3></div>
              </div>
              
          </div>
  
          
  
          ${req.body.enlaces}          
  
      </div>
          
      </body>
  </html>`;

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'servicio.leemas@gmail.com',
        pass: '123queso!'
      }
    });

    const mailOptions = {
      from: 'servicio.leemas@gmail.com', // sender address
      to: req.body.correo, // list of receivers
      subject: '¡Gracias por tu compra!', // Subject line
      html: output// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });

    res.json({ result: 'exito' });
  } catch (err) {
    console.log(err);
  }
}

module.exports.califLibro = async function (req, res) {
  try {
    var usuario = req.body.usuario;
    var libro = req.body.libro;
    var calif = req.body.calif;

    var result = await Usuario.findOne({ _id: usuario }).exec();
    var libros = result['libros'];
    var nuevosLibros = [];

    for (var i = 0; i < libros.length; i++) {
      if (libros[i][0]['libro'] == libro) {
        var nuevoLibro = {
          libro: libro,
          intercambiable: libros[i][0]['intercambiable'],
          cantidad: parseInt(libros[i][0]['cantidad'], 10),
          calif: calif,
          favorito: libros[i][0]['favorito']
        }
        nuevosLibros.push(nuevoLibro);
      } else {
        nuevosLibros.push(libros[i]);
      }
    }


    await Usuario.updateOne(
      { _id: usuario },
      {
        $set: {
          libros: nuevosLibros
        },
        $currentDate: { lastModified: true }
      }
    );

    res.json({ result: 'exito' });
  } catch (err) {
    console.log(err);
  }
}

module.exports.modFavorito = async function(req, res) {
  try{
      var usuario = req.body.usuario;
      var libro = req.body.libro;
      var fav = req.body.fav;
    
      var result = await Usuario.findOne({_id:usuario}).exec(); 
      var libros = result['libros'];
      var nuevosLibros = [];

      for(var i=0;i<libros.length;i++){
        if(libros[i][0]['libro'] == libro){
          var nuevoLibro = {
            libro:libro,
            intercambiable: libros[i][0]['intercambiable'],
            cantidad: parseInt(libros[i][0]['cantidad'],10),
            calif: libros[i][0]['calif'],
            favorito: fav
          }
          nuevosLibros.push(nuevoLibro);
        } else {
          nuevosLibros.push(libros[i]);
        }
      }
      
      
      await Usuario.updateOne(
        { _id: usuario },
        {
          $set: { 
            libros:nuevosLibros
          },
          $currentDate: { lastModified: true }
        }
      );

      res.json({result: 'exito'});
  } catch(err){
    console.log(err);
  }
}

module.exports.actualizarCantidad = async function(req, res) {
  try{
      var usuario1 = req.body.usuario1;
      var usuario2 = req.body.usuario2;
      var libro1 = req.body.libro1;
      var libro2 = req.body.libro2;
      var opc = req.body.opc;
    
      var result = await Usuario.findOne({_id:usuario1}).exec(); 
      var libros = result['libros'];
      var nuevosLibros = [];

      for(var i=0;i<libros.length;i++){
        if(libros[i][0]['libro'] == libro1){
          if(opc){
            var nuevoLibro = {
              libro:libro1,
              intercambiable: libros[i][0]['intercambiable'],
              cantidad: parseInt(libros[i][0]['cantidad'],10) + 1,
              calif: libros[i][0]['calif'],
              favorito: libros[i][0]['favorito']
            }
          } else {
            var nuevoLibro = {
              libro:libro1,
              intercambiable: libros[i][0]['intercambiable'],
              cantidad: parseInt(libros[i][0]['cantidad'],10) - 1,
              calif: libros[i][0]['calif'],
              favorito: libros[i][0]['favorito']
            }
          }
          
          nuevosLibros.push(nuevoLibro);
        } else {
          nuevosLibros.push(libros[i]);
        }
      }
      
      
      await Usuario.updateOne(
        { _id: usuario1 },
        {
          $set: { 
            libros:nuevosLibros
          },
          $currentDate: { lastModified: true }
        }
      );


      var result = await Usuario.findOne({_id:usuario2}).exec(); 
      var libros = result['libros'];
      var nuevosLibros = [];

      for(var i=0;i<libros.length;i++){
        if(libros[i][0]['libro'] == libro2){
          if(opc){
            var nuevoLibro = {
              libro:libro2,
              intercambiable: libros[i][0]['intercambiable'],
              cantidad: parseInt(libros[i][0]['cantidad'],10) + 1,
              calif: libros[i][0]['calif'],   
              favorito: libros[i][0]['favorito']
            }
          } else {
            var nuevoLibro = {
              libro:libro2,
              intercambiable: libros[i][0]['intercambiable'],
              cantidad: parseInt(libros[i][0]['cantidad'],10) - 1,
              calif: libros[i][0]['calif'],
              favorito: libros[i][0]['favorito']
            }
          }
          
          nuevosLibros.push(nuevoLibro);
        } else {
          nuevosLibros.push(libros[i]);
        }
      }
      
      
      await Usuario.updateOne(
        { _id: usuario2 },
        {
          $set: { 
            libros:nuevosLibros
          },
          $currentDate: { lastModified: true }
        }
      );

      res.json({result: 'exito'});
  } catch(err){
    console.log(err);
  }
}

module.exports.modLibroIntercambio = async function (req, res) {
  try {
    var usuarioId = req.body.usuarioId;
    var libroId = req.body.libroId;
    var intercambio = req.body.intercambio;

    var result = await Usuario.findOne({ _id: usuarioId }).exec();
    var libros = result['libros'];
    console.log('libroId ', libroId);
    for (var i = 0; i < libros.length; i++) {
      if (libros[i][0]['libro'] == libroId) {
        console.log(intercambio);
        if (intercambio == 'true') {
          libros[i][0]['intercambiable'] = true;
        } else {
          libros[i][0]['intercambiable'] = false;
        }
        console.log(libros[i][0]['libro']);
        break;
      }
    }

    console.log(libros);
    await Usuario.updateOne(
      { _id: usuarioId },
      {
        $set: {
          libros: libros
        },
        $currentDate: { lastModified: true }
      }
    );

    res.json({ result: 'exito' });
  } catch (err) {
    console.log(err);
  }
}

module.exports.modificarUsuarioCliente = async function (req, res) {
  try {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var apellido1 = req.body.apellido1;
    var apellido2 = req.body.apellido2;
    var correo = req.body.correo;
    var tipoIdentificacion = req.body.tipoIdentificacion;
    var identificacion = req.body.identificacion;
    var fechaNacimiento = req.body.fechaNacimiento;
    var sexo = req.body.sexo;
    var provincia = req.body.provincia;
    var canton = req.body.canton;
    var distrito = req.body.distrito;
    var direccionExacta = req.body.direccionExacta;
    var latitud = req.body.latitud;
    var longitud = req.body.longitud;


    var result = await Usuario.find({ identificacion: identificacion }).exec();

    if (result.length > 1) {
      if (result[0]['_id'] != id) {
        res.json({ result: 'repetido' });
        return false;
      }
    }
    /*if (foto) {
      console.log(path);
      var image = await cloudinary.uploader.upload(path, { tags: 'basic_sample' });
      fs.unlinkSync(path);
      path = image['url'];
    }
    */
    await Usuario.updateOne(
      { _id: id },
      {
        $set: {
          nombre: nombre,
          apellido1: apellido1,
          apellido2: apellido2,
          correo: correo,
          tipoIdentificacion: tipoIdentificacion,
          identificacion: identificacion,
          fechaNacimiento: fechaNacimiento,
          sexo: sexo,
          provincia: provincia,
          canton: canton,
          distrito: distrito,
          direccionExacta: direccionExacta,
          longitud: longitud,
          latitud: latitud


        },
        $currentDate: { lastModified: true }
      }
    );
    res.json({ result: 'exito' });



  } catch (err) {
    console.log(err);
  }
}






