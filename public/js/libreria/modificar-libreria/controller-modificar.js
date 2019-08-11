var msgError = document.getElementById("alert");
var msgCorrecto = document.getElementById("alert_correct");

window.onload = function () {
    cargarDatos();
}

var lib;

async function cargarDatos() {
    var nombreLibreria = sessionStorage.getItem('nombreLibreria');
    lib = await obtener_libreria(nombreLibreria);
    document.getElementById("nomComercial").value = lib.nombreComercial;
    document.getElementById("nomFantasia").value = lib.nombreFantasia;
    seleccionarDirecciones(document.getElementById("provincias"), lib.provincia);
    llenarCantones();
    setTimeout(function () {
        seleccionarDirecciones(document.getElementById("cantones"), lib.canton);
        llenarDistritos();
        setTimeout(function () {
            seleccionarDirecciones(document.getElementById("distritos"), lib.distrito);
        }, 1000);

    }, 1000);

    document.getElementById("telefono").value = lib.telefono;
    document.getElementById("dirExacta").value = lib.direccion;
    lat = lib.latitud;
    lng = lib.longitud;
    cords = { lat: lib.latitud, lng: lib.longitud };
    addNameCustomMarker(cords, lib.nombreComercial);
}

function seleccionarDirecciones(s, v) {
    for (var i = 0; i < s.options.length; i++) {
        if (s.options[i].value == v) {
            s.options[i].selected = true;
            return;
        }
    }
}

function guardarLib() {
    var esValido = validarCamposFormulario("form");
    if (esValido == false) {
        mostrarMsg("alert");
        return false;
    } else {
        lib.nombreComercial = document.getElementById("nomComercial").value;
        lib.nombreFantasia = document.getElementById("nomFantasia").value;
        lib.provincia = document.getElementById("provincias").value;
        lib.canton = document.getElementById("cantones").value;
        lib.distrito = document.getElementById("distritos").value;
        lib.telefono = document.getElementById("telefono").value;
        lib.direccion = document.getElementById("dirExacta").value;
        lib.latitud = lat;
        lib.longitud = lng;

        actualizarLibreria(lib);
        sessionStorage.setItem('nombreLibreria', lib.nombreComercial);
        mostrarMsg("alert_correct");

    }
    setTimeout(function () {
        window.location.href = ("perfil-libreria.html");
    }, 3000);
}

function mostrarMsg(id_clase_error) {
    setTimeout(function () {
        document.getElementById(id_clase_error).classList.add("oculto");
    }, 3000);

    document.getElementById(id_clase_error).classList.remove("oculto");
}