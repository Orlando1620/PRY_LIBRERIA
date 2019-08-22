

async function registrarCategoria() {
    try {
        var nombreCategoria = document.getElementById('categoria').value;
        var nombreReq = nombreCategoria.toLowerCase();

        var existe = false;
        for (var i = 0; i < categorias.length; i++) {
            var nombreRes = categorias[i]['nombre'];
            nombreRes = nombreRes.toLowerCase();

            if (nombreRes == nombreReq) {
                existe = true;
            }
        }
        if (existe == false) {
            var data = {
                fechaRegistro: new Date(),
                nombre: nombreCategoria
            };

            await fetch('/categoria/add', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'content-Type': 'application/json' }
            })
            document.getElementById("alertCat").classList.add("oculto");
            registrarBitacora(sessionStorage.getItem("correo"), "registro categoría: " + nombreCategoria);
            window.location.href = "categorias.html";
        } else {
            document.getElementById("alertCat").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "Esta categoría ya existe";
        }
    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

function filtrarCategoria() {
    removeElements();
    var nombreReq = document.getElementById('buscarCat').value;
    nombreReq = nombreReq.toLowerCase();

    if (categorias.length > 0) {
        var resultados = 0;
        for (var i = 0; i < categorias.length; i++) {
            var nombreRes = categorias[i]['nombre'];
            nombreRes = nombreRes.toLowerCase();

            console.log(nombreRes);
            if (nombreRes.includes(nombreReq)) {
                resultados++;
                
                var tr = document.createElement("tr");
                var td = document.createElement("td");
                var input = document.createElement("input");
                input.value = categorias[i]['nombre'];
                input.id = categorias[i]['_id'] + '_' + "nombre";
                input.classList.add('inputActualizar');
                input.readOnly = true;

                td.appendChild(input);
                tr.appendChild(td);

                var tdEliminar = document.createElement("td");
                var tdModificar = document.createElement("td");
                
                var a = document.createElement('a');
                var add = document.createElement("i");
                add.classList.add('fas');
                add.classList.add('fa-trash');
                add.id = categorias[i]['_id'] + "_" + "listCategoria" + i;
                a.addEventListener('click', popDel);
                a.appendChild(add);
                tdEliminar.appendChild(a);
                tr.appendChild(tdEliminar);

                var a = document.createElement('a');
                var add = document.createElement("i");
                add.classList.add('fas');
                add.classList.add('fa-pencil-alt');
                add.id = categorias[i]['_id'];
                a.addEventListener('click', modificarCategoria);
                a.appendChild(add);
                tdModificar.appendChild(a);
                tr.appendChild(tdModificar);
                
                document.getElementById("listCategoria").appendChild(tr);
            }
        }
        if (resultados == 0) {
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

function removeElements() {
    var list = document.getElementById("listCategoria");
    console.log(list);
    while (list.childNodes.length > 2) {
        list.removeChild(list.lastChild);
    }
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
  document.getElementById("msg-pop").innerHTML = "¿Desea eliminar esta categoría?";
}

function aceptar(){
  document.getElementById("pop-up").classList.add("oculto");
  eliminarCategoria();
}

function cancelar(){
  document.getElementById("pop-up").classList.add("oculto");
}

function eliminarCategoria() {

    try {
        var button = varAccion.target;
        var id = button.id;
        var ids = id.split("_");
        var idCateg = ids[0];
        var nombreCategoria = document.getElementById(idCateg + '_nombre').value;

        var data = {
            categoria: nombreCategoria
        };
        var dataCat = {
            id: ids[0]
        };
        fetch('/libro/validarCatLibros', {
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
                        eliminarCategoriaNoAsociada(dataCat);
                    } else {
                        document.getElementById("msg-pop-info").innerHTML = "No se puede eliminar la categoría porque hay libros asociados a ella";
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

function eliminarCategoriaNoAsociada(data) {
    fetch('/categoria/del', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    removeElements();
    listarCategoria();
}


function modificarCategoria(e) {
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
    botonActualizar.addEventListener('click', actualizarCategoria);

}

function actualizarCategoria(e) {

    var button = e.target;
    var id = button.id;

    var data = {
        id: id,
        nombre: document.getElementById(id + '_nombre').value
    }

    fetch('/categoria/mod', {
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
                    document.getElementById("msg-pop-info").innerHTML = "Ocurrió un error no se pudo actualizar";
          document.getElementById("msgInfo").classList.remove("oculto");
                }
                var list = document.getElementById('listCategoria');

                removeElements();
                listarCategoria();
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );
}

