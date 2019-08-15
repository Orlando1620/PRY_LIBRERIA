var libros = [];
var misLibros = [];
var idLibro;

window.onload = function () {
    fillTable();
}

async function fillTable(){

    var response = await fetch('/libro/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    });
    libros = await response.json();

    var data = {
        id: sessionStorage.getItem("id")
    };
    
    var response = await fetch('/usuarioCliente/perfil', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });
    usuario = await response.json();
    misLibros = usuario['libros'];

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
        var intercambio = document.createElement('select');

        var opc = document.createElement("option");
        var textNode = document.createTextNode('Disponible');
        opc.appendChild(textNode);

        intercambio.appendChild(opc);

        var opc = document.createElement("option");
        var textNode = document.createTextNode('No disponible');
        opc.appendChild(textNode);

        intercambio.appendChild(opc);

        if(misLibros[i][0]['intercambiable'] == false){
            intercambio.value = 'No disponible';
        }

        //intercambio.addEventListener('change', mod);
        td.appendChild(intercambio);
        tr.appendChild(td);

        var td = document.createElement("td");
        var cantidad = document.createTextNode(misLibros[i][0]['cantidad']);
        cantidad.id = misLibros[i][0]['libro'];

        td.appendChild(cantidad);
        tr.appendChild(td);

        var data = {
            libro:misLibros[i][0]['libro'],
            usuario: sessionStorage.getItem('id')
        }

        
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
            var btn = document.createElement('button');
            btn.innerHTML = 'Valorar libro';
            btn.id = misLibros[i][0]['libro'];
            btn.addEventListener('click', calificar);
            btn.classList.add('submit');
            td.appendChild(btn);
        }
    
        tr.appendChild(td);

        document.getElementById("table").appendChild(tr);
    
    }

    if(misLibros.length == 0){
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var text = document.createTextNode("Aún no ha adquirido ningún libro");
        td.colSpan = 4;
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
                var intercambio = document.createElement('select');
        
                var opc = document.createElement("option");
                var textNode = document.createTextNode('Disponible');
                opc.appendChild(textNode);
        
                intercambio.appendChild(opc);
        
                var opc = document.createElement("option");
                var textNode = document.createTextNode('No disponible');
                opc.appendChild(textNode);
        
                intercambio.appendChild(opc);
        
                if(misLibros[i][0]['intercambiable'] == false){
                    intercambio.value = 'No disponible';
                }
        
                //intercambio.addEventListener('change', mod);
                td.appendChild(intercambio);
                tr.appendChild(td);
        
                var td = document.createElement("td");
                var cantidad = document.createTextNode(misLibros[i][0]['cantidad']);
                cantidad.id = misLibros[i][0]['libro'];
        
                td.appendChild(cantidad);
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
    var intercambios = document.createTextNode("Intercambios");
    td.appendChild(intercambios);
    tr.appendChild(td);

    var td = document.createElement("td");
    var cantidad = document.createTextNode("Cantidad");
    td.appendChild(cantidad);
    tr.appendChild(td);

    var td = document.createElement("td");
    var calif = document.createTextNode("Calificación");
    td.appendChild(calif);
    tr.appendChild(td);

    tr.classList.add('table-titles')
    document.getElementById("table").appendChild(tr);
}

function calificar(e){

    var a = e.target;
    idLibro = a.id;
    document.getElementById("pop-up").classList.remove('oculto');
    for(var i=0;i<califActual;i++){
        document.getElementById(i+1).classList.remove('calif-false');
        document.getElementById(i+1).classList.add('calif-true');
    }
    for(var i=0;i<5-califActual;i++){
        document.getElementById(i+califActual+1).classList.add('calif-false');
        document.getElementById(i+califActual+1).classList.remove('calif-true');
    }

}

var califActual;
function cambiarCalif(e){
    var a = e.target;
    califActual = parseInt(a.id);
    for(var i=0;i<califActual;i++){
        document.getElementById(i+1).classList.remove('calif-false');
        document.getElementById(i+1).classList.add('calif-true');
    }
    for(var i=0;i<5-califActual;i++){
        document.getElementById(i+califActual+1).classList.add('calif-false');
        document.getElementById(i+califActual+1).classList.remove('calif-true');
    }
}

async function aceptar(){

    var data = {
        usuario: sessionStorage.getItem("id"),
        libro: idLibro,
        calif: califActual
    };
	await fetch('/usuarioCliente/califLibro', {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'Content-Type': 'application/json'}
    });

    var data = {
        usuario: sessionStorage.getItem("id"),
        libro: idLibro,
        resena: document.getElementById('resena').value,
        calif: califActual
    };
	await fetch('/califLibro/add', {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'Content-Type': 'application/json'}
    });
    
    document.getElementById("pop-up").classList.add('oculto');
    document.getElementById('resena').value = '';
    califActual = 0;
    fillTable();
}

function cancelar(){
    document.getElementById("pop-up").classList.add('oculto');
    document.getElementById('resena').value = '';
    califActual = 0;
}

function perfil(e){
    var a = e.target;
    var id = a.id;
    sessionStorage.setItem("idLibro",id);
    window.location.href = "perfil-libro.html";
}