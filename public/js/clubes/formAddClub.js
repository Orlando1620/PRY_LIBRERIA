// JavaScript Document

var formato = "virtual";

function virtual(){
    document.getElementById("sucursal").classList.add("oculto");
	  document.getElementById("titleSucursal").classList.add("oculto");

    document.getElementById("tab-digital").classList.remove("tab-unselected");
    document.getElementById("tab-digital").classList.add("tab-selected");

    document.getElementById("tab-impreso").classList.add("tab-unselected");
    document.getElementById("tab-impreso").classList.remove("tab-selected");

    document.getElementById("sucursal").required = false;
    
    formato = "virtual";
}

function fisico(){
    document.getElementById("sucursal").classList.remove("oculto");
	  document.getElementById("titleSucursal").classList.remove("oculto");

    document.getElementById("tab-impreso").classList.remove("tab-unselected");
    document.getElementById("tab-impreso").classList.add("tab-selected");

    document.getElementById("tab-digital").classList.add("tab-unselected");
    document.getElementById("tab-digital").classList.remove("tab-selected");

    document.getElementById("sucursal").required = true;
    
    formato = "fisico";
}

function addClub(e){
    
    switch(formato){
        case "virtual":
            var esValido = validarCamposFormulario("form");
            if (esValido == false || validarFormDig() == false) {
              validarFormDig();
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
                return false;
            }
            e.preventDefault();
            registroVirtual();
            break;
        case "fisico":
            var esValido = validarCamposFormulario("form");
            if (esValido == false || validarFormFis() == false) {
              validarFormFis();
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
                return false;
            }
            e.preventDefault();
            registroFisico();
            break;
    }
}

function validarFormDig(){
  var espaciosVacios = [];
  var genero = document.getElementById('genero').value;
  var dia = document.getElementById('dia').value;
  var libro = document.getElementById('libro').value;
  var desc = document.getElementById('desc').value.trim();

  if(genero == "Seleccione un género"){
      espaciosVacios.push('genero');
  } else {
      document.getElementById("genero").classList.remove('invalid');
  }
  if(dia == "Seleccione un día"){
      espaciosVacios.push('dia');
  } else {
      document.getElementById("dia").classList.remove('invalid');
  }
  if(libro == "Seleccione un libro"){
      espaciosVacios.push('libro');
  } else {
      document.getElementById("libro").classList.remove('invalid');
  }
  if(desc == ""){
    espaciosVacios.push('desc');
  } else {
      document.getElementById("desc").classList.remove('invalid');
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

function validarFormFis(){
  var espaciosVacios = [];
  var genero = document.getElementById('genero').value;
  var dia = document.getElementById('dia').value;
  var libro = document.getElementById('libro').value;
  var desc = document.getElementById('desc').value.trim();
  var sucursal = document.getElementById('sucursal').value;

  if(genero == "Seleccione un género"){
      espaciosVacios.push('genero');
  } else {
      document.getElementById("genero").classList.remove('invalid');
  }
  if(dia == "Seleccione un día"){
      espaciosVacios.push('dia');
  } else {
      document.getElementById("dia").classList.remove('invalid');
  }
  if(libro == "Seleccione un libro"){
      espaciosVacios.push('libro');
  } else {
      document.getElementById("libro").classList.remove('invalid');
  }
  if(sucursal == "Seleccione una sucursal"){
    espaciosVacios.push('sucursal');
  } else {
      document.getElementById("sucursal").classList.remove('invalid');
  }
  if(desc == ""){
    espaciosVacios.push('desc');
  } else {
      document.getElementById("desc").classList.remove('invalid');
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
//LISTAR GENEROS
fetch('/genero/listar', {
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
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("genero").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );

//LISTAR LIBROS
fetch('/libro/listar', {
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
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.value = json[i]['_id'];
            opc.appendChild(textNode);

            document.getElementById("libro").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );

//LISTAR SUCURSALES
fetch('/sucursal/listarTodo', {
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
        var opc = document.createElement("option");
        var textNode = document.createTextNode("Seleccione una sucursal");
        opc.appendChild(textNode);

        document.getElementById("sucursal").appendChild(opc);
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombreSucursal']);
            opc.value = json[i]['_id'];
            opc.appendChild(textNode);

            document.getElementById("sucursal").appendChild(opc);
        }
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );