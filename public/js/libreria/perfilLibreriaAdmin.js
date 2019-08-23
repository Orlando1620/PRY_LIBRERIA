//Fetch para listar autores
function perfilLibreria(admin_id){
  var data ={
    admin_id : admin_id
  }
  fetch('/libreria/libById', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
    })
    .then(
      function(response) {
        if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else
          return response.json();
      }
    )
    .then(
        function(json){
          document.getElementById('nombreComercial').innerHTML += json['nombreComercial'];
          document.getElementById('nombreFantasia').innerHTML += json['nombreFantasia'];
          document.getElementById('numeroLibreria').innerHTML += json['telefono'];
          document.getElementById('direccionLibreria').innerHTML += json['provincia'] + ", " + json['canton'] + ", "+ json['distrito'] + ", "+ json['direccion'] + ".";
          var lat = json['latitud'];
          var lng = json['longitud'];
          var coords = {lat,lng};
          addMarker(coords);
          centerMap(coords);
        }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

var sucursales = [];
async function listarSucursal(){

  var data = {
    nombreLibreria: sessionStorage.getItem('nombreLibreria')
  }
  fetch('/sucursal/listar', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
    })
    .then(
      function(response) {
        if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else
          return response.json();
      }
    )
    .then(
        function(json){
          for(var i=0;i<json.length;i++){
              sucursales.push(json[i]);
          }
        }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}
listarSucursal();

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
    window.location.href = "perfil-lib-admin.html";


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

perfilLibreria(sessionStorage.getItem('id'));
