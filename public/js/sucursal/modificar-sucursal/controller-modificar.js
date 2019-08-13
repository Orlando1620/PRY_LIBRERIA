var msgError = document.getElementById("alert");
var msgCorrecto = document.getElementById("alert_correct");

window.onload = function () {
    cargarDatos();
}

var suc;
async function cargarDatos() {
    var idSuc = sessionStorage.getItem('idSuc');
    suc = await obtener_Sucursal(idSuc);
    document.getElementById("nombreSucursal").value = suc.nombreSucursal;
    document.getElementById("dirExacta").value = suc.direccion;
    seleccionarDirecciones(document.getElementById("provincias"), suc.provincia);
    llenarCantones();
    setTimeout(function () {
        seleccionarDirecciones(document.getElementById("cantones"), suc.canton);
        llenarDistritos();
        setTimeout(function () {
            seleccionarDirecciones(document.getElementById("distritos"), suc.distrito);
        }, 1000);

    }, 1000);

    document.getElementById("numeroSucursal").value = suc.telefono;
    lat = suc.latitud;
    lng = suc.longitud;
    cords = { lat: suc.latitud, lng: suc.longitud };
    addNameCustomMarker(cords, suc.nombreSucursal);
}

function seleccionarDirecciones(s, v) {
    for (var i = 0; i < s.options.length; i++) {
        if (s.options[i].value == v) {
            s.options[i].selected = true;
            return;
        }
    }
}

function guardarSucursal() {
    var esValido = validarCamposFormulario("form");
    if (esValido == false) {
        mostrarMsg("alert");
        return false;
    } else {
        suc.nombreSucursal = document.getElementById('nombreSucursal').value;
        suc.direccion = document.getElementById('dirExacta').value;
        suc.provincia = document.getElementById('provincias').value;
        suc.canton = document.getElementById('cantones').value;
        suc.distrito = document.getElementById('distritos').value;
        suc.telefono = document.getElementById('numeroSucursal').value;
        suc.latitud = lat;
        suc.longitud = lng;
        actualizarSucursal(suc);
        mostrarMsg("alert_correct");

    }
    setTimeout(function () {
        window.location.href = ("perfil-sucursal.html");
    }, 3000);
}

function mostrarMsg(id_clase_error) {
    setTimeout(function () {
        document.getElementById(id_clase_error).classList.add("oculto");
    }, 3000);

    document.getElementById(id_clase_error).classList.remove("oculto");
}