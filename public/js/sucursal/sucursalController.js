if(sessionStorage.getItem("tipo") == "adminGlobal"){
  document.getElementById("librerias").classList.remove("oculto");
  document.getElementById("btnRegistrarGlobal").classList.remove("oculto");

  document.getElementById("btnRegistrarLib").classList.add("oculto");

  fetch('/libreria/listar', {
    method: 'GET',
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
  .then(
      function(json){
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombreComercial']);
            opc.appendChild(textNode);
  
            document.getElementById("libreria").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );
}


async function registrarSucursalLib(e) {
  e.preventDefault();
  var nombreLibreria = await datosUsuario();
  var esValido = validarCamposFormulario("form");
  if (esValido == false ||validarForm() == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    var tel = document.getElementById("numeroSucursal").value;
    if(validarTel(tel)){
      if(lat != 0){
        document.getElementById("alert").classList.add("oculto");
        registro(nombreLibreria);
      } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Debe indicar su localización en el mapa";
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "El formato del teléfono no es válido";
    }
  }
  
}

async function registrarSucursalGlobal(e) {
  e.preventDefault();
  var nombreLibreria = document.getElementById("libreria").value;
  var esValido = validarCamposFormulario("form");
  if (esValido == false ||validarForm() == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    var tel = document.getElementById("numeroSucursal").value;
    if(validarTel(tel)){
      if(lat != 0){
        document.getElementById("alert").classList.add("oculto");
        registro(nombreLibreria);
      } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Debe indicar su localización en el mapa";
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "El formato del teléfono no es válido";
    }
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

function validarForm(){
  var espaciosVacios = [];
  var provincias = document.getElementById('provincias').value;
  var cantones = document.getElementById('cantones').value;
  var distritos = document.getElementById('distritos').value;

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
