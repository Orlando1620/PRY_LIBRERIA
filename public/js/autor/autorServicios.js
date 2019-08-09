
/**
 * Registra el autor
 */
async function registro(){
    try{
        var formData = new FormData(document.getElementById('form'));
        
        await fetch('/autor/localUploadImg', {
        method: 'POST',
        body: formData,
        enctype: "multipart/form-data"
        })    

        var data = {
            nombre: document.getElementById("nombre").value,
            apellido1: document.getElementById("apellido1").value,
            apellido2: document.getElementById("apellido2").value,
            nac: document.getElementById("nac").value,
            bio: document.getElementById("bio").value,
            path: 'public/uploads/' + document.getElementById('foto').files[0]['name']
        };

        var response  = await fetch('/autor/registrar', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        });

        var result = await response.json();
        
        msg = result['result'];
        console.log(msg);
        switch(msg){
            case 'repetido':
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Un autor con el mismo nombre ya fue registrado";
                break;
            case 'exito':
                document.getElementById("alert").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"),'registro autor: '+document.getElementById("nombre").value+
                " "+document.getElementById("apellido1").value)+" "+document.getElementById("apellido2").value;
                document.getElementById("alert-success").classList.remove("oculto");
                document.getElementById("msg-success").innerHTML = "Autor registrado";
                setTimeout(function () {
                    window.location.href = "listar-autores-admin.html";
                }, 2000);
                break;
        }
    } catch(err){
        console.log('Ocurrió un error con la ejecución', err);
    }
    
}
  
async function modificar(){
    try{
        if(document.getElementById('foto').value != ""){
            var formData = new FormData(document.getElementById('form'));
            
            await fetch('/autor/localUploadImg', {
            method: 'POST',
            body: formData,
            enctype: "multipart/form-data"
            }) 
            
            var data = {
                nombreOrig: nombreOrig,
                idAutor:idAutor,
                nombre: document.getElementById("nombre").value,
                apellido1: document.getElementById("apellido1").value,
                apellido2: document.getElementById("apellido2").value,
                nac: document.getElementById("nac").value,
                bio: document.getElementById("bio").value,
                path: 'public/uploads/' + document.getElementById('foto').files[0]['name'],
                foto: true
            };

            var response  = await fetch('/autor/modificar', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'}
            });
        } else {
            var data = {
                nombreOrig: nombreOrig,
                idAutor:idAutor,
                nombre: document.getElementById("nombre").value,
                apellido1: document.getElementById("apellido1").value,
                apellido2: document.getElementById("apellido2").value,
                nac: document.getElementById("nac").value,
                bio: document.getElementById("bio").value,
                path: path,
                foto: false
            };

            var response  = await fetch('/autor/modificar', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'}
            });
        }

        var result = await response.json();
        
        msg = result['result'];
        console.log(msg);
        switch(msg){
            case 'repetido':
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Un autor con el mismo nombre ya fue registrado";
                break;
            case 'exito':
                document.getElementById("alert").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"),'modifcación autor: '+document.getElementById("nombre").value+
                " "+document.getElementById("apellido1").value)+" "+document.getElementById("apellido2").value;
                document.getElementById("alert-success").classList.remove("oculto");
                document.getElementById("msg-success").innerHTML = "Cambios guardados";
                setTimeout(function () {
                    window.location.href = "listar-autores-admin.html";
                }, 2000);
                break;
        }
    } catch(err){
        console.log('Ocurrió un error con la ejecución', err);
    }
    
}
/**
 * Registra la accion en la bitacora
 */
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
  
function removeElements(){
    var list = document.getElementById("cards-cont");
    console.log(list);
    while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
    }
}

function verPerfilAutor(value) {
    localStorage.removeItem('idAutor');
    localStorage.setItem('idAutor', value.id);
    window.location.href= ("perfil-autor.html");
}

function nuevoAutor(){
    window.location.href = "registrar-autor.html"
}
