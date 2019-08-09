// JavaScript Document

var formato = "virtual";

function virtual(){
    document.getElementById("sucursal").classList.add("oculto");
	  document.getElementById("titleSucursal").classList.add("oculto");

    document.getElementById("tab-digital").classList.remove("tab-unselected");
    document.getElementById("tab-digital").classList.add("tab-selected");

    document.getElementById("tab-impreso").classList.add("tab-unselected");
    document.getElementById("tab-impreso").classList.remove("tab-selected");

    document.getElementById("sucursal").required = false;
    
    formato = "virtual";
}

function fisico(){
    document.getElementById("sucursal").classList.remove("oculto");
	  document.getElementById("titleSucursal").classList.remove("oculto");

    document.getElementById("tab-impreso").classList.remove("tab-unselected");
    document.getElementById("tab-impreso").classList.add("tab-selected");

    document.getElementById("tab-digital").classList.add("tab-unselected");
    document.getElementById("tab-digital").classList.remove("tab-selected");

    document.getElementById("sucursal").required = true;
    
    formato = "fisico";
}

function addClub(e){
    
    switch(formato){
        case "virtual":
            e.preventDefault();
            registroVirtual();
            break;
        case "fisico":
            e.preventDefault();
            registroFisico();
            break;
    }
}

//LISTAR GENEROS
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
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("genero").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );

//LISTAR LIBROS
fetch('/libro/listar', {
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
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("libro").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );

//LISTAR SUCURSALES
fetch('/sucursal/listarTodo', {
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
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombreSucursal']);
            opc.appendChild(textNode);

            document.getElementById("sucursal").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );