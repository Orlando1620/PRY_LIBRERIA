
fetch('/identificacion/listar', {
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
        console.log(json);
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("tipoIdentificacion").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );



fetch('/sexo/listar', {
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
        console.log(json);
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("sexo").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );

fetch('/genero/listar', {
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
        console.log(json);
          generoLength = json.length;
        for(var i=0;i<json.length;i++){
            arrayGeneros= json;
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = json[i]['nombre'];
            checkbox.id ="genero"+i;
            
            var div = document.createElement("div");
            div.classList.add("form-tercio");

            
            var label = document.createElement("label");
            var textNode = document.createTextNode(json[i]['nombre']);
            label.appendChild(textNode);
            

            div.appendChild(checkbox);
            div.appendChild(label);
            document.getElementById("genero").appendChild(div);

            //document.getElementById("genero").appendChild(label);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );



