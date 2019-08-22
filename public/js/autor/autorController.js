/**
 * Funcion para el registro de un libro
 **/
async function addAutor(e) {
  e.preventDefault();

  var esValido = validarCamposFormulario("form");
  if (esValido == false || validarForm() == false) {
    document.getElementById("alert").classList.remove("oculto");
    document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
    return false;
  } else {
    if (validarFecha()) {
      document.getElementById("alert").classList.add("oculto");
      registro();
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Fecha actual o en el futuro no es válida";
    }
  }
}

function validarFecha() {
  var fecha = new Date(document.getElementById('nac').value);
  var hoy = new Date();
  if (hoy <= fecha) {
    return false;
  } else {
    return true;
  }
}


function validarForm() {
  var bio = document.getElementById('bio').value;

  if (bio == "") {
    document.getElementById("bio").classList.add('invalid');
    return false;
  } else {
    document.getElementById("bio").classList.remove('invalid');
    return true;
  }

}


async function modAutor(e) {
  e.preventDefault();

  var esValido = validarCamposFormulario("form");
  if (esValido == false || validarForm() == false) {
    document.getElementById("alert").classList.remove("oculto");
    document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
    return false;
  } else {
    if (validarFecha()) {
      document.getElementById("alert").classList.add("oculto");
      modificar();
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Fecha actual o en el futuro no es válida";
    }
  }
}

function eliminarAutor() {

  try {
    var autorInput = document.getElementById("eliminarAutorInput").value;

    var data = {
      autor: autorInput
    };
    var dataAutor = {
      id: autorInput
    };
    fetch('/libro/validarAutLibros', {
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
          if (json.length == 0) {
            eliminarAutorNoAsociado(dataAutor);
          } else {
            alert("no se puede eliminar el autor porque hay libros asociados a el primero elimine los libros")
          }
        }
      )
      .catch(
        function (err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );

  } catch (err) {
    console.log('Ocurrió un error con la ejecución', err);
  }
}

function eliminarAutorNoAsociado(data) {
  fetch('/autor/del', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  });
  window.location.href = "listar-autores-admin.html";
  alert("autor eliminado");
}