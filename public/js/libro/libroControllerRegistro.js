var formato = 'digital';
var sizeImg = false;
/**
 * Funcion para el registro de un libro
 **/ 
async function addLibro(e){
  e.preventDefault();
  var esValido = validarCamposFormulario("form");
  if (esValido == false || validarForm() == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    var pisbn = document.getElementById("isbn").value;
    //Valida el ISBN
    var validarIsbn = await validarISBN(pisbn);
    if(validarIsbn){
      switch(formato){
        case 'digital':
            registroDigital();
            break;
        case 'impreso':
            registroImpreso();
            break;    
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "El código ISBN es inválido";
    }
  }
  
}

async function modLibro(e){
  e.preventDefault();
  var esValido = validarCamposFormulario("form");
  if (esValido == false || validarForm() == false) {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
      return false;
  } else {
    var pisbn = document.getElementById("isbn").value;
    //Valida el ISBN
    var validarIsbn = await validarISBN(pisbn);
    if(validarIsbn){
      switch(formato){
        case 'digital':
            modDigital();
            break;
        case 'impreso':
            modImpreso();
            break;    
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "El código ISBN es inválido";
    }
  }
  
}

function validarISBN(isbn){
    var data = {
        isbn: isbn
    };
    return fetch('/libro/validarISBN', {
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
      .then(
          function(response){
            var validate = response;
            return validate;
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
}

function digital(){
    document.getElementById("pdf-title").classList.remove("oculto");
    document.getElementById("pdf-file").classList.remove("oculto");

    document.getElementById("pdf").required = true;

    formato = 'digital';
}

function impreso(){
    document.getElementById("pdf-title").classList.add("oculto");
    document.getElementById("pdf-file").classList.add("oculto");

    document.getElementById("pdf").required = false;

    formato = 'impreso';
}

function validarForm(){
  var espaciosVacios = [];
  var idioma = document.getElementById('idioma').value;
  var autor = document.getElementById('autor').value;
  var gen = document.getElementById('genero').value;
  var cat = document.getElementById('categoria').value;
  var desc = document.getElementById('desc').value;

  if(idioma == "Seleccione un idioma"){
      espaciosVacios.push('idioma');
  } else {
      document.getElementById("idioma").classList.remove('invalid');
  }
  if(autor == "Seleccione un autor"){
      espaciosVacios.push('autor');
  } else {
      document.getElementById("autor").classList.remove('invalid');
  }
  if(gen == "Seleccione un género"){
      espaciosVacios.push('genero');
  } else {
      document.getElementById("genero").classList.remove('invalid');
  }
  if(cat == "Seleccione una categoría"){
      espaciosVacios.push('categoria');
  } else {
      document.getElementById("categoria").classList.remove('invalid');
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




