
fetch('/roles/listar', {
  method: 'GET',
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
      console.log(json);
      for (var i = 0; i < json.length; i++) {
        var opc = document.createElement("option");
        var textNode = document.createTextNode(json[i]['nombre']);
        opc.appendChild(textNode);

        document.getElementById("roles").appendChild(opc);
      }
    }
  )
  .catch(
    function (err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );