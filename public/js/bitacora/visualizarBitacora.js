//Fetch para listar bitacora
fetch('/bitacora/listar', {
    method: 'GET',
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
        json.sort(function(a, b){return a.fecha - b.fecha});
        for(var i=0;i<json.length;i++){
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            var td3 = document.createElement("td");


            var textTd1 = document.createTextNode(json[i]['correo']);
            var textTd2 = document.createTextNode(json[i]['accion']);
            var date = new Date(json[i]['fecha']);
            var textTd3 = document.createTextNode(date.toLocaleDateString());

            td1.appendChild(textTd1);
            td2.appendChild(textTd2);
            td3.appendChild(textTd3);

            td2.colSpan = 2;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);

            document.getElementById("maintable").appendChild(tr);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );