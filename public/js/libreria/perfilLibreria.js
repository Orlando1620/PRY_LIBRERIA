if (sessionStorage.getItem("tipo") == "adminGlobal") {
  document.getElementById("nuevaSuc").classList.remove("oculto");
}

var suc;

window.onload = function () {

}

function nuevaSucursal(e) {
  window.location.href = "registrar-sucursal.html";
}
//Fetch para listar autores
function perfilLibreria(pnombreLibreria) {
  var data = {
    nombreLibreria: pnombreLibreria
  }
  fetch('/libreria/buscar', {
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
      async function (json) {
        document.getElementById('titulo').innerHTML = json['nombreFantasia'];
        document.getElementById('numeroLibreria').innerHTML += json['telefono'];
        document.getElementById('direccionLibreria').innerHTML += json['provincia'] + ", " + json['canton'] + ", " + json['distrito'] + ", " + json['direccion'] + ".";
        suc = await marcador(pnombreLibreria);
        for (var i = 0; i < suc.length; i++){
          var lat = suc[i].latitud;
          var lng = suc[i].longitud;
          var coords = {lat,lng};
          addMarker(coords);
          centerMap(coords);
        }
      }
    )
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

async function marcador(pnombreLibreria) {

  var data = {
    nombreLibreria: pnombreLibreria
  }
  let sucursales = await fetch('/libreria/obtener', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
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
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
    return sucursales;
}

async function delLib() {
  try {
    var sucursal;
    var id;

    for (var i = 0; i < sucursales.length; i++) {
      sucursal = sucursales[i]["nombreSucursal"];
      id = sucursales[i]["_id"];

      var dataInv = {
        id: id
      }
      await fetch('/inventario/eliminarTodo', {
        method: 'POST',
        body: JSON.stringify(dataInv),
        headers: { 'Content-Type': 'application/json' }
      });

      var dataSuc = {
        id: id
      }
      await fetch('/promocion/eliminar', {
        method: 'POST',
        body: JSON.stringify(dataSuc),
        headers: { 'Content-Type': 'application/json' }
      });

      var dataSuc = {
        id: id
      }
      await fetch('/sucursal/eliminar', {
        method: 'POST',
        body: JSON.stringify(dataSuc),
        headers: { 'Content-Type': 'application/json' }
      });
    }


    var data = {
      libreria: sessionStorage.getItem("nombreLibreria")
    }

    await fetch('/libreria/eliminar', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    registrarBitacora(sessionStorage.getItem("correo"), 'eliminación de librería: ' + sessionStorage.getItem("nombreLibreria"));
    window.location.href = "listar-librerias-adminGlobal.html";


  } catch (err) {
    console.log('Ocurrió un error con la ejecución', err);
  }
}

function popDel() {
  document.getElementById("pop-up").classList.remove("oculto");
  document.getElementById("msg-pop").innerHTML = "¿Desea eliminar esta librería?";
}

function aceptar() {
  document.getElementById("pop-up").classList.add("oculto");
  delLib();
}

function cancelar() {
  document.getElementById("pop-up").classList.add("oculto");
}

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

perfilLibreria(sessionStorage.getItem("nombreLibreria"));
