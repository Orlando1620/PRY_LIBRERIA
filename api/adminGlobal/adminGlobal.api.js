var mongoose = require('mongoose');
var AdminGlobal = require('./adminGlobal.model');
var nodemailer = require('nodemailer');

module.exports.registrarUsuario = function(req, res) {
  var tipoUsuario = req.body.tipoUsuario;
  var fechaRegistro = req.body.fechaRegistro;
  var nombre = req.body.nombre;
  var primerApellido = req.body.primerApellido;
  var segundoApellido = req.body.segundoApellido;
  var correo = req.body.correo;
  var contrasena = req.body.contrasena;
  var tipoIdentificacion = req.body.tipoIdentificacion;
  var identificacion = req.body.identificacion;

  AdminGlobal.find({correo: correo}).exec()
  .then(
    function(result){
      if(result.length == 0){
        AdminGlobal.find({identificacion: identificacion})
        .then(
          function(result){
            if(result.length == 0){
      
                var nuevoAdminGlobal = new AdminGlobal({
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
                  identificacion: identificacion
                });
                  
                
                nuevoAdminGlobal.save()
                .then(
                  function(result){
                    console.log(result); 
                    res.json({result:"exito"});
                  }
                )
                .catch(
                  function(err){
                    console.log(err);
                  }
                );
            } else {
              res.json({result:"idRepetido"});
            }
        })
        .catch(function (err) {
          console.log('error');
          console.log("** File Upload (Promise)");
          if (err) { console.warn(err); }
        });
      } else {
        res.json({result:"correoRepetido"});
      }
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}

module.exports.enviarContrasena = function(req,res){
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
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}

module.exports.checkCorreo = function(req, res) {
  var correo = req.body.correo;

  Usuario.find({correo: correo}).exec()
  .then(
    function(result){
      //console.log(result);
      res.json(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
}

module.exports.buscarAdminGlobal = function(req, res) {
  var id = req.body.id;
  AdminGlobal.findOne({_id:id}).exec()
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



