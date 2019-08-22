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
            function (json) {
                console.log(json);
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
                    var tipoUsuario = 0;
                    switch(json[i]['tipo']){
                        case "usuarioCliente":
                            textNode = document.createTextNode("Usuario cliente");
                            var td2 = document.createElement("td");
                            var tipoUsuario = 0;
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
                            tipoUsuario = 1;
                            tr.appendChild(td2);
        
                            break;
                        case "AdminLib":
                            textNode = document.createTextNode("Administrador de librería");
                            var td2 = document.createElement("td");
                            tipoUsuario = 2;
                            tr.appendChild(td2);
                            break;
                    }

                    td3.appendChild(textNode);
                    tr.appendChild(td3);

                    var tdEliminar = document.createElement("td");
                    var tdModificar = document.createElement("td");
                    var tdCambEstado = document.createElement("td");

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');
                    add.classList.add('fa-trash');
                    a.appendChild(add);
                    tdEliminar.appendChild(a);
                    tr.appendChild(tdEliminar);

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');
                    add.classList.add('fa-pencil-alt');
                    add.id = json[i]['_id'] + '_' + tipoUsuario;
                    a.addEventListener('click', modificarUsuario);
                    a.appendChild(add);
                    tdModificar.appendChild(a);
                    tr.appendChild(tdModificar);

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');

                    var estado;
                    if (json[i]['bloqueado']) {
                        estado = 1;
                        add.classList.add('fa-ban');
                    } else {
                        estado = 0;
                        add.classList.add('fa-check-circle');
                    }

                    add.id = json[i]['_id'] + '_' + estado;
                    a.addEventListener('click', cambiarEstadoUsuario);
                    a.appendChild(add);
                    tdCambEstado.appendChild(a);
                    tr.appendChild(tdCambEstado);

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

function modificarUsuario(e) {

    var usuario = e.target;
    var id = usuario.id;
    var redir = id.split("_");
    if (redir[1] == 0) {
        window.location.href = "modificarUC.html?usuario=" + redir[0];
    } else if (redir[1] == 1) {
        window.location.href = "modificarAdminGlobal.html?usuario=" + redir[0];
    } else if (redir[1] == 2) {
        window.location.href = "modificarAdminLib.html?usuario=" + redir[0];

    }

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
                    var tipoUsuario = 0;
                    switch(json[i]['tipo']){
                        case "usuarioCliente":
                            textNode = document.createTextNode("Usuario cliente");
                            var td2 = document.createElement("td");
                            var tipoUsuario = 0;
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
                            tipoUsuario = 1;
                            tr.appendChild(td2);
        
                            break;
                        case "AdminLib":
                            textNode = document.createTextNode("Administrador de librería");
                            var td2 = document.createElement("td");
                            tipoUsuario = 2;
                            tr.appendChild(td2);
                            break;
                    }

                    td3.appendChild(textNode);
                    tr.appendChild(td3);

                    var tdEliminar = document.createElement("td");
                    var tdModificar = document.createElement("td");
                    var tdCambEstado = document.createElement("td");

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');
                    add.classList.add('fa-trash');
                    a.appendChild(add);
                    tdEliminar.appendChild(a);
                    tr.appendChild(tdEliminar);

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');
                    add.classList.add('fa-pencil-alt');
                    add.id = json[i]['_id'] + '_' + tipoUsuario;
                    a.addEventListener('click', modificarUsuario);
                    a.appendChild(add);
                    tdModificar.appendChild(a);
                    tr.appendChild(tdModificar);

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');

                    var estado;
                    if (json[i]['bloqueado']) {
                        estado = 1;
                        add.classList.add('fa-ban');
                    } else {
                        estado = 0;
                        add.classList.add('fa-check-circle');
                    }

                    add.id = json[i]['_id'] + '_' + estado;
                    a.addEventListener('click', cambiarEstadoUsuario);
                    a.appendChild(add);
                    tdCambEstado.appendChild(a);
                    tr.appendChild(tdCambEstado);

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
    var t4 = document.createElement("td");
    var t5 = document.createElement("td");
    var t6 = document.createElement("td");

    var textT1 = document.createTextNode("Nombre");
    var textT2 = document.createTextNode("Calificación");
    var textT3 = document.createTextNode("Rol");
    var textT4 = document.createTextNode("Eliminar");
    var textT5 = document.createTextNode("Modificar");
    var textT6 = document.createTextNode("Estado");

    t1.appendChild(textT1);
    t2.appendChild(textT2);
    t3.appendChild(textT3);
    t4.appendChild(textT4);
    t5.appendChild(textT5);
    t6.appendChild(textT6);

    t2.colSpan = 2;

    titles.appendChild(t1);
    titles.appendChild(t2);
    titles.appendChild(t3);
    titles.appendChild(t4);
    titles.appendChild(t4);
    titles.appendChild(t5);

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
                    var tipoUsuario = 0;
                    switch(json[i]['tipo']){
                        case "usuarioCliente":
                            textNode = document.createTextNode("Usuario cliente");
                            var td2 = document.createElement("td");
                            var tipoUsuario = 0;
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
                            tipoUsuario = 1;
                            tr.appendChild(td2);
        
                            break;
                        case "AdminLib":
                            textNode = document.createTextNode("Administrador de librería");
                            var td2 = document.createElement("td");
                            tipoUsuario = 2;
                            tr.appendChild(td2);
                            break;
                    }

                    td3.appendChild(textNode);
                    tr.appendChild(td3);

                    var tdEliminar = document.createElement("td");
                    var tdModificar = document.createElement("td");
                    var tdCambEstado = document.createElement("td");

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');
                    add.classList.add('fa-trash');
                    a.appendChild(add);
                    tdEliminar.appendChild(a);
                    tr.appendChild(tdEliminar);

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');
                    add.classList.add('fa-pencil-alt');
                    add.id = json[i]['_id'] + '_' + tipoUsuario;
                    a.addEventListener('click', modificarUsuario);
                    a.appendChild(add);
                    tdModificar.appendChild(a);
                    tr.appendChild(tdModificar);

                    var a = document.createElement('a');
                    var add = document.createElement("i");
                    add.classList.add('fas');

                    var estado;
                    if (json[i]['bloqueado']) {
                        estado = 1;
                        add.classList.add('fa-ban');
                    } else {
                        estado = 0;
                        add.classList.add('fa-check-circle');
                    }

                    add.id = json[i]['_id'] + '_' + estado;
                    a.addEventListener('click', cambiarEstadoUsuario);
                    a.appendChild(add);
                    tdCambEstado.appendChild(a);
                    tr.appendChild(tdCambEstado);

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

async function cambiarEstadoUsuario(e) {
    try {
        var usuario = e.target;
        var id1 = usuario.id;
        var estado = id1.split("_");
        var actualizar;

        if (estado[1] == 0) {//esta activo se va a bloquear
            actualizar = true;
        } else {
            if (estado[1] == 1) {//esta bloqeado se va a desbloquear
                actualizar = false;
            }
        }
        var data = {
            id: estado[0],
            bloqueado: actualizar
        };

        var response = await fetch('/usuario/actualizarEstadoUsuario', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        var result = await response.json();
        msg = result['result'];
        console.log(msg);
        if (msg == 'exito') {
            if (actualizar == 0) {//activo
                usuario.classList.remove('fa-ban');
                usuario.classList.add('fa-check-circle');
            }
            if (actualizar == 1) {//bloqueado
                usuario.classList.remove('fa-check-circle');
                usuario.classList.add('fa-ban');
            }

        } else {
            alert('No se pudo actualizar');
        }



    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}
