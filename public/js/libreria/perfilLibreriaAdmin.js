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

perfilLibreria(sessionStorage.getItem('id'));
