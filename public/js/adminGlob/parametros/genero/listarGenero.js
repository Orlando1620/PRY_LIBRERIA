var generos = [];

function listarGenero(){
   
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
          for(var i=0;i<json.length;i++){
              generos.push(json[i]);
              var ul = document.createElement("li");
              ul.type = "text";
              ul.value = json[i]['nombre'];
              ul.id ="listGenero"+i;
              
              
              var li = document.createElement("li");
              var textNode = document.createTextNode(json[i]['nombre']);
              li.appendChild(textNode);
              document.getElementById("listGenero").appendChild(li);
          }
        }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    
    );
}

listarGenero();
