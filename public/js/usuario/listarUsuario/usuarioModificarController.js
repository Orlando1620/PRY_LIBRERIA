
cargarUsuarioModificar();
var usuarioModificarId;
function cargarUsuarioModificar() {

    var usuarioModificar = location.search.split('=');
    usuarioModificarId = usuarioModificar[1];
    obtenerUsario(usuarioModificar[1]);


}

function obtenerUsario(id) {

    var data = {
        id: id
    };

    fetch('/usuario/buscarUsuario', {
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
                if (json.tipo == "adminGlobal") {
                    document.getElementById("nombre").value = json.nombre;
                    document.getElementById("primerApellido").value = json.apellido1;
                    document.getElementById("segundoApellido").value = json.apellido2;
                    document.getElementById("correo").value = json.correo;
                    document.getElementById("tipoIdentificacion1").value = json.tipoIdentificacion;
                    document.getElementById("identificacion1").value = json.identificacion;
                }
                if (json.tipo == "usuarioCliente") {

                    var canton = document.getElementById("cantones");
                    var opcCanton = document.createElement("option");

                    var textNode = document.createTextNode(json.canton);
                    opcCanton.appendChild(textNode);
                    canton.appendChild(opcCanton);

                    var distrito = document.getElementById("distritos");
                    var opcDistriton = document.createElement("option");

                    var textNode = document.createTextNode(json.distrito);
                    opcDistriton.appendChild(textNode);
                    distrito.appendChild(opcDistriton);


                    //document.getElementById("distritos").appendChild(opc);

                    document.getElementById("nombre").value = json.nombre;
                    document.getElementById("primerApellido").value = json.apellido1;
                    document.getElementById("segundoApellido").value = json.apellido2;
                    document.getElementById("correo").value = json.correo;
                    document.getElementById("fechaNacimiento").value = json.fechaNacimiento;
                    document.getElementById("sexo").value = json.sexo;
                    document.getElementById("tipoIdentificacion").value = json.tipoIdentificacion;
                    document.getElementById("identificacion").value = json.identificacion;
                    document.getElementById("provincias").value = json.provincia;
                    document.getElementById("cantones").value = json.canton;
                    document.getElementById("distritos").value = json.distrito;
                    document.getElementById("dirExacta").value = json.direccionExacta;
                    var lat = json.latitud;
                    var lng = json.longitud;
                    var coords = { lat, lng };
                    addMarker(coords);
                    longi = lng;
                    lati = lat;

                    var generosFavoritos = json.generosFav;

                    for (var i = 0; generosFavoritos.length; i++) {

                        for (var j = 0; j < arrayGeneros.length; j++) {

                            if (generosFavoritos[i][0] == arrayGeneros[j]['nombre']) {
                                document.getElementById("genero" + j).checked = true;
                            }
                        }
                    }

                }
                if (json.tipo == "AdminLib") {
                    document.getElementById("nomAdmin").value = json.nombre;
                    document.getElementById("apellido1").value = json.apellido1;
                    document.getElementById("apellido2").value = json.apellido2;
                    document.getElementById("emailAdmin").value = json.correo;
                    document.getElementById("fechaNaci_Admin").value = json.fechaNaci;
                    document.getElementById("tipo_identificacion").value = json.tipoIdentificacion;
                    document.getElementById("number_identificacion").value = json.identificacion;
                    document.getElementById("sexo").value = json.tipoSexo;

                }

            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );
}

function modificarUsuarioAdminGlobalBD() {

    var nombre = document.getElementById("nombre").value;
    var apellido1 = document.getElementById("primerApellido").value;
    var apellido2 = document.getElementById("segundoApellido").value;
    var correo = document.getElementById("correo").value;
    var tipoIdentificacion = document.getElementById("tipoIdentificacion1").value;
    var identificacion = document.getElementById("identificacion1").value;
    var id = usuarioModificarId;

    var data = {
        id: id,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        correo: correo,
        tipoIdentificacion: tipoIdentificacion,
        identificacion: identificacion
    };

    fetch('/adminGlobal/modificarUsuarioAdminGlobal', {
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
                    window.location.href = "listar-usuarios.html";
                } else {
                    document.getElementById("msg-pop-info").innerHTML = "Ocurrió un error no se pudo actualizar";
          document.getElementById("msgInfo").classList.remove("oculto");
                }
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );

}


function modificarUsuarioAdminLibBD() {


    var nombre = document.getElementById("nomAdmin").value;
    var apellido1 = document.getElementById("apellido1").value;
    var apellido2 = document.getElementById("apellido2").value;
    var correo = document.getElementById("emailAdmin").value;
    var fechaNaci = document.getElementById("fechaNaci_Admin").value;
    var tipoIdentificacion = document.getElementById("tipo_identificacion").value;
    var identificacion = document.getElementById("number_identificacion").value;
    var tipoSexo = document.getElementById("sexo").value;
    var id = usuarioModificarId;

    var data = {
        id: id,
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        correo: correo,
        fechaNaci: fechaNaci,
        tipoIdentificacion: tipoIdentificacion,
        identificacion: identificacion,
        tipoSexo: tipoSexo
    };

    fetch('/adminLib/modificarUsuarioAdminLib', {
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
                    window.location.href = "listar-usuarios.html";
                } else {
                    document.getElementById("msg-pop-info").innerHTML = "Ocurrió un error no se pudo actualizar";
          document.getElementById("msgInfo").classList.remove("oculto");
                }
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );

}

async function modificarUsuarioClienteBD() {
    var nombre = document.getElementById("nombre").value;
    var apellido1 = document.getElementById("primerApellido").value;
    var apellido2 = document.getElementById("segundoApellido").value;
    var correo = document.getElementById("correo").value;
    var fechaNacimiento = document.getElementById("fechaNacimiento").value;
    var sexo = document.getElementById("sexo").value;
    var tipoIdentificacion = document.getElementById("tipoIdentificacion").value;
    var identificacion = document.getElementById("identificacion").value;
    var provincia = document.getElementById("provincias").value;
    var canton = document.getElementById("cantones").value;
    var distrito = document.getElementById("distritos").value;
    var direccionExacta = document.getElementById("dirExacta").value;
    var latitud = lati;
    var longitud = longi;

    var generos = [];
    var j = 0;
    for (var i = 0; i < generoLength; i++) {
        idGenero = document.getElementById("genero" + i).checked;
        if (idGenero) {
            generos[j] = arrayGeneros[i]['nombre'];
            j++;
        }
    }



    var id = usuarioModificarId;
    if (document.getElementById('foto').value != "") {
        var formData = new FormData(document.getElementById('form'));

        await fetch('/usuarioCliente/localUploadImg', {
            method: 'POST',
            body: formData,
            enctype: "multipart/form-data"
        });
        var data = {
            id: id,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            correo: correo,
            fechaNacimiento: fechaNacimiento,
            sexo: sexo,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccionExacta: direccionExacta,
            generosFav: generos,
            latitud: latitud,
            longitud: longitud,
            path: 'public/uploads/' + document.getElementById('foto').files[0]['name']
        };
    } else {

        var data = {
            id: id,
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            correo: correo,
            fechaNacimiento: fechaNacimiento,
            sexo: sexo,
            tipoIdentificacion: tipoIdentificacion,
            identificacion: identificacion,
            provincia: provincia,
            canton: canton,
            distrito: distrito,
            direccionExacta: direccionExacta,
            generosFav: generos,
            latitud: latitud,
            longitud: longitud

        };
    }






    fetch('/usuarioCliente/modificarUsuarioCliente', {
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
                    window.location.href = "listar-usuarios.html";
                } else {
                    document.getElementById("msg-pop-info").innerHTML = "Ocurrió un error no se pudo actualizar";
          document.getElementById("msgInfo").classList.remove("oculto");
                }
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );

}

