// JavaScript Document
if (sessionStorage.getItem("nombre") == null) {
    document.getElementById("btn-reg").classList.add("oculto");
}

var clubes = [];
fetch('/clubes/listar', {
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
            for (var i = 0; i < json.length; i++) {
                clubes.push(json[i]);
                var tRow = document.createElement('tr');

                var nombre = document.createElement('td');
                nombre.setAttribute("onclick", "perfil(this)")
                var nombreT = document.createTextNode(json[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);

                var genero = document.createElement('td');
                var generoT = document.createTextNode(json[i]["genero"]);
                genero.appendChild(generoT);
                tRow.appendChild(genero);

                var tipo = document.createElement('td');
                var tipoT = document.createTextNode(json[i]["tipo"]);
                tipo.appendChild(tipoT);
                tRow.appendChild(tipo);

                var table = document.getElementById("table");
                table.appendChild(tRow);
            }
        }
    )
    .catch(
        function (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    );

fetch('/genero/listar', {
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
            for (var i = 0; i < json.length; i++) {
                var opc = document.createElement("option");
                var textNode = document.createTextNode(json[i]['nombre']);
                opc.appendChild(textNode);

                document.getElementById("generos").appendChild(opc);
            }
        }
    )
    .catch(
        function (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    );

function filtrarNombre() {

    var list = document.getElementById('table');
    removeElements(list);

    var nameInput = document.getElementById("buscar").value;
    nameInput = nameInput.toLowerCase();

    if (clubes.length > 0) {
        var resultados = 0;
        for (var i = 0; i < clubes.length; i++) {

            var name = clubes[i]["nombre"];
            name = name.toLowerCase();

            if (name.includes(nameInput)) {
                resultados++;

                var tRow = document.createElement('tr');

                var nombre = document.createElement('td');
                var nombreT = document.createTextNode(clubes[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);

                var genero = document.createElement('td');
                var generoT = document.createTextNode(clubes[i]["genero"]);
                genero.appendChild(generoT);
                tRow.appendChild(genero);

                var tipo = document.createElement('td');
                var tipoT = document.createTextNode(clubes[i]["tipo"]);
                tipo.appendChild(tipoT);
                tRow.appendChild(tipo);

                var table = document.getElementById("table");
                table.appendChild(tRow);
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


function filtrarGenTipo() {

    var list = document.getElementById('table');
    removeElements(list);
    document.getElementById("buscar").value = "";
    clubes = [];

    var data = {
        genero: document.getElementById("generos").value,
        tipo: document.getElementById("tipo").value
    };
    fetch('/clubes/filtrarGenTipo', {
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
                    for (var i = 0; i < json.length; i++) {
                        clubes.push(json[i]);
                        var tRow = document.createElement('tr');

                        var nombre = document.createElement('td');
                        var nombreT = document.createTextNode(json[i]["nombre"]);
                        nombre.appendChild(nombreT);
                        tRow.appendChild(nombre);

                        var genero = document.createElement('td');
                        var generoT = document.createTextNode(json[i]["genero"]);
                        genero.appendChild(generoT);
                        tRow.appendChild(genero);

                        var tipo = document.createElement('td');
                        var tipoT = document.createTextNode(json[i]["tipo"]);
                        tipo.appendChild(tipoT);
                        tRow.appendChild(tipo);

                        var table = document.getElementById("table");
                        table.appendChild(tRow);
                    }
                    document.getElementById("alert").classList.add("oculto");
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


function filtrarTipo() {

    var list = document.getElementById('table');
    removeElements(list);

    var data = {
        tipo: document.getElementById("tipo").value
    };
    fetch('/clubes/filtrarTipo', {
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
                    for (var i = 0; i < json.length; i++) {
                        var tRow = document.createElement('tr');

                        var nombre = document.createElement('td');
                        var nombreT = document.createTextNode(json[i]["nombre"]);
                        nombre.appendChild(nombreT);
                        tRow.appendChild(nombre);

                        var genero = document.createElement('td');
                        var generoT = document.createTextNode(json[i]["genero"]);
                        genero.appendChild(generoT);
                        tRow.appendChild(genero);

                        var tipo = document.createElement('td');
                        var tipoT = document.createTextNode(json[i]["tipo"]);
                        tipo.appendChild(tipoT);
                        tRow.appendChild(tipo);


                        var table = document.getElementById("table");
                        table.appendChild(tRow);
                    }
                    document.getElementById("alert").classList.add("oculto");
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


function removeElements(list) {
    while (list.childNodes.length > 2) {
        list.removeChild(list.lastChild);
    }
}

function nuevoClub(e) {
    window.location.href = "registrar-club.html";
}

function perfil(e) {
    var nombreClub = e.textContent;
    localStorage.setItem("nombre", nombreClub);
    window.location.href = ("perfil-clubLectura.html");
}

async function obtenerClubesLectura(nombre) {

    let datos = {
        nombre: nombre
    }

    let dato = await fetch('/clubes/obtenerClubesLectura', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log('Error:', err));

    return dato;
};

async function obtenerLibroClubesLectura(libro) {

    let datos = {
        libro: libro
    }

    let dato = await fetch('/clubes/obtenerLibroClubesLectura', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log('Error:', err));

    return dato;
};

async function obtenerSucursalClubesLectura(sucursal) {

    let datos = {
        sucursal: sucursal
    }

    let dato = await fetch('/clubes/obtenerSucursalClubesLectura', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log('Error:', err));

    return dato;
};

async function registrarUsuarioClub(usuario, club) {

    let datos = {
        usuarioId: usuario,
        clubId: club
    }
    let msg = await fetch('/clubes/registrarUsuarioClub', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log('Error:', err));
    return msg;
};


async function deleteUsuario(usuario, club) {

    let dato = {
        usuarioId: usuario,
        clubId: club
    }

    let msg = await fetch('/clubes/deleteUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dato)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log('Error:', err));
    return msg;
}


async function verificarUsuario (usuario, club) {

    let dato = {
        usuarioId: usuario,
        clubId: club
    }

    let msg = await fetch('/clubes/verificarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dato)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log('Error:', err));
    return msg;
}