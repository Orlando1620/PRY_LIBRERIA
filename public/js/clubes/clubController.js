// JavaScript Document
if(sessionStorage.getItem("nombre") == null){
  window.location.href = "login.html";
}



async function registroVirtual(){
  try{
    var horaInicio = document.getElementById('horaInicio').value;
    var horaFinal = document.getElementById('horaFinal').value;

    if(horaInicio < horaFinal){
      var data = {
        nombre: document.getElementById('nombre').value,
        genero: document.getElementById('genero').value,
        tipo: "Virtual",
        dia: document.getElementById('dia').value,	
        horaInicio: horaInicio,
        horaFinalizacion: horaFinal,
        libro: document.getElementById('libro').value,
        descripcion: document.getElementById('desc').value,
        creador: sessionStorage.getItem("id")
      };
      
      var response  = await fetch('/clubes/addVirtual', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
      });

      var result = await response.json();
      
      msg = result['result'];
      console.log(msg);
      switch(msg){
          case 'repetido':
              document.getElementById("alert").classList.remove("oculto");
              document.getElementById("msg").innerHTML = "Un club de lectura con el mismo nombre ya fue registrado";
              break;
          case 'exito':
              document.getElementById("alert").classList.add("oculto");
              registrarBitacora(sessionStorage.getItem("correo"),'registro club de lectura: '+document.getElementById("nombre").value);
              window.location.href = "listar-clubes.html";
              break;
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "La hora de final debe ser despues de la hora de inicio";
    }
  } catch(err) {
    console.log('Ocurrió un error con la ejecución', err);
  }
}

async function registroFisico(){
  try{
    var horaInicio = document.getElementById('horaInicio').value;
    var horaFinal = document.getElementById('horaFinal').value;

    if(horaInicio < horaFinal){
      var data = {
        nombre: document.getElementById('nombre').value,
        genero: document.getElementById('genero').value,
        tipo: "Físico",
        dia: document.getElementById('dia').value,	
        horaInicio: horaInicio,
        horaFinalizacion: horaFinal,
        libro: document.getElementById('libro').value,
        sucursal: document.getElementById('sucursal').value,
        descripcion: document.getElementById('desc').value,
        creador: sessionStorage.getItem("id")
      };
      
      var response  = await fetch('/clubes/addFisico', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
      });

      var result = await response.json();
      
      msg = result['result'];
      console.log(msg);
      switch(msg){
          case 'repetido':
              document.getElementById("alert").classList.remove("oculto");
              document.getElementById("msg").innerHTML = "Un club de lectura con el mismo nombre ya fue registrado";
              break;
          case 'exito':
              document.getElementById("alert").classList.add("oculto");
              registrarBitacora(sessionStorage.getItem("correo"),'registro club de lectura: '+document.getElementById("nombre").value);
              window.location.href = "listar-clubes.html";
              break;
      }
    } else {
      document.getElementById("alert").classList.remove("oculto");
      document.getElementById("msg").innerHTML = "La hora de final debe ser despues de la hora de inicio";
    }
  } catch(err) {
    console.log('Ocurrió un error con la ejecución', err);
  }
}

function nuevoClub(e){
  window.location.href = "registrar-club.html";
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