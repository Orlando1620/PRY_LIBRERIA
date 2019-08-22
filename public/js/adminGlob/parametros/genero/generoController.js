
async function registrarGenero() {
    try {
        var nombreGenero = document.getElementById('genero').value;
        var nombreReq = nombreGenero.toLowerCase();

        var existe = false;
        for (var i = 0; i < generos.length; i++) {
            var nombreRes = generos[i]['nombre'];
            nombreRes = nombreRes.toLowerCase();

            if (nombreRes == nombreReq) {
                existe = true;
            }
        }
        if (existe == false) {
            var data = {
                fechaRegistro: new Date(),
                nombre: nombreGenero
            };

            await fetch('/genero/add', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-Type': 'application/json' }
            })
            document.getElementById("alertGen").classList.add("oculto");
            registrarBitacora(sessionStorage.getItem("correo"), "registro género: " + nombreGenero);
            window.location.href = "genero.html";
        } else {
            document.getElementById("alertGen").classList.remove("oculto");
            document.getElementById("msgGen").innerHTML = "Este género ya existe";
        }
    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

function filtrarGenero() {
    removeElementsGenero();
    var nombreReq = document.getElementById('buscarGen').value;
    nombreReq = nombreReq.toLowerCase();

    if (generos.length > 0) {
        var resultados = 0;
        for (var i = 0; i < generos.length; i++) {
            var nombreRes = generos[i]['nombre'];
            nombreRes = nombreRes.toLowerCase();

            console.log(nombreRes);
            if (nombreRes.includes(nombreReq)) {
                resultados++;

                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var input = document.createElement("input");
                input.value = generos[i]['nombre'];
                input.id = generos[i]['_id'] + '_' + "nombre";
                input.classList.add('inputActualizar');
                input.readOnly = true;

                td.appendChild(input);
                tr.appendChild(td);

                var tdEliminar = document.createElement("td");
                var tdModificar = document.createElement("td");

                var a = document.createElement("a");
                var add = document.createElement("i");
                add.classList.add('fas');
                add.classList.add('fa-trash');
                add.id = generos[i]['_id'] + "_" + "listGenero" + i;
                a.addEventListener('click', popDel);
                a.appendChild(add);
                tdEliminar.appendChild(a);
                tr.appendChild(tdEliminar);

                var a = document.createElement('a');
                var add = document.createElement("i");
                add.classList.add('fas');
                add.classList.add('fa-pencil-alt');
                add.id = generos[i]['_id'];
                a.addEventListener('click', modificarGenero);
                a.appendChild(add);
                tdModificar.appendChild(a);
                tr.appendChild(tdModificar);

                document.getElementById("listGenero").appendChild(tr);
            }
        }
        if (resultados == 0) {
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


function removeElementsGenero() {
    var list = document.getElementById("listGenero");
    console.log(list);
    while (list.childNodes.length > 2) {
        list.removeChild(list.lastChild);
    }
}

function validarGenero(nombre) {
    var nombreGenero = document.getElementById('genero').value;

    var data = {
        genero: nombreGenero
    };
    fetch('/genero/validar', {
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
                if (json.length > 0) {
                    document.getElementById("msg-pop-info").innerHTML = "Genero ya existe, favor registre uno nuevo";
                    document.getElementById("msgInfo").classList.remove("oculto");

                } else {
                    registrarGenero();
                    removeElementsGenero();
                    listarGenero();
                }
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );
}

function registrarBitacora(correo, accion) {
    var data = {
        correo: correo,
        accion: accion,
        fecha: new Date()
    };
    fetch('/bitacora/add', {
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
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );
}

var varAccion;

function popDel(accion){
  varAccion = accion;
  document.getElementById("pop-up").classList.remove("oculto");
  document.getElementById("msg-pop").innerHTML = "¿Desea eliminar este género?";
}

function aceptar(){
  document.getElementById("pop-up").classList.add("oculto");
  eliminarGenero();
}

function cancelar(){
  document.getElementById("pop-up").classList.add("oculto");
}


function msgInfoBtn(){
    document.getElementById("msgInfo").classList.add("oculto");
}

function eliminarGenero() {

    try {
        var button = varAccion.target;
        var id = button.id;
        var ids = id.split("_");
        var npmbreGen = ids[0];
        var nombreGenero = document.getElementById(npmbreGen + '_nombre').value;

        var data = {
            genero: nombreGenero
        };
        var dataClubes = {
            genero: nombreGenero,
            id: ids[0]
        };
        fetch('/libro/validarGenLibros', {
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
                    if (json.length == 0) {
                        validarGenclubes(dataClubes);
                    } else {
                        document.getElementById("msg-pop-info").innerHTML = "No se puede eliminar porque hay un libro asociado";
                        document.getElementById("msgInfo").classList.remove("oculto");
                        setTimeout(function () {
                            document.getElementById("msgInfo").classList.add("oculto");
                          }, 2000);
                    }
                }
            )
            .catch(
                function (err) {
                    console.log('Ocurrió un error con la ejecución', err);
                }
            );
    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}


function validarGenclubes(dataParam) {
    try {

        var data = {
            genero: dataParam.genero
        };
        var dataDelete = {
            id: dataParam.id
        };

        fetch('/clubes/validarGenClubes', {
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
                    if (json.length == 0) {
                        eliminarGeneroNoAsociada(dataDelete);
                    } else {
                        document.getElementById("msg-pop-info").innerHTML = "No se puede eliminar el genero porque hay clubes asociados a ella primero elimine los libros";
                        document.getElementById("msgInfo").classList.remove("oculto");
                    }
                }
            ).catch(
                function (err) {
                    console.log('Ocurrió un error con la ejecución', err);
                }
            );

    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }




}


function eliminarGeneroNoAsociada(data) {
    fetch('/genero/del', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    removeElementsGenero();
    listarGenero();
}

function modificarGenero(e) {
    var club = e.target;
    var id = club.id;

    var nombre = document.getElementById(id + '_nombre');

    nombre.classList.remove("inputActualizar");
    nombre.classList.add("inputActualizando");
    nombre.removeAttribute('readonly');

    var botonActualizar = document.getElementById(id);
    botonActualizar.classList.remove("fa-pencil-alt");
    botonActualizar.classList.add('fa-save');
    botonActualizar.removeAttribute("onclick");
    botonActualizar.addEventListener('click', actualizarGenero);

}

function actualizarGenero(e) {

    var button = e.target;
    var id = button.id;

    var data = {
        id: id,
        nombre: document.getElementById(id + '_nombre').value
    }

    fetch('/genero/mod', {
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
                if (json.result == "exito") {
                   
                } else {
                    document.getElementById("msg-pop-info").innerHTML = "No se puede actualizar";
                        document.getElementById("msgInfo").classList.remove("oculto");
                    
                }
                var list = document.getElementById('table');

                removeElementsGenero();
                listarGenero();
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );
}
