/**
 * Funcion para el registro de un usuario
 **/
async function addUsuario(e){
    var esValido = validarCamposFormulario("form");
    if (esValido == false || validarForm() == false) {
        validarForm();
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
        return false;
    } else {
        var correo = document.getElementById('correo').value;
        if(validarCorreo(correo)){
            if(validarFecha()){
                if(lat != 0){
                    e.preventDefault();
                    registrarUsuario(); 
                } else {
                    document.getElementById("alert").classList.remove("oculto");
                    document.getElementById("msg").innerHTML = "Debe marcar su localización en el mapa";
                }
                
            } else{
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Fecha actual o en el futuro no es válida";
            }
        } else {
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "Formato del correo electrónico no es válido";
        }
    }
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
    var fecha = new Date(document.getElementById('fechaNacimiento').value);
    var hoy = new Date();
      if (hoy <= fecha) {
        return false;
      } else {
        return true;
      }
}


function validarForm(){
    var espaciosVacios = [];
    var sexo = document.getElementById('sexo').value;
    var tipoIdentificacion = document.getElementById('tipoIdentificacion').value;
    var provincias = document.getElementById('provincias').value;
    var cantones = document.getElementById('cantones').value;
    var distritos = document.getElementById('distritos').value;
  
    if(sexo == "Seleccione un género"){
        espaciosVacios.push('sexo');
    } else {
        document.getElementById("sexo").classList.remove('invalid');
    }
    if(tipoIdentificacion == "Seleccione un tipo de identificación"){
        espaciosVacios.push('tipoIdentificacion');
    } else {
        document.getElementById("tipoIdentificacion").classList.remove('invalid');
    }
    if(provincias == "Seleccione una provincia"){
        espaciosVacios.push('provincias');
    } else {
        document.getElementById("provincias").classList.remove('invalid');
    }
    if(cantones == "Seleccione un cantón"){
        espaciosVacios.push('cantones');
    } else {
        document.getElementById("cantones").classList.remove('invalid');
    }
    if(distritos == "Seleccione un distrito"){
      espaciosVacios.push('distritos');
    } else {
      document.getElementById("distritos").classList.remove('invalid');
    }
    if(espaciosVacios.length > 0){
        for(var i=0;i<espaciosVacios.length;i++){
            document.getElementById(espaciosVacios[i]).classList.add('invalid');
        }
        return false;
    } else {
        var elements = document.getElementsByClassName('form-control');
        for(var i=0;i<elements.length;i++){
            document.getElementById(elements[i].id).classList.remove('invalid');
        }
        return true;
    }
    
  }

function recCont(e){
    var esValido = validarCamposFormulario("form");
    if (esValido == false) {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Complete los espacios requeridos.";
        return false;
    } else {
        e.preventDefault();
        recuperarContrasena(); 
    }
}