'use strict';

if(sessionStorage.getItem("nombre") == null){
    document.getElementById("usrName").innerHTML = "Iniciar Sesión";
    document.getElementById("c-r").innerHTML = "Registrarse";

    document.getElementById("usrName").href = "index.html";
    document.getElementById("c-r").href = "registrarUC.html";
} else {
    window.location.href = "homePage.html";
}

var id_alert_error = "alert";
var id_alert_long = "alert_long";
var id_alert_cred = "alert_cred";

async function login() {
    //debugger;
    var correo = document.getElementById('correo').value;
    var contrasena = document.getElementById('contraseNa').value;

    if (correo != "" && contrasena != "") {
            //debugger;
            let user = await iniciar_sesion(correo, contrasena);

            if (user !== null) {
                sessionStorage.setItem("correo", user.correo);
                sessionStorage.setItem("tipo", user.tipo);
                sessionStorage.setItem("nombre", user.nombre);
                sessionStorage.setItem("id", user._id);

                window.location.href = ("homePage.html");
            } else {
                mostrarMsg(id_alert_cred);
            }
    } else {
        validaCorreo(document.getElementById('correo'));
        validaContrasena(document.getElementById('contraseNa'));
        //mostrarMsg("Los campos son requeridos");
    }
}

function validaCorreo(event) {

    if (event.value == "") {
        document.getElementById("correo").classList.remove("correo");
        document.getElementById("correo").classList.add("invalid");
        mostrarMsg(id_alert_error);
    } else {
        document.getElementById("correo").classList.add("correo");
        document.getElementById("correo").classList.remove("invalid");
    }
}


function validaContrasena(event) {
    if (event.value == "") {
        document.getElementById("contraseNa").classList.remove("ContraseNa");
        document.getElementById("contraseNa").classList.add("invalid");
        mostrarMsg(id_alert_error);
    } else {
        document.getElementById("contraseNa").classList.add("ContraseNa");
        document.getElementById("contraseNa").classList.remove("invalid");
    }
}


function mostrarMsg(id_clase_error) {
    setTimeout(function () {
        document.getElementById(id_clase_error).classList.add("oculto");
    }, 3000);

    document.getElementById(id_clase_error).classList.remove("oculto");
}

function validarLongContrasena(contrasena) {
    if (contrasena.length >= 8) {
        return true;
    } else {
        mostrarMsg(id_alert_long);
        return false;
    }

}