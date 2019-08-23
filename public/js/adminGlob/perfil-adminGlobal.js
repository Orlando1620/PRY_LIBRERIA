var usuarioId;
var data = {
  id: sessionStorage.getItem("id")
}
fetch('/adminGlobal/buscar', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})
  .then(
    function (response) {
      if (response.status != 200)
        console.log('Ocurrió un error con el servicio: ' + response.status);
      else
        return response.json();
    }
  )
  .then(
    function (json) {
      usuarioId = json['_id'];
      var correo = document.getElementById('correo');
      correo.value = json['correo'];
      correo.classList.add('inputActualizar');
      correo.readOnly = true;
      var nombre = document.getElementById('nombre');
      nombre.value = json['nombre'];
      nombre.classList.add('inputActualizar');
      nombre.readOnly = true;
      var apellidos1 = document.getElementById('primerApellido');
      apellidos1.value = json['apellido1'];
      apellidos1.classList.add('inputActualizar');
      apellidos1.readOnly = true;
      var apellidos2 = document.getElementById('segundoApellido');
      apellidos2.value = json['apellido2'];
      apellidos2.classList.add('inputActualizar');
      apellidos2.readOnly = true;
      var identificacion = document.getElementById('identificacion');
      identificacion.value = json['identificacion'];
      identificacion.classList.add('inputActualizar');
      identificacion.readOnly = true;
      var tipoIdentificacion = document.getElementById('tipoIdentificacion');
      tipoIdentificacion.value = json['tipoIdentificacion'];


    }
  )
  .catch(
    function (err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );


function nuevoAdmin() {
  window.location.href = "registrarAdminGlobal.html";
}
function mostrarModificar(e) {
  var correo = document.getElementById('correo');
  correo.classList.remove('inputActualizar');
  correo.classList.add('inputActualizando');
  correo.readOnly = false;

  var nombre = document.getElementById('nombre');
  nombre.classList.remove('inputActualizar');
  nombre.classList.add('inputActualizando');
  nombre.readOnly = false;

  var apellidos1 = document.getElementById('primerApellido');
  apellidos1.classList.remove('inputActualizar');
  apellidos1.classList.add('inputActualizando');
  apellidos1.readOnly = false;

  var apellidos2 = document.getElementById('segundoApellido');
  apellidos2.classList.remove('inputActualizar');
  apellidos2.classList.add('inputActualizando');
  apellidos2.readOnly = false;

  var identificacion = document.getElementById('identificacion');
  identificacion.classList.remove('inputActualizar');
  identificacion.classList.add('inputActualizando');
  identificacion.readOnly = false;
  var boton = document.getElementById('guardarPerfilAG');
  boton.value = "Guardar";
  boton.removeAttribute("onclick");
  boton.addEventListener('click', modificarAdminGlobalBD);




}
function modificarAdminGlobalBD() {

  var nombre = document.getElementById("nombre").value;
  var apellido1 = document.getElementById("primerApellido").value;
  var apellido2 = document.getElementById("segundoApellido").value;
  var correo = document.getElementById("correo").value;
  var tipoIdentificacion = document.getElementById("tipoIdentificacion").value;
  var identificacion = document.getElementById("identificacion").value;
  id = usuarioId;

  var data = {
    id: id,
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2,
    correo: correo,
    tipoIdentificacion: tipoIdentificacion,
    identificacion: identificacion
  };

  fetch('/adminGlobal/modificarUsuarioAdminGlobal', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(
      function (response) {
        if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else
          return response.json();
      }
    )
    .then(
      function (json) {
        if (json.result == "exito") {
          sessionStorage.setItem("nombre", nombre);
          window.location.href = "perfil-adminGlobal.html";
        } else {
          document.getElementById("msg-pop-info").innerHTML = "Ocurrió un error no se pudo actualizar";
          document.getElementById("msgInfo").classList.remove("oculto");
        }
      }
    )
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );

}