var usuarios = [];

listarUsuario();

function listarUsuario() {

  fetch('/usuario/listar', {
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
      async function (json) {
        for (var i = 0; i < json.length; i++) {
            usuarios.push(json[i]);
            var tr = document.createElement("tr");
            var td = document.createElement("td");

            var a = document.createElement('a');
            var textNode = document.createTextNode(json[i]['nombre'] + " " + json[i]['apellido1'] + " " + json[i]['apellido2']);
            a.id = json[i]['_id'];
            a.appendChild(textNode);
            a.href = "#";
            a.addEventListener('click', perfil); 
            td.appendChild(a);
            tr.appendChild(td);

            

            var td3 = document.createElement("td");
            var textNode;

            switch(json[i]['tipo']){
                case "usuarioCliente":
                    textNode = document.createTextNode("Usuario cliente");
                    var td2 = document.createElement("td");
                    
                    var data = {
                        usuario2:json[i]['_id']
                    }
                    var response = await fetch('/califUsuario/listar', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{'Content-Type': 'application/json'}
                    })
                    califs = await response.json();
                    
                    if(califs.length != 0){
                        var calif = 0;
                        for(var j=0;j<califs.length;j++){
                            calif += califs[j]['calif'];
                        }
                        calif = calif/califs.length;
                        calif = Math.round(calif);
                        console.log(calif);
                        for(var j=0;j<calif;j++){
                            var icon = document.createElement("i");
                            icon.classList.add("fas");
                            icon.classList.add("fa-book");
                            icon.classList.add("calif-true");
                            td2.appendChild(icon);
                        }
            
                        for(var j=0;j<5-calif;j++){
                            var icon = document.createElement("i");
                            icon.classList.add("fas");
                            icon.classList.add("fa-book");
                            icon.classList.add("calif-false");
                            td2.appendChild(icon);
                        }
            
                    } else {
                        var califT = document.createTextNode("");
                        td2.appendChild(califT);
                       
                    }
                    tr.appendChild(td2);
                    break;
                case "adminGlobal":
                    textNode = document.createTextNode("Administrador global");
                    var td2 = document.createElement("td");
                    tr.appendChild(td2);

                    break;
                case "AdminLib":
                    textNode = document.createTextNode("Administrador de librería");
                    var td2 = document.createElement("td");
                    tr.appendChild(td2);
                    break;
            }
            td3.appendChild(textNode);
            tr.appendChild(td3);

            document.getElementById("listUsuario").appendChild(tr);
        }
      }
    )
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

function filtrarUsuario() {
    removeElements();

    var nombreReq = document.getElementById("buscar").value;
    nombreReq = nombreReq.toLowerCase();
    if (usuarios.length > 0) {
        var resultados = 0;
        for (var i = 0; i < usuarios.length; i++) {
            var nombreRes = usuarios[i]['nombre'] + " " + usuarios[i]["apellido1"] + " " + usuarios[i]["apellido2"];
            nombreRes = nombreRes.toLowerCase();
            if (nombreRes.includes(nombreReq)) {
                resultados++;
                var tr = document.createElement("tr");
                var td = document.createElement("td");


                var textNode = document.createTextNode(usuarios[i]['nombre'] + " " + usuarios[i]['apellido1'] + " " + usuarios[i]['apellido2']);
                td.appendChild(textNode);
                tr.appendChild(td);

                var td2 = document.createElement("td");
                td2.colSpan = "2";
                
                for(var j=0;j<5;j++){
                    var icon = document.createElement("i");
                    icon.classList.add("fas");
                    icon.classList.add("fa-book");
                    td2.appendChild(icon);
                }
                tr.appendChild(td2);

                var td3 = document.createElement("td");

                var textNode = document.createTextNode(usuarios[i]['tipo']);
                td3.appendChild(textNode);
                tr.appendChild(td3);

                document.getElementById("listUsuario").appendChild(tr);
            }
        }
        if (resultados == 0) {
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

function removeElements() {
    var list = document.getElementById("listUsuario");
    while (list.childNodes[1]) {
        list.removeChild(list.childNodes[1]);
    }
    var titles = document.createElement("tr");
    var t1 = document.createElement("td");
    var t2 = document.createElement("td");
    var t3 = document.createElement("td");

    var textT1 = document.createTextNode("Nombre");
    var textT2 = document.createTextNode("Calificación");
    var textT3 = document.createTextNode("Rol");

    t1.appendChild(textT1);
    t2.appendChild(textT2);
    t3.appendChild(textT3);

    t2.colSpan = 2;

    titles.appendChild(t1);
    titles.appendChild(t2);
    titles.appendChild(t3);

    titles.classList.add("table-titles");

    document.getElementById("listUsuario").appendChild(titles);
}

document.getElementById("roles").addEventListener("change", filtrarTipo);
function filtrarTipo() {
    removeElements();
    var rol = document.getElementById("roles").value;
    console.log(rol);
    usuarios = [];

    var data = {
        rol: rol
    };
    fetch('/usuario/filtrarTipo', {
        method: 'POST',
        body: JSON.stringify(data),
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
                if (json.length > 0) {
                    for (var i = 0; i < json.length; i++) {
                        usuarios.push(json[i]);
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");


                        var textNode = document.createTextNode(json[i]['nombre'] + " " + json[i]['apellido1'] + " " + json[i]['apellido2']);
                        td.appendChild(textNode);
                        tr.appendChild(td);

                        var td2 = document.createElement("td");
                        td2.colSpan = "2";
                        
                        for(var j=0;j<5;j++){
                            var icon = document.createElement("i");
                            icon.classList.add("fas");
                            icon.classList.add("fa-book");
                            td2.appendChild(icon);
                        }
                        tr.appendChild(td2);

                        

                        var td3 = document.createElement("td");

                        var textNode = document.createTextNode(json[i]['tipo']);
                        td3.appendChild(textNode);
                        tr.appendChild(td3);

                        document.getElementById("listUsuario").appendChild(tr);

                    }

                } else {
                    document.getElementById("alert").classList.remove("oculto");
                    document.getElementById("msg").innerHTML = "No se encontraron resultados";
                }
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );
}

function nuevoAdmin(){
    window.location.href= "registrarAdminGlobal.html";
}

function perfil(e){
    var a = e.target;
    var id = a.id;
    localStorage.setItem("idUsuario",id);
    window.location.href = "perfil-pub-admin.html";
}

