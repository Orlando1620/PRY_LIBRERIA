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
	var response = await fetch('/usuarioCliente/perfil', {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'Content-Type': 'application/json'}
	});
	usuario = await response.json();

	document.getElementById('nombre').innerHTML = usuario['nombre']+" "+usuario['apellido1']+" "+usuario['apellido2'];
	document.getElementById('profilepic').style.backgroundImage = "url("+usuario['imgUrl']+")";
	misLibros = usuario['libros'];
	console.log(misLibros);
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

function intercambio(){

}