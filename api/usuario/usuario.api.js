var mongoose = require('mongoose');
var Usuario = require('./usuario.model');
var nodemailer = require('nodemailer');

module.exports.iniciar_sesion = function(req, res){
    
  Usuario.findOne({correo: req.body.correo}).then(function(user){
      console.log(req.body.correo);
      console.log(user);
      //debugger;
      if(user){
          if (user.contrasena == req.body.contrasena) {
              res.send(user);
          }
          else {
              console.log(user + " primer else");
              res.send('NO ENCONTRO EL PASSWORD'); 
          }
      }else{
          console.log(user + "segundo else");
          console.log(user);
          res.send('NO ENCONTRO EL EMAIL'); 
      }
  })
};

module.exports.perfil = function(req, res){
    
  Usuario.findOne({_id:req.body.id}).exec()
  .then(
    function(result){
      console.log('tipo'+result);
      res.send(result);
    }
  )
  .catch(
    function(err){
      console.log(err);
    }
  );
};

module.exports.listarUsuario = function (req, res) {
  Usuario.find().exec()
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
};

module.exports.filtrarTipo = function (req, res) {
  var rol = req.body.rol;
  console.log(rol);

  switch (rol) {
    case "Todos":

      Usuario.find().exec()
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
      break;
    case "Usuario cliente":

      Usuario.find({ tipo: "usuarioCliente" }).exec()
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
      break;

    case "Usuario administrador global":

      Usuario.find({ tipo: "adminGlobal" }).exec()
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
      break;

    case "Usuario administrador de libreria":

      Usuario.find({ tipo: "AdminLib" }).exec()
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
      break;
  }


}

module.exports.filtrarUsuario = function (req, res) {

  Usuario.find({ nombre: req.body.usuario }).exec()
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

module.exports.recuperarContrasena = async function(req, res) {
  try{
      var usuario = await Usuario.find({correo: req.body.correo});
      if(usuario.length>0){
        var id = usuario[0]["_id"];
        
        await Usuario.updateOne(
          { _id: id },
          {
            $set: { 
              contrasena: req.body.contrasena
            },
            $currentDate: { lastModified: true }
          }
        );

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
                    <p><span>¿Olvidaste tu contraseña?</span></p>
                    <p>Ingresa al sitio con la siguiente contraseña.</p>
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
          subject: '¿Olvidaste tu contraseña?', // Subject line
          html: output// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
        });
      }

      res.json({result: 'exito'});
  } catch(err){
    console.log(err);
  }
}

  
  

