'use strict';

let AdminLib = require('./adminLib.model');
let Libreria = require('../libreria/libreria.model');
var nodemailer = require('nodemailer');

module.exports.registrar_Admin = function (req, res) {
    AdminLib.findOne({ correo: req.body.correo }).then(function (user) {

        if (!user) {
            let nuevoAdminLib = new AdminLib({
                nombre: req.body.nombre,
                apellido1: req.body.apellido1,
                apellido2: req.body.apellido2,
                correo: req.body.correo,
                contrasena: req.body.contrasena,
                bloqueado: false,
                tipo: 'AdminLib',
                fechaNaci: req.body.fechaNaci,
                tipoIdentificacion: req.body.tipoIdentificacion,
                identificacion: req.body.numberIdentificacion,
                tipoSexo: req.body.tipoSexo,

            });
        
            let nuevaLib = new Libreria({
                nombre: req.body.nombre,
                nombreComercial: req.body.nombreComercial,
                nombreFantasia: req.body.nombreFantasia,
                tipo: 'lib',
                latitud: req.body.latitud,
                longitud: req.body.longitud,
                provincia: req.body.provincia,
                canton: req.body.canton,
                distrito: req.body.distrito,
                direccion: req.body.direccion,
                telefono: req.body.telefono
            });
         
            if (nuevaLib.latitud == 0 && nuevaLib.longitud == 0) {
                res.json({ codigo: 'mapaNoSelect' });

            } else {
                nuevoAdminLib.save(function (error, admin) {
                    if (error) {
                        console.log(error);
                        res.json({ codigo: 'errorADmin' });
                    } else {

                        nuevaLib.admin_id = admin.id

                        nuevaLib.save(function (error, response) {
                            if (error) {
                                res.json({codigo:'errorLib'});
                            } else {
                                res.json({codigo: 'exitoso'});
                            }
                        });
                        // res.json({ success: true, msg: 'El producto ' });
                    }
                });
            }


        } else {
            res.json({ codigo: 'CORREO_DUPLI' });
        }

    })
};

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

module.exports.perfil = function(req, res){
    var id = req.body.id;
    AdminLib.find({_id: id}).exec()
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
module.exports.modificarUsuarioAdminLib = async function (req, res) {
    try {
        var id = req.body.id;
        var nombre = req.body.nombre;
        var apellido1 = req.body.apellido1;
        var apellido2 = req.body.apellido2;
        var correo = req.body.correo;
        var fechaNaci = req.body.fechaNaci;
        var tipoSexo = req.body.tipoSexo;
        var tipoIdentificacion = req.body.tipoIdentificacion;
        var identificacion = req.body.identificacion;
        console.log(req.body);

        var result = await AdminLib.find({ identificacion: identificacion }).exec();



        if (result.length > 0) {
            if (result[0]['_id'] != id) {
                res.json({ result: 'repetido' });
                return false;
            }
        }
        await AdminLib.updateOne(
            { _id: id },
            {
                $set: {
                    nombre: nombre,
                    apellido1: apellido1,
                    apellido2: apellido2,
                    fechaNaci: fechaNaci,
                    tipoSexo: tipoSexo,
                    correo: correo,
                    tipoIdentificacion: tipoIdentificacion,
                    identificacion: identificacion
                },
                $currentDate: { lastModified: true }
            }
        );
        res.json({ result: 'exito' });



    } catch (err) {

        console.log(err);
    }
}