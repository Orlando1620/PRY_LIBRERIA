var autores = [];
fetch('/autor/listar', {
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
        json.sort();
        for(var i=0;i<json.length;i++){
            autores.push(json[i]);

            var div = document.createElement("div");
            var img = document.createElement("img");
            var h4 = document.createElement("h4");

            img.src = json[i]['imgUrl'];


            var textNode = document.createTextNode(json[i]['nombre']+" "+json[i]['apellido1']+" "+json[i]['apellido2']);
            h4.appendChild(textNode);

            div.classList.add("card");
            img.classList.add("img-card");

            div.appendChild(img);
            div.appendChild(h4);

            document.getElementById("cards-cont").appendChild(div);
            div.setAttribute("name", 'autores');
            div.setAttribute("id", json[i]['_id']);
            div.setAttribute('onclick', 'verPerfilAutor(this)');
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );

function filtrar(){
    removeElements();
    var nombreReq = document.getElementById('buscar').value;
    nombreReq = nombreReq.toLowerCase();
    console.log(nombreReq);

    if(autores.length>0){
        var resultados = 0;
        for(var i=0;i<autores.length;i++){
        var nombreRes = autores[i]['nombre']+" "+autores[i]['apellido1']+" "+autores[i]['apellido2'];
        nombreRes = nombreRes.toLowerCase();
        
        console.log(nombreRes);
        if(nombreRes.includes(nombreReq)){
            resultados++;
            var div = document.createElement("div");
            var img = document.createElement("img");
            var h4 = document.createElement("h4");

            img.src = autores[i]['imgUrl'];


            var textNode = document.createTextNode(autores[i]['nombre']+" "+autores[i]['apellido1']+" "+autores[i]['apellido2']);
            h4.appendChild(textNode);

            div.classList.add("card");
            img.classList.add("img-card");

            div.appendChild(img);
            div.appendChild(h4);

            document.getElementById("cards-cont").appendChild(div);
            div.setAttribute("name", 'autores');
            div.setAttribute("id", autores[i]['_id']);
            div.setAttribute('onclick', 'verPerfilAutor(this)');
        }
        }
        if(resultados == 0){
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "No se encontraron resultados";
        } else {
        document.getElementById("alert").classList.add("oculto");
        }
    } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "No se encontraron resultados";
    }
}