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
    lib.nombreComercial = document.getElementById("nomComercial").value;
    lib.nombreFantasia = document.getElementById("nomFantasia").value;
    lib.provincia = document.getElementById("provincias");
    lib.canton = document.getElementById("cantones");
    lib.distrito = document.getElementById("distritos");
    lib.telefono = document.getElementById("telefono").value;
    lib.direccion = document.getElementById("dirExacta").value;
    lib.latitud = lat;
    lib.longitud = lng;

    actualizarLibreria(lib);
    sessionStorage.setItem('nombreLibreria', lib.nombreComercial);
}