
/**
 * Fetch para asignar los valores del select de idiomas
 */
fetch('/idioma/listar', {
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

            document.getElementById("idioma").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );

  /**
 * Fetch para asignar los valores del select de generos
 */
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

/**
 * Fetch para asignar los valores del select de categorias
 */
fetch('/categoria/listar', {
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

            document.getElementById("categoria").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );


var autores = [];
var pathPdf;
var pathImg;
var idLibro;
async function fillPerfil(id){

    var responseAutor = await fetch('/autor/listar', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    });
    var autorJson = await responseAutor.json();
    autores = autorJson;

    for(var i=0;i<autorJson.length;i++){
        var opc = document.createElement("option");
        var textNode = document.createTextNode(autorJson[i]['nombre']+" "+autorJson[i]['apellido1']+" "+autorJson[i]['apellido2']);
        opc.appendChild(textNode);
        opc.value = autorJson[i]["_id"];

        document.getElementById("autor").appendChild(opc);
    }

    var data = {
      id: id
    }
    fetch('/libro/perfil', {
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
            document.getElementById('nombre').value = json['nombre']; 

            document.getElementById('autor').value = json['autor']; 
            document.getElementById('idioma').value = json['idioma']; 
            document.getElementById('genero').value = json['genero']; 
            document.getElementById('categoria').value = json['categoria'];
            document.getElementById('desc').value = json['descripcion'];
            document.getElementById('isbn').value = json['isbn'];    

            idLibro = json['_id']; 
            pathImg = json['urlImg'];   

            if(json['formato'] == 'digital'){
              pathPdf = json['urlPdf'];    
            }

            if(json['formato'] == "impreso"){
                document.getElementById("impreso").click();
                
                document.getElementById("pdf-title").classList.add("oculto");
                document.getElementById("pdf-file").classList.add("oculto");

                document.getElementById("pdf").required = false;

                formato = 'impreso';
            }
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
}
  

fillPerfil(sessionStorage.getItem("idLibro"));

