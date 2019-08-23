async function modificarImpuesto() {


    if (document.getElementById('impuesto').value == "") {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "Favor rellenar el espacio.";
      setTimeout(function() {
        window.location.href = "modificarImpuesto.html";
      }, 2000);
  
      return false;
  
    } else if ((document.getElementById('impuesto').value >= 101) || (document.getElementById('impuesto').value == 0)) {
  
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "El número no es válido para ser almacenado.";
      setTimeout(function() {
        window.location.href = "modificarImpuesto.html";
      }, 2000);
  
    } else {
  
      try {
  
        var data = {
  
          valor: document.getElementById('impuesto').value
        };
        var response = await fetch('/impuesto/modificar', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        document.getElementById("alert").classList.add("oculto");
        registrarBitacora(sessionStorage.getItem("correo"), 'Modificación de impuesto: ' + document.getElementById("impuesto").value);
        document.getElementById("alert-success").classList.remove("oculto");
        document.getElementById("msg-success").innerHTML = "Impuesto modificado con éxito.";
        setTimeout(function() {
          window.location.href = "modificarImpuesto.html";
        }, 2000);
  
      } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    }
  
    
  }


async function cargarImp(){
  var response = await fetch('/impuesto/listar', {
    method: 'GET',
    headers:{'Content-Type': 'application/json'}
  })
  impuestoJson = await response.json();
  document.getElementById('impuesto').value = impuestoJson[0]['valor'];
}
cargarImp();

function registrarBitacora(correo, accion) {
  var data = {
    correo: correo,
    accion: accion,
    fecha: new Date()
  };
  fetch('/bitacora/add', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
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
  