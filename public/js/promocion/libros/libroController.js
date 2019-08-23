function fillInventario() {
  var list = document.getElementById("libroPromo");
  removeElements(list);
  var option = document.createElement("option");

  var nombre = document.createTextNode("Selecionar libro");
  option.appendChild(nombre);

  document.getElementById('libroPromo').appendChild(option);
  var data = {
    nombreSuc:document.getElementById('sucursales').value
  }
  fetch('/inventario/listar', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
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
        function(json) {
          console.log("Hola");
          for (var i = 0; i < json.length; i++) {
            console.log("Error");

            var option = document.createElement("option");

            var nombre = document.createTextNode(json[i]['libro']);
            option.appendChild(nombre);

            document.getElementById('libroPromo').appendChild(option);
          }
        }
      )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

fillInventario();
function removeElements(list){
    while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
    }
}
