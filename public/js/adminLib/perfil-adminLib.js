
var data = {
	correo: sessionStorage.getItem("correo")
};

fetch('/adminLib/perfil', {
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
        for(var i=0;i<json.length;i++){
			document.getElementById('correo').innerHTML = json[i]['correo'];
			document.getElementById('nombre').innerHTML = json[i]['nombre'];
			document.getElementById('apellido1').innerHTML = json[i]['apellido1'];
			document.getElementById('apellido2').innerHTML = json[i]['apellido2'];
			document.getElementById('sexo').innerHTML = json[i]['tipoSexo'];
			document.getElementById('identificacion').innerHTML = json[i]['identificacion'];
			 
			var x = new Date(json[i]['fechaNaci']);
			var myVar = x.toLocaleDateString(); 
			document.getElementById('fechanacimiento').innerHTML = myVar;
			
			var datej = json[i]['fechaNaci'];
			
			console.log(datej);
			//getAge(datej);
			
			var today = new Date();
    		var birthDate = new Date(datej);
    		var age = today.getFullYear() - birthDate.getFullYear();
    		var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age = age - 1;
			}
			document.getElementById('edad').innerHTML = age;
			
        }
	  }
  )


  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );
