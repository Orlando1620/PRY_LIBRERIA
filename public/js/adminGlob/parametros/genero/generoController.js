
async function registrarGenero(){
    try{
        var nombreGenero = document.getElementById('genero').value;
        var nombreReq = nombreGenero.toLowerCase();

            var existe = false;
            for(var i=0;i<generos.length;i++){
                var nombreRes = generos[i]['nombre'];
                nombreRes = nombreRes.toLowerCase();
                
                if(nombreRes == nombreReq){
                    existe = true;
                }
            }
            if(existe == false){
                var data = {
                    fechaRegistro: new Date(),
                    nombre: nombreGenero
                };
            
                await fetch('/genero/add',{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{'content-Type': 'application/json'}
                })
                document.getElementById("alertGen").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"),"registro género: "+nombreGenero);
                window.location.href = "parametros.html";
            } else {
                document.getElementById("alertGen").classList.remove("oculto");
                document.getElementById("msgGen").innerHTML = "Este género ya existe";
            }
    } catch(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

function filtrarGenero(){
    removeElementsGenero();
    var nombreReq = document.getElementById('buscarGen').value;
    nombreReq = nombreReq.toLowerCase();
    
    if(generos.length>0){
        var resultados = 0;
        for(var i=0;i<generos.length;i++){
          var nombreRes = generos[i]['nombre'];
          nombreRes = nombreRes.toLowerCase();
          
          console.log(nombreRes);
          if(nombreRes.includes(nombreReq)){
            resultados++;
            var li = document.createElement("li");
            var textNode = document.createTextNode(generos[i]['nombre']);
            li.appendChild(textNode);
            document.getElementById("listGenero").appendChild(li);
          }
        }
        if(resultados == 0){
            document.getElementById("alertGen").classList.remove("oculto");
            document.getElementById("msgGen").innerHTML = "No se encontraron resultados";
        } else {
            document.getElementById("alertGen").classList.add("oculto");
        }
    } else {
        document.getElementById("alertGen").classList.remove("oculto");
        document.getElementById("msgGen").innerHTML = "No se encontraron resultados";
    }
}


function removeElementsGenero(){
    var list = document.getElementById("listGenero");
    console.log(list);
    while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
    }
}

function validarGenero(nombre){
    var nombreGenero = document.getElementById('genero').value;
   
    var data = {
        genero: nombreGenero
    };
    fetch('/genero/validar', {
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
            if(json.length>0){
                alert("Ya existe");
                
            }else{
                registrarGenero();
                removeElementsGenero();
                listarGenero();
            }
        }
    )
    .catch(
        function(err) {
        console.log('Ocurrió un error con la ejecución', err);
        }
    );
}

function registrarBitacora(correo,accion){
    var data = {
        correo: correo,
        accion: accion,
        fecha: new Date()
    };
    fetch('/bitacora/add', {
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
    .catch(
        function(err) {
        console.log('Ocurrió un error con la ejecución', err);
        }
    );
}
 