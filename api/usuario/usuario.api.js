
var mongoose = require('mongoose');
var Usuario = require('./usuario.model');

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



/**
 * Extrae los libros de la base de datos, que coincidan con la busqueda
 */
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


