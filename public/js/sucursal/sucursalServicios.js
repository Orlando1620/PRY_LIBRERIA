async function registro(nombreLibreria) {
  try {
    var data = {
      nombreSucursal: document.getElementById("nombreSucursal").value,
      telefono: document.getElementById("numeroSucursal").value,
      latitud: lat,
      longitud: lng,
      direccion: document.getElementById("dirExacta").value,
      provincia: document.getElementById("provincias").value,
      canton: document.getElementById("cantones").value,
      distrito: document.getElementById("distritos").value,
      nombreLibreria: nombreLibreria
    };

    var response = await fetch('/sucursal/add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    var json = await response.json();

    var msg = json["result"];

    switch (msg) {
      case "repetido":
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Una sucursal con el mismo nombre ya fue registrada";
        break;
      case "exito":
        registrarBitacora(sessionStorage.getItem("correo"), 'registro sucursal: ' + document.getElementById("nombreSucursal").value);
        sessionStorage.setItem("nombreLibreria", nombreLibreria);
        document.getElementById("alert-success").classList.remove("oculto");
        document.getElementById("msg-success").innerHTML = "Sucursal registrada";
        setTimeout(function () {
          window.location.href = "listar-sucursales-admin.html";
        }, 2000);

        break;
    }

  } catch (err) {
    console.log('Ocurrió un error con la ejecución', err);
  }

}

async function datosUsuario() {
  var data = {
    admin_id: sessionStorage.getItem("id")
  }
  return fetch('/libreria/libById', {
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
        var nombreLibreria;
        nombreLibreria = json["nombreComercial"];
        console.log(nombreLibreria);
        return nombreLibreria;
      }
    )
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}


/**
 * Registra la accion en la bitacora
 */
function registrarBitacora(correo, accion) {
  var data = {
    correo: correo,
    accion: accion,
    fecha: new Date()
  };
  fetch('/bitacora/add', {
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
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

async function actualizarSucursal(sucursal) {

  return await fetch('/sucursal/modificar', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sucursal)
  })

    .then(function (response) {
      if (response.status != 200)
        console.log('Error en el servicio: ' + response.status);
      else
        return response.json();
    })
    .then(function (response) {
      return response;
    })
    .catch(err => console.log('Error:', err));
};