// JavaScript Document
var map;
// INICIALIZAR Y ANADIR EL MAPA
function initMap() {
  // LOCALIZACION
  var location = {lat: 	9.934739, lng: 	-84.087502};
 // MAPA
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 8, center: location}); 
}

function addMarker(coords){
	var marker = new google.maps.Marker({position: coords, map: map});
}

function centerMap(coords){
	map.setCenter(coords);
}


var data = {
	id: sessionStorage.getItem("id")
};

fetch('/usuarioCliente/perfil', {
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
			document.getElementById('sexo').innerHTML = json['sexo'];
			document.getElementById('identificacion').innerHTML = json['identificacion'];
			document.getElementById('profilepic').style.backgroundImage = "url("+json['imgUrl']+")";
			 
			var x = new Date(json['fechaNacimiento']);
			var myVar = x.toLocaleDateString(); 
			document.getElementById('fechanacimiento').innerHTML = myVar;
			
			var datej = json['fechaNacimiento'];
			
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
			

			document.getElementById('provincia').innerHTML = json['provincia']+",";
			document.getElementById('canton').innerHTML = json['canton']+",";
			document.getElementById('distrito').innerHTML = json['distrito'];
			document.getElementById('direccion').innerHTML = json['direccionExacta'];
			var lat = parseFloat(json['latitud']);
			var lng = parseFloat(json['longitud']);
			var coords = {lat,lng};
			console.log(coords);
			addMarker(coords);
			centerMap(coords);
			
			
			var generos = json['generosFav'];
			for(var j=0;j<generos.length;j++){
				var opc = document.createElement('li');
				var textNode = document.createTextNode(generos[j]);
				opc.appendChild(textNode);

				document.getElementById("generosul").appendChild(opc);
			}
			
        }
	  
  )


  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );


