/**
 * Funcion para el registro de un libro
 **/ 
async function addAutor(e){
  e.preventDefault();

  var esValido = validarCamposFormulario("form");
  if (esValido == false || validarForm() == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    if(validarFecha()){
      document.getElementById("alert").classList.add("oculto");
      registro();
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Fecha actual o en el futuro no es válida";  
    }
  }
}
  
function validarFecha(){
  var fecha = new Date(document.getElementById('nac').value);
  var hoy = new Date();
    if (hoy <= fecha) {
      return false;
    } else {
      return true;
    }
}


function validarForm(){
  var bio = document.getElementById('bio').value;

  if(bio == ""){
    document.getElementById("bio").classList.add('invalid');
    return false;
  } else {
    document.getElementById("bio").classList.remove('invalid');
    return true;
  }
  
}


async function modAutor(e){
  e.preventDefault();

  var esValido = validarCamposFormulario("form");
  if (esValido == false || validarForm() == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    if(validarFecha()){
      document.getElementById("alert").classList.add("oculto");
      modificar();
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Fecha actual o en el futuro no es válida";  
    }
  }
}