if(sessionStorage.getItem("tipo") == "adminGlobal"){
  document.getElementById("nuevaSuc").classList.remove("oculto");
}

function nuevaSucursal(e){
  window.location.href = "registrar-sucursal.html";
}
//Fetch para listar autores
function perfilLibreria(pnombreLibreria){
  var data ={
    nombreLibreria : pnombreLibreria
  }
  fetch('/libreria/buscar', {
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
          document.getElementById('titulo').innerHTML = json['nombreFantasia'];
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

async function delLib(){
  try{
    var sucursal;
    var id;
  
    for(var i=0;i<sucursales.length;i++){
      sucursal = sucursales[i]["nombreSucursal"];
      id = sucursales[i]["_id"];
      
      var dataInv = {
        nombreSuc:sucursal
      }
      var inv = await fetch('/inventario/eliminarTodo', {
          method: 'POST',
          body: JSON.stringify(dataInv),
          headers:{'Content-Type': 'application/json'}
      });
  
      var dataSuc = {
          id:id
      }
      var suc = await fetch('/sucursal/eliminar', {
          method: 'POST',
          body: JSON.stringify(dataSuc),
          headers:{'Content-Type': 'application/json'}
      });
    }  
  

    var data = {
        libreria: sessionStorage.getItem("nombreLibreria")
    }

    await fetch('/libreria/eliminar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });

    window.location.href = "listar-librerias-adminGlobal.html";


  } catch(err){
      console.log('Ocurrió un error con la ejecución', err);
  }
}


perfilLibreria(sessionStorage.getItem("nombreLibreria"));
