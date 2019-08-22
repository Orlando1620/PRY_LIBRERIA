var alert = document.getElementById('alert');
var contraActual = document.getElementById('alert_contraActual');
var contraNueva = document.getElementById('alert_contraNuevas');
var tamaNoContra = document.getElementById('alert_length');
var correct = document.getElementById('alert_correct');


var idUsuario = sessionStorage.getItem("id");

var datos;
var guardar;
debugger;
async function guardarCambios() {
    var inputContraseNaActual = document.getElementById('contra-actual').value;
    var inputContraseNaNueva = document.getElementById('nueva-contra').value;
    var inputContraConfirm = document.getElementById('confir-contra').value;
    datos = await obtenerDatos(idUsuario);
    var booleanPassword = datos.changePassword;
    var esValido = validarCamposFormulario("form");
    if (!esValido) {
        mostrarMsg('alert');
        return false;
    } else {
        if (datos.contrasena !== inputContraseNaActual) {
            mostrarMsg('alert_contraActual');
        } else {
            if (inputContraseNaNueva.length < 8) {
                mostrarMsg('alert_length');
            } else {
                if (inputContraseNaNueva !== inputContraConfirm) {
                    mostrarMsg('alert_contraNuevas');
                } else {
                    guardar = await guardarContra(idUsuario, inputContraseNaNueva, booleanPassword);
                    mostrarMsg('alert_correct');
                    sessionStorage.setItem("tipo", datos.tipo);
                    setTimeout(function () {
                        switch (sessionStorage.getItem("tipo")) {
                            case "usuarioCliente":
                                    window.location.href = ("homePage.html");
                                break;
                        
                            case "AdminLib":
                                    window.location.href = ("perfil-lib-admin.html");
                                break;
                        
                            case "adminGlobal":
                                    window.location.href = ("listar-usuarios.html");
                                break;
                        }
                    }, 3000);
                }
            }
        }
    }

}

function mostrarMsg(id_clase_error) {
    setTimeout(function () {
        document.getElementById(id_clase_error).classList.add("oculto");
    }, 3000);

    document.getElementById(id_clase_error).classList.remove("oculto");
}