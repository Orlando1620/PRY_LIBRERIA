window.onload = function () {
	fillPerfil();
	fillSucursales();
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
	var response = await fetch('/usuarioCliente/perfil', {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'Content-Type': 'application/json'}
	});
	usuario = await response.json();

	document.getElementById('nombre').innerHTML = usuario['nombre']+" "+usuario['apellido1']+" "+usuario['apellido2'];
	document.getElementById('profilepic').style.backgroundImage = "url("+usuario['imgUrl']+")";
    misLibros = usuario['libros'];
    
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
		
	} catch (err) {
		console.log('Ocurrió un error con la ejecución', err);
	}
}

async function fillTable(){

    var response = await fetch('/libro/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    });
    libros = await response.json();

    var data = {
        id: localStorage.getItem("idUsuario")
    };
    
    

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

		var td = document.createElement("td");
		var btn = document.createElement('button');
		btn.innerHTML = 'Solicitar intercambio';
		btn.id = misLibros[i][0]['libro'];
		btn.addEventListener('click', intercambio);
		btn.classList.add('submit');
		td.appendChild(btn);
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
				
				var td = document.createElement("td");
				var btn = document.createElement('button');
				btn.innerHTML = 'Solicitar intercambio';
				btn.id = misLibros[i][0]['libro'];
				btn.addEventListener('click', intercambio);
				btn.classList.add('submit');
				td.appendChild(btn);
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
	
	var td = document.createElement("td");
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


function intercambio(e){
    document.getElementById('pop-up-intercambio').classList.remove('oculto');
    var a = e.target;
    idLibro = a.id;
}
  
async function aceptarIntercambio(e){
    try{
        var esValido = validarCamposFormulario("form");
        if (esValido == false || validarForm() == false) {
            validarForm();
            document.getElementById("alert-intercambio").classList.remove("oculto");
            document.getElementById("msg-intercambio").innerHTML = "Complete los espacios requeridos";
            return false;
        }
        e.preventDefault();
        if(validarFecha()){
        document.getElementById("alert-intercambio").classList.add("oculto");
        var data = {
            libro: idLibro,
            sucursal: document.getElementById('sucursales').value,
            fecha: document.getElementById('fecha-intercambio').value,
            hora: document.getElementById('hora-intercambio').value,
            usuario1: sessionStorage.getItem('id'),
            usuario2: localStorage.getItem('idUsuario')
        };
        
        var response  = await fetch('/intercambio/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        });

        var result = await response.json();
        
        msg = result['result'];
        switch(msg){
            case 'repetido':
                document.getElementById("alert-intercambio").classList.remove("oculto");
                document.getElementById("msg-intercambio").innerHTML = "Ya envió una solicitud por este libro";
                break;
            case 'exito':
                document.getElementById("alert-intercambio").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"),'envío de solicitud de intercambio: '+document.getElementById("nombre").value);
                document.getElementById("alert-intercambio-success").classList.remove("oculto");
                document.getElementById("msg-intercambio-success").innerHTML = "Solicitud enviada";
                setTimeout(function () {
                    document.getElementById('pop-up-intercambio').classList.add('oculto');
                }, 2000);
                break;
        }
        } else {
        document.getElementById("alert-intercambio").classList.remove("oculto");
        document.getElementById("msg-intercambio").innerHTML = "La fecha del intercambio debe ser en el futuro";
        }
    } catch(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}
  
function validarFecha(){
    var fecha = new Date(document.getElementById('fecha-intercambio').value);
    var hoy = new Date();
    if (hoy >= fecha) {
        return false;
    } else {
        return true;
    }
}
  
function validarForm(){
    var sucursal = document.getElementById('sucursales').value;

    if(sucursal == "Seleccione una sucursal"){
        document.getElementById('sucursales').classList.add('invalid');
        return false;
    } else {
        document.getElementById('sucursales').classList.remove('invalid');
        return true;
    }
}
  
function cancelarIntercambio(){
    document.getElementById("form").reset();
    document.getElementById("alert-intercambio").classList.add("oculto");
    document.getElementById('sucursales').classList.remove('invalid');
    document.getElementById('fecha-intercambio').classList.remove('invalid');
    document.getElementById('hora-intercambio').classList.remove('invalid');
    document.getElementById('pop-up-intercambio').classList.add('oculto');
}

async function fillSucursales(){
    var response = await fetch('/sucursal/listarTodo', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    });
    var sucursales = await response.json();

    for(var i=0;i<sucursales.length;i++){
        var opc = document.createElement("option");
        var textNode = document.createTextNode(sucursales[i]['nombreSucursal']);
        opc.value = sucursales[i]['_id'];
        opc.appendChild(textNode);

        document.getElementById("sucursales").appendChild(opc);
    }

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