
var usuarioId;
var lati;
var longi;
var sexoBD = [];
var generosArray = [];
var generoArrayLength;

var data = {
	id: sessionStorage.getItem("id")
};

cargarGen();

function cargarGen() {
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
            console.log(json);
              generoArrayLength = json.length;
            for(var i=0;i<json.length;i++){
                generosArray = json;
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.value = json[i]['nombre'];
				checkbox.id ="genero"+i;
				checkbox.disabled = true;
                
                var div = document.createElement("div");
                div.classList.add("form-tercio");
    
                
                var label = document.createElement("label");
                var textNode = document.createTextNode(json[i]['nombre']);
                label.appendChild(textNode);
                
    
                div.appendChild(checkbox);
                div.appendChild(label);
                document.getElementById("genero").appendChild(div);
            }
			iniciarUC();
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );

}

function iniciarUC() {
	fetch('/sexo/listar', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(
			function (response) {
				if (response.status != 200)
					console.log('Ocurrió un error con el servicio: ' + response.status);
				else
					return response.json();
			}
		)
		.then(
			function (json) {
				console.log(json);
				for (var i = 0; i < json.length; i++) {
					sexoBD[i] = json[i]['sexo'];
					var opc = document.createElement("option");
					var textNode = document.createTextNode(json[i]['nombre']);
					opc.appendChild(textNode);

					document.getElementById("sexo").appendChild(opc);
				}
				cargarPerfilUC();
			}
		)
		.catch(
			function (err) {
				console.log('Ocurrió un error con la ejecución', err);
			}
		);
}
function cargarPerfilUC() {
	fetch('/usuarioCliente/perfil', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(
			function (response) {
				if (response.status != 200)
					console.log('Ocurrió un error con el servicio: ' + response.status);
				else
					return response.json();
			}
		)

		.then(
			function (json) {
				usuarioId = json['_id'];
				lati = json['latitud'];
				longi = json['longitud'];
				var correo = document.getElementById('correo');
				correo.value = json['correo'];
				correo.classList.add('inputActualizar');
				correo.readOnly = true;

				var nombre = document.getElementById('nombre');
				nombre.value = json['nombre'];
				nombre.classList.add('inputActualizar');
				nombre.readOnly = true;

				var apellidos1 = document.getElementById('primerApellido');
				apellidos1.value = json['apellido1'];
				apellidos1.classList.add('inputActualizar');
				apellidos1.readOnly = true;

				var apellidos2 = document.getElementById('segundoApellido');
				apellidos2.value = json['apellido2'];
				apellidos2.classList.add('inputActualizar');
				apellidos2.readOnly = true;

				document.getElementById("tipoIdentificacion").value = json['tipoIdentificacion'];

				var sexo = document.getElementById('sexo');
				sexo.classList.add('inputActualizar');

				

				sexo.value = json['sexo'];
				sexo.disabled = true;

				var identificacion = document.getElementById('identificacion');
				identificacion.value = json['identificacion'];
				identificacion.classList.add('inputActualizar');
				identificacion.readOnly = true;



				document.getElementById('profilepic').style.backgroundImage = "url(" + json['imgUrl'] + ")";

				var x = new Date(json['fechaNacimiento']);
				var myVar = x.toLocaleDateString();

				var fechanacimiento = document.getElementById('fechanacimiento');
				fechanacimiento.value = json['fechaNacimiento'];
				fechanacimiento.classList.add('inputActualizar');
				fechanacimiento.readOnly = true;


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


				document.getElementById('provincias').value = json['provincia'];
				document.getElementById('provincias').classList.add('inputActualizar');

				var canton = document.getElementById('cantones');
				var opc = document.createElement("option");
				var textNode = document.createTextNode(json['canton']);
				opc.appendChild(textNode);
				canton.appendChild(opc);
				canton.value = json['canton'];
				canton.classList.add('inputActualizar');

				var distrito = document.getElementById('distritos');
				var opcd = document.createElement("option");
				var textNoded = document.createTextNode(json['distrito']);
				opcd.appendChild(textNoded);
				distrito.appendChild(opcd);
				distrito.value = json['distrito'];
				distrito.classList.add('inputActualizar');

				var direccionExacta = document.getElementById('direccion');
				direccionExacta.value = json['direccionExacta'];
				direccionExacta.classList.add('inputActualizar');
				direccionExacta.readOnly = true;

				var lat = parseFloat(json['latitud']);
				var lng = parseFloat(json['longitud']);
				var coords = { lat, lng };
				console.log(coords);
				addMarker(coords);

				var genFavoritos = json['generosFav'];

				for (var i = 0; i < genFavoritos.length; i++) {

					for (var j = 0; j < generosArray.length; j++) {

						if (genFavoritos[i] == generosArray[j]['nombre']) {
							document.getElementById("genero" + j).checked = true;
						}
					}
				}

			}

		)


		.catch(
			function (err) {
				console.log('Ocurrió un error con la ejecución', err);
			}
		);

}



function mostrarModificarUC(e) {
	
	var nombre = document.getElementById('nombre');
	nombre.classList.remove('inputActualizar');
	nombre.classList.add('inputActualizando');
	nombre.readOnly = false;

	var apellidos1 = document.getElementById('primerApellido');
	apellidos1.classList.remove('inputActualizar');
	apellidos1.classList.add('inputActualizando');
	apellidos1.readOnly = false;

	var apellidos2 = document.getElementById('segundoApellido');
	apellidos2.classList.remove('inputActualizar');
	apellidos2.classList.add('inputActualizando');
	apellidos2.readOnly = false;

	var identificacion = document.getElementById('identificacion');
	identificacion.classList.remove('inputActualizar');
	identificacion.classList.add('inputActualizando');
	identificacion.readOnly = false;

	var fechaNacimiento = document.getElementById('fechanacimiento');
	fechaNacimiento.classList.remove('inputActualizar');
	fechaNacimiento.classList.add('inputActualizando');
	fechaNacimiento.readOnly = false;

	var sexo = document.getElementById('sexo');
	sexo.classList.remove('inputActualizar');
	sexo.classList.add('inputActualizando');
	sexo.disabled = false;

	var canton = document.getElementById('cantones');
	canton.classList.remove('inputActualizar');
	canton.classList.add('inputActualizando');
	canton.disabled = false;

	var distrito = document.getElementById('distritos');
	distrito.classList.remove('inputActualizar');
	distrito.classList.add('inputActualizando');
	distrito.disabled = false;

	var direccionExacta = document.getElementById('direccion');
	direccionExacta.classList.remove('inputActualizar');
	direccionExacta.classList.add('inputActualizando');
	direccionExacta.readOnly = false;

	var provincia = document.getElementById('provincias');
	provincia.classList.remove('inputActualizar');
	provincia.classList.add('inputActualizando');
	provincia.disabled = false;

	for (var i = 0; i < generoArrayLength; i++) {
			document.getElementById("genero" + i).disabled = false;
	}


	var boton = document.getElementById('guardarPerfilUC');
	boton.value = "Guardar";
	boton.removeAttribute("onclick");
	boton.addEventListener('click', modificarUsuarioClienteBD);

}

async function modificarUsuarioClienteBD() {
	var nombre = document.getElementById("nombre").value;
	var apellido1 = document.getElementById("primerApellido").value;
	var apellido2 = document.getElementById("segundoApellido").value;
	var correo = document.getElementById("correo").value;
	var fechaNacimiento = document.getElementById("fechanacimiento").value;
	var sexo = document.getElementById("sexo").value;
	var tipoIdentificacion = document.getElementById("tipoIdentificacion").value;
	var identificacion = document.getElementById("identificacion").value;
	var provincia = document.getElementById("provincias").value;
	var canton = document.getElementById("cantones").value;
	var distrito = document.getElementById("distritos").value;
	var direccionExacta = document.getElementById("direccion").value;
	var latitud = lati;
	var longitud = longi;

	/*var generos = [];
	var j = 0;
	for (var i = 0; i < generoLength; i++) {
		idGenero = document.getElementById("genero" + i).checked;
		if (idGenero) {
			generos[j] = arrayGeneros[i]['nombre'];
			j++;
		}
	}*/
	



	/*var id = usuarioId;
	var formData = new FormData(document.getElementById('form'));
    await fetch('/usuarioCliente/localUploadImg', {
    method: 'POST',
    body: formData,
    enctype: "multipart/form-data"
    });*/
	/*if (document.getElementById('foto').value != "") {
		var formData = new FormData(document.getElementById('form'));

		await fetch('/usuarioCliente/localUploadImg', {
			method: 'POST',
			body: formData,
			enctype: "multipart/form-data"
		});
		var data = {
			id: id,
			nombre: nombre,
			apellido1: apellido1,
			apellido2: apellido2,
			correo: correo,
			fechaNacimiento: fechaNacimiento,
			sexo: sexo,
			tipoIdentificacion: tipoIdentificacion,
			identificacion: identificacion,
			provincia: provincia,
			canton: canton,
			distrito: distrito,
			direccionExacta: direccionExacta,
			generosFav: generos,
			latitud: latitud,
			longitud: longitud,
			path: 'public/uploads/' + document.getElementById('foto').files[0]['name']
		};
	} else {*/

	var data = {
		id: sessionStorage.getItem('id'),
		nombre: nombre,
		apellido1: apellido1,
		apellido2: apellido2,
		correo: correo,
		fechaNacimiento: fechaNacimiento,
		sexo: sexo,
		tipoIdentificacion: tipoIdentificacion,
		identificacion: identificacion,
		provincia: provincia,
		canton: canton,
		distrito: distrito,
		direccionExacta: direccionExacta,
		latitud: latitud,
		longitud: longitud

	};
	//}







	fetch('/usuarioCliente/modificarUsuarioCliente', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	})
		.then(
			function (response) {
				if (response.status != 200)
					console.log('Ocurrió un error con el servicio: ' + response.status);
				else
					return response.json();
			}
		)
		.then(
			function (json) {
				if (json.result == "exito") {
					sessionStorage.setItem("nombre", nombre);
					window.location.href = "perfil-uc.html";
				} else {
					document.getElementById("msg-pop-info").innerHTML = "Ocurrió un error no se pudo actualizar";
          document.getElementById("msgInfo").classList.remove("oculto");
				}
			}
		)
		.catch(
			function (err) {
				console.log('Ocurrió un error con la ejecución', err);
			}
		);

}


