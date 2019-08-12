var msgError = document.getElementById("alert");
var msgCorrecto = document.getElementById("alert_correct");

// window.onload = function () {
//     cargarDatos();
// }

var sucursal;

//mofocar para la sucursal
// async function cargarDatos() {
//     var nombreSucursal = sessionStorage.getItem('idSuc');
//     sucursal = await datosUsuario(nombreLibreria);
//     document.getElementById("nomComercial").value = sucursal.nombreComercial;
//     document.getElementById("nomFantasia").value = sucursal.nombreFantasia;
//     seleccionarDirecciones(document.getElementById("provincias"), sucursal.provincia);
//     llenarCantones();
//     setTimeout(function () {
//         seleccionarDirecciones(document.getElementById("cantones"), sucursal.canton);
//         llenarDistritos();
//         setTimeout(function () {
//             seleccionarDirecciones(document.getElementById("distritos"), sucursal.distrito);
//         }, 1000);

//     }, 1000);

//     document.getElementById("telefono").value = sucursal.telefono;
//     document.getElementById("dirExacta").value = sucursal.direccion;
//     lat = sucursal.latitud;
//     lng = sucursal.longitud;
//     cords = { lat: sucursal.latitud, lng: sucursal.longitud };
//     addNameCustomMarker(cords, sucursal.nombreSucursal);
// }

function guardarSucursal(){
    var esValido = validarCamposFormulario("form");
    if (esValido == false) {
        mostrarMsg("alert");
        return false;
    } else {
        actualizarSucursal(sucursal);
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