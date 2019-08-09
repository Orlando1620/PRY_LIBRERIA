var data = {
    id: sessionStorage.getItem("id")
}
fetch('/adminGlobal/buscar', {
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
      function(json){  
			document.getElementById('correo').innerHTML = json['correo'];
			document.getElementById('nombre').innerHTML = json['nombre'];
			document.getElementById('apellidos').innerHTML = json['apellido1']+" "+json['apellido2'];
			document.getElementById('identificacion').innerHTML = json['identificacion'];
	  }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );


function nuevoAdmin(){
  window.location.href= "registrarAdminGlobal.html";
}