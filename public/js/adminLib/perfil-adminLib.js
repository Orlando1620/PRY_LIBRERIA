var sexoBd = [];
var usuarioId;
var tipoIdentificacion;
var data = {
	correo: sessionStorage.getItem("correo")
};
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
				sexoBd[i] = json[i]['nombre'];
			}
			pintarPerfil();
		}
	)
	.catch(
		function (err) {
			console.log('Ocurrió un error con la ejecución', err);
		}
	);

function pintarPerfil() {

	fetch('/adminLib/perfil', {
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
				for (var i = 0; i < json.length; i++) {
					usuarioId = json[i]['_id'];
					tipoIdentificacion = json[i]['tipoIdentificacion'];
					var correo = document.getElementById('emailAdmin');
					correo.value = json[i]['correo'];
					correo.classList.add('inputActualizar');
					correo.readOnly = true;

					var nombre = document.getElementById('nomAdmin');
					nombre.value = json[i]['nombre'];
					nombre.classList.add('inputActualizar');
					nombre.readOnly = true;

					var apellido1 = document.getElementById('apellido1');
					apellido1.value = json[i]['apellido1'];
					apellido1.classList.add('inputActualizar');
					apellido1.readOnly = true;

					var apellido2 = document.getElementById('apellido2');
					apellido2.value = json[i]['apellido2'];
					apellido2.classList.add('inputActualizar');
					apellido2.readOnly = true;

					var sexo = document.getElementById('sexo');

					sexo.classList.add('inputActualizar');


					for (var d = 0; d < sexoBd.length; d++) {
						var opc = document.createElement("option");
						var textNode = document.createTextNode(sexoBd[d]);
						opc.appendChild(textNode);
						sexo.appendChild(opc);



					}
					sexo.value = json[i]['tipoSexo'];
					sexo.disabled = true;


					var identificacion = document.getElementById('number_identificacion');
					identificacion.value = json[i]['identificacion'];
					identificacion.classList.add('inputActualizar');
					identificacion.readOnly = true;

					var fechaNacimiento = document.getElementById('fechaNaci_Admin');
					fechaNacimiento.value = json[i]['fechaNaci'];
					fechaNacimiento.classList.add('inputActualizar');
					fechaNacimiento.readOnly = true;



					var x = new Date(json[i]['fechaNaci']);
					var myVar = x.toLocaleDateString();

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
			function (err) {
				console.log('Ocurrió un error con la ejecución', err);
			}
		);
}

function mostrarModificarAL(e) {
	var correo = document.getElementById('emailAdmin');
	correo.classList.remove('inputActualizar');
	correo.classList.add('inputActualizando');
	correo.readOnly = false;

	var nombre = document.getElementById('nomAdmin');
	nombre.classList.remove('inputActualizar');
	nombre.classList.add('inputActualizando');
	nombre.readOnly = false;

	var apellido1 = document.getElementById('apellido1');
	apellido1.classList.remove('inputActualizar');
	apellido1.classList.add('inputActualizando');
	apellido1.readOnly = false;

	var apellido2 = document.getElementById('apellido2');
	apellido2.classList.remove('inputActualizar');
	apellido2.classList.add('inputActualizando');
	apellido2.readOnly = false;

	var identificacion = document.getElementById('number_identificacion');
	identificacion.classList.remove('inputActualizar');
	identificacion.classList.add('inputActualizando');
	identificacion.readOnly = false;

	var fechaNacimiento = document.getElementById('fechaNaci_Admin');
	fechaNacimiento.classList.remove('inputActualizar');
	fechaNacimiento.classList.add('inputActualizando');
	fechaNacimiento.readOnly = false;

	var sexo = document.getElementById('sexo');
	sexo.classList.remove('inputActualizar');
	sexo.classList.add('inputActualizando');
	sexo.disabled = false;




	var boton = document.getElementById('guardarPerfilAL');
	boton.value = "Guardar";
	boton.removeAttribute("onclick");
	boton.addEventListener('click', modificarAdminLibBD);




}
function modificarAdminLibBD() {


	var nombre = document.getElementById("nomAdmin").value;
	var apellido1 = document.getElementById("apellido1").value;
	var apellido2 = document.getElementById("apellido2").value;
	var correo = document.getElementById("emailAdmin").value;
	var fechaNaci = document.getElementById("fechaNaci_Admin").value;
	var tipoIdentificacion = tipoIdentificacion;
	var identificacion = document.getElementById("number_identificacion").value;
	var tipoSexo = document.getElementById("sexo").value;
	id = usuarioId;

	var data = {
		id: id,
		nombre: nombre,
		apellido1: apellido1,
		apellido2: apellido2,
		correo: correo,
		fechaNaci: fechaNaci,
		tipoSexo: tipoSexo,
		tipoIdentificacion: tipoIdentificacion,
		identificacion: identificacion

	};

	fetch('/adminLib/modificarUsuarioAdminLib', {
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
					window.location.href = "perfil-adminLib.html";
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
