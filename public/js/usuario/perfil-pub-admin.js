window.onload = function () {
	fillPerfil();
}

var libros = [];
var misLibros = [];
var idLibro;
var usuario;

async function fillPerfil(){
	
	try{
        var data = {
            id: localStorage.getItem("idUsuario")
        };
        var response = await fetch('/usuario/perfil', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        });
        usuario = await response.json();
        console.log(usuario);

        switch(usuario['tipo']){
            case "usuarioCliente":
                document.getElementById('uc').classList.remove('oculto');
                perfilUc();
                break;
            case "AdminLib":
                document.getElementById('lib').classList.remove('oculto');
                perfilAdminLib();
                break;
            case "adminGlobal":
                document.getElementById('global').classList.remove('oculto');
                perfilAdminGlobal();
                break;
        }
		
	} catch (err) {
		console.log('Ocurrió un error con la ejecución', err);
	}
}

//UC
var libros = [];
var misLibros = [];
var idLibro;
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

async function perfilUc(){

    var data = {
        id: localStorage.getItem("idUsuario")
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
          async function(json){  
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
            addMarker(coords);
            centerMap(coords);
            
            
            var generos = json['generosFav'];
            for(var j=0;j<generos.length;j++){
                var opc = document.createElement('li');
                var textNode = document.createTextNode(generos[j]);
                opc.appendChild(textNode);

                document.getElementById("generosul").appendChild(opc);
            }

            misLibros = json['libros'];

            var data = {
                usuario2:localStorage.getItem("idUsuario")
              }
              var response = await fetch('/califUsuario/listar', {
                  method: 'POST',
                  body: JSON.stringify(data),
                  headers:{'Content-Type': 'application/json'}
              })
              califs = await response.json();
              
              if(califs.length != 0){
                  var calif = 0;
                  for(var j=0;j<califs.length;j++){
                      calif += califs[j]['calif'];
                  }
                  calif = calif/califs.length;
                  calif = Math.round(calif);
        
                  for(var j=0;j<calif;j++){
                      var icon = document.createElement("i");
                      icon.classList.add("fas");
                      icon.classList.add("fa-book");
                      icon.classList.add("calif-true");
                      document.getElementById('calif').appendChild(icon);
                  }
        
                  for(var j=0;j<5-calif;j++){
                      var icon = document.createElement("i");
                      icon.classList.add("fas");
                      icon.classList.add("fa-book");
                      icon.classList.add("calif-false");
                      document.getElementById('calif').appendChild(icon);
                  }
        
              } else {
                  var califT = document.createTextNode("");
                  document.getElementById('calif').appendChild(califT);
              }

            fillTable();
        })
        .catch(
            function(err) {
            console.log('Ocurrió un error con la ejecución', err);
            }
        );
}

async function fillTable(){

    var response = await fetch('/libro/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    });
    libros = await response.json();

    var list = document.getElementById("table");
    removeElements(list);

    for(var i=0;i<misLibros.length;i++){
            
        var tr = document.createElement("tr");

        var td = document.createElement("td");
        var libro = document.createElement('a');
        var cover = document.createElement('img');
        for(var j=0;j<libros.length;j++){
            if(libros[j]['_id'] == misLibros[i][0]['libro']){
                libro.appendChild(document.createTextNode(libros[j]['nombre']));
                libro.id = libros[j]['_id'];
                cover.src = libros[j]['urlImg'];
            }
        }
        td.appendChild(cover);
        tr.appendChild(td);

        var td = document.createElement("td");
        libro.href = "#";
        libro.addEventListener('click', perfil); 
        td.appendChild(libro);
        tr.appendChild(td);

        var td = document.createElement("td");
        var calif = misLibros[i][0]['calif'];
        if(calif != 0){
            
            for(var j=0;j<calif;j++){
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-book");
                icon.classList.add("calif-true");
                td.appendChild(icon);
            }

            for(var j=0;j<5-calif;j++){
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-book");
                icon.classList.add("calif-false");
                td.appendChild(icon);
            }
        } else {
            td.appendChild(document.createTextNode('Este libro no ha sido valorado'));
		}
		tr.appendChild(td);

        document.getElementById("table").appendChild(tr);
    
    }

    if(misLibros.length == 0){
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var text = document.createTextNode("Aún no ha adquirido ningún libro");
        td.colSpan = 5;
        td.appendChild(text);
        td.style.textAlign = 'center'; 
        tr.appendChild(td);
        document.getElementById("table").appendChild(tr);
    }
}

function filtrarNombre(){
    var list = document.getElementById("table");
    removeElements(list);
    var nombreReq = document.getElementById('buscar').value;
    nombreReq = nombreReq.toLowerCase();
    
    if(misLibros.length>0){
        var resultados = 0;
        for(var i=0;i<misLibros.length;i++){

            var nombreRes;
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == misLibros[i][0]['libro']){
                    nombreRes = libros[j]['nombre'];
                }
            }
            nombreRes = nombreRes.toLowerCase();

            if(nombreRes.includes(nombreReq)){
                resultados++;
                var tr = document.createElement("tr");

				var td = document.createElement("td");
				var libro = document.createElement('a');
				var cover = document.createElement('img');
				for(var j=0;j<libros.length;j++){
					if(libros[j]['_id'] == misLibros[i][0]['libro']){
						libro.appendChild(document.createTextNode(libros[j]['nombre']));
						libro.id = libros[j]['_id'];
						cover.src = libros[j]['urlImg'];
					}
				}
				td.appendChild(cover);
				tr.appendChild(td);

				var td = document.createElement("td");
				libro.href = "#";
				libro.addEventListener('click', perfil); 
				td.appendChild(libro);
				tr.appendChild(td);

				var td = document.createElement("td");
				var calif = misLibros[i][0]['calif'];
				if(calif != 0){
					
					for(var j=0;j<calif;j++){
						var icon = document.createElement("i");
						icon.classList.add("fas");
						icon.classList.add("fa-book");
						icon.classList.add("calif-true");
						td.appendChild(icon);
					}

					for(var j=0;j<5-calif;j++){
						var icon = document.createElement("i");
						icon.classList.add("fas");
						icon.classList.add("fa-book");
						icon.classList.add("calif-false");
						td.appendChild(icon);
					}
				} else {
					td.appendChild(document.createTextNode('Este libro no ha sido valorado'));
				}
				tr.appendChild(td);

				document.getElementById("table").appendChild(tr);
            }
        }
        if(resultados == 0){
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "No se encontraron resultados";
        } else {
            document.getElementById("alert").classList.add("oculto");
        }
    }
}

function removeElements(list){
    
    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }

    var tr = document.createElement("tr");
    var td = document.createElement("td");

    var libro = document.createTextNode("Nombre");
    td.colSpan = 2;
    td.appendChild(libro);
    tr.appendChild(td);

    var td = document.createElement("td");
    var calif = document.createTextNode("Calificación");
    td.appendChild(calif);
	tr.appendChild(td);
	

    tr.classList.add('table-titles')
    document.getElementById("table").appendChild(tr);
}

function perfil(e){
    var a = e.target;
    var id = a.id;
    sessionStorage.setItem("idLibro",id);
    window.location.href = "perfil-libro.html";
}

//AdminLib
function perfilAdminLib(){
    var data = {
        id: localStorage.getItem("idUsuario")
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
                document.getElementById('correoLib').innerHTML = json[i]['correo'];
                document.getElementById('nombreLib').innerHTML = json[i]['nombre'];
                document.getElementById('apellido1Lib').innerHTML = json[i]['apellido1'];
                document.getElementById('apellido2Lib').innerHTML = json[i]['apellido2'];
                document.getElementById('sexoLib').innerHTML = json[i]['tipoSexo'];
                document.getElementById('identificacionLib').innerHTML = json[i]['identificacion'];
                 
                var x = new Date(json[i]['fechaNaci']);
                var myVar = x.toLocaleDateString(); 
                document.getElementById('fechanacimientoLib').innerHTML = myVar;
                
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
                document.getElementById('edadLib').innerHTML = age;
                
            }
          }
      )
    
    
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
    
}

//AdminGlobal
function perfilAdminGlobal(){
    var data = {
        id: localStorage.getItem("idUsuario")
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
                document.getElementById('correoGlobal').innerHTML = json['correo'];
                document.getElementById('nombreGlobal').innerHTML = json['nombre'];
                document.getElementById('apellidosGlobal').innerHTML = json['apellido1']+" "+json['apellido2'];
                document.getElementById('identificacionGlobal').innerHTML = json['identificacion'];
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
    
    
}
