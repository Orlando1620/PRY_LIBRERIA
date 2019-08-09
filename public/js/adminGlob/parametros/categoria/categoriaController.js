

async function registrarCategoria(){
    try{
        var nombreCategoria = document.getElementById('categoria').value;
        var nombreReq = nombreCategoria.toLowerCase();

            var existe = false;
            for(var i=0;i<categorias.length;i++){
                var nombreRes = categorias[i]['nombre'];
                nombreRes = nombreRes.toLowerCase();
                
                if(nombreRes == nombreReq){
                    existe = true;
                }
            }
            if(existe == false){
                var data = {
                    fechaRegistro: new Date(),
                    nombre: nombreCategoria
                };
            
                await fetch('/categoria/add',{
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{'content-Type': 'application/json'}
                })
                document.getElementById("alertCat").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"),"registro categoría: "+nombreCategoria);
                window.location.href = "parametros.html";
            } else {
                document.getElementById("alertCat").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Esta categoría ya existe";
            }
    } catch(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

function filtrarCategoria(){
    removeElements();
    var nombreReq = document.getElementById('buscarCat').value;
    nombreReq = nombreReq.toLowerCase();
    
    if(categorias.length>0){
        var resultados = 0;
        for(var i=0;i<categorias.length;i++){
          var nombreRes = categorias[i]['nombre'];
          nombreRes = nombreRes.toLowerCase();
          
          console.log(nombreRes);
          if(nombreRes.includes(nombreReq)){
            resultados++;
            var li = document.createElement("li");
            var textNode = document.createTextNode(categorias[i]['nombre']);
            li.appendChild(textNode);
            document.getElementById("listCategoria").appendChild(li);
          }
        }
        if(resultados == 0){
            document.getElementById("alertCat").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "No se encontraron resultados";
        } else {
            document.getElementById("alertCat").classList.add("oculto");
        }
    } else {
        document.getElementById("alertCat").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "No se encontraron resultados";
    }
}

function removeElements(){
    var list = document.getElementById("listCategoria");
    console.log(list);
    while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
    }
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

