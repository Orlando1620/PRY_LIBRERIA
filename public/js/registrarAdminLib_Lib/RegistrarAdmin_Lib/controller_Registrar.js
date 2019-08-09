'use strict';

var id_alert = "alert";
var id_alert_correo = "alert_correo";
var id_alert_mapa = "alert_mapa";

var nombre = document.getElementById('nomAdmin');
var apellido1 = document.getElementById('apellido1');
var apellido2 = document.getElementById('apellido2');
var correo = document.getElementById('emailAdmin');
var fechaNaci = document.getElementById('fechaNaci_Admin');
var tipoIdentificacion = document.getElementById('tipo_identificacion');
var numberIdentificacion = document.getElementById('number_identificacion');
var tipoSexo = document.getElementById('sexo');

var nombreComercial = document.getElementById('nomComercial');
var nombreFantasia = document.getElementById('nomFantasia');
var provincia = document.getElementById('provincias');
var canton = document.getElementById('cantones');
var distrito = document.getElementById('distritos');
var direccion = document.getElementById('dirExacta');
var telefono = document.getElementById('telefono');

async function obtener_datos() {
    
    var esValido = validarCamposFormulario("form");
    if (esValido == false) {
        mostrarMensaje({codigo: id_alert});
        return false;
    }
    if (validarCorreo(correo.value) == false) {
        console.log("correo");
        mostrarMensaje({codigo: "alert_correo_form"});
        return false;
    }
    if (validarFecha() == false) {
        mostrarMensaje({codigo: "alert_fecha"});
        return false;
    }
    if (validarTel(telefono.value) == false) {
        mostrarMensaje({codigo: "alert_tel"});
        return false;
    }

    
    var contrasena = contrasenaAleatoria();
    let response = await registrar_Adimin_Lib(nombre.value, apellido1.value, apellido2.value, correo.value, fechaNaci.value, tipoIdentificacion.value, numberIdentificacion.value, tipoSexo.value, nombreComercial.value, nombreFantasia.value, provincia.value, canton.value, distrito.value, direccion.value, telefono.value, lat, lng, contrasena);
    mostrarMensaje(response, contrasena);
}

function mostrarMensaje(respuesta, contrasena) {
    switch (respuesta.codigo) {
        case 'mapaNoSelect':
            mostrarMsg('alert_mapa');
            break;

        case 'exitoso':
            enviarContrasena(contrasena);
            registrarBitacora(correo.value,'registro libreria: '+nombreComercial);
            window.location.href = "homePage.html";
            break;

        case 'CORREO_DUPLI':
            mostrarMsg('alert_correo');
            break;

        case 'alert':
            mostrarMsg(id_alert);
            break;
        case 'alert_correo_form':
            mostrarMsg('alert_correo_form');
            break;
        case 'alert_fecha':
            mostrarMsg('alert_fecha');
            break;
        case 'alert_tel':
            mostrarMsg('alert_tel');
            break;
    }
}

function mostrarMsg(id_clase_error) {
    setTimeout(function () {
        document.getElementById(id_clase_error).classList.add("oculto");
    }, 5000);
    document.getElementById(id_clase_error).classList.remove("oculto");
}

function contrasenaAleatoria() {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < 8; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}

function registrarBitacora(correo,accion){
    var data = {
        correo: correo,
        accion: accion,
        fecha: new Date()
    };
    fetch('/bitacora/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
    .then(
        function(response) {
        if (response.status != 200)
            console.log('Ocurrió un error con el servicio: ' + response.status);
        else
            return response.json();
        }
    )
    .catch(
        function(err) {
        console.log('Ocurrió un error con la ejecución', err);
        }
    );
}

function enviarContrasena(contrasena){
    var data = {
        contrasena: contrasena,
        correo: document.getElementById("emailAdmin").value
    };
    
    fetch('/adminLib/enviarContrasena', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
}

function validarCorreo(correo){
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(correo.match(format)){
        return true;
    } else {
        return false;
    }
} 

function validarFecha(){
    var fecha = new Date(document.getElementById('fechaNaci_Admin').value);
    var hoy = new Date();
      if (hoy <= fecha) {
        return false;
      } else {
        return true;
      }
}

function validarTel(tel){
    var format = /^\d{8}$/;
    if(tel.match(format)){
        return true;
    } else {
        return false;
    }
}
