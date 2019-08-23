if(sessionStorage.getItem("tipo") == "usuarioCliente" || sessionStorage.getItem("nombre") == null){
  document.getElementById("icons").classList.add("oculto");
}


var idSuc;
var nombreSuc;
function perfilSucursal(sucursal){
  var data ={
    sucursal : sucursal
  }
fetch('/sucursal/visualizar', {
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
        idSuc = json['_id'];
        nombreSuc = json['nombreSucursal'];
        document.getElementById('titulo').innerHTML = json['nombreSucursal'];
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

perfilSucursal(sessionStorage.getItem("idSuc"));
