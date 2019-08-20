var libros = [];
var sucursales = [];
var recibidos = [];
var idsRecibidos = [];
var enviados = [];
var idsEnviados = [];
var idUsuario;
var idIntercambio;
var librosIntercambio = [];
window.onload = function () {
    fillTable();
}

async function fillTable(){
    var list = document.getElementById("table");
    removeElements(list);
    var resultados = false;
    var ids = 0;

    var response = await fetch('/libro/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    });
    libros = await response.json();

    var data = {
        id: sessionStorage.getItem("id")
    };
    
    var response = await fetch('/sucursal/listarTodo', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    sucursales = await response.json();

    var response = await fetch('/usuario/listar', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    usuarios = await response.json();

    var data = {
        id:sessionStorage.getItem('id')
    }
    var response = await fetch('/intercambio/recibidos', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
    recibidos = await response.json();

    for(var i=0;i<recibidos.length;i++){
        
        if(recibidos[i]['pendiente'] == true){

            resultados = true;
            var tr = document.createElement("tr");

            //libro1
            var td = document.createElement("td");
            var libro = document.createElement('a');
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == recibidos[i]['libro1']){
                    libro.appendChild(document.createTextNode(libros[j]['nombre']));
                    libro.id = libros[j]['_id'];
                }
            }

            libro.href = "#";
            libro.addEventListener('click', perfil); 
            td.appendChild(libro);
            tr.appendChild(td);

            //libro2
            var td = document.createElement("td");
            var libro = document.createElement('a');
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == recibidos[i]['libro2']){
                    libro.appendChild(document.createTextNode(libros[j]['nombre']));
                    libro.id = libros[j]['_id'];
                }
            }

            libro.href = "#";
            libro.addEventListener('click', perfil); 
            td.appendChild(libro);
            tr.appendChild(td);

            //sucursal
            var td = document.createElement("td");
            for(var j=0;j<sucursales.length;j++){
                if(sucursales[j]['_id'] == recibidos[i]['sucursal']){
                    td.appendChild(document.createTextNode(sucursales[j]['nombreSucursal']));
                }
            }
            tr.appendChild(td);
            
            //fecha
            var td = document.createElement("td");
            var date = new Date(recibidos[i]['fecha']);
            var fecha = document.createTextNode(date.toLocaleDateString()); 
            td.appendChild(fecha);
            tr.appendChild(td);

            //hora
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(recibidos[i]['hora'])); 
            tr.appendChild(td);

            //usuario
            var td = document.createElement("td");
            for(var j=0;j<usuarios.length;j++){
                if(usuarios[j]['_id'] == recibidos[i]['usuario1']){
                    td.appendChild(document.createTextNode(usuarios[j]['nombre']+' '+usuarios[j]['apellido1']+' '+usuarios[j]['apellido2']));
                }
            }
            tr.appendChild(td);

            if(recibidos[i]['aceptada'] == false ){
                var td = document.createElement("td");
                var btn = document.createElement('button');
                btn.innerHTML = 'Aceptar';
                btn.id = ids;
                btn.addEventListener('click', responder);
                btn.classList.add('submit');
                td.appendChild(btn);
                tr.appendChild(td);

                var td = document.createElement("td");
                var btn = document.createElement('button');
                btn.innerHTML = 'Rechazar';
                btn.id = ids;
                btn.addEventListener('click', rechazar);
                btn.classList.add('submit');
                td.appendChild(btn);
                tr.appendChild(td);

                idsRecibidos.push({
                    intercambio: recibidos[i]['_id'],
                    usuario: recibidos[i]['usuario1']
                });
                ids++;
            }

            if(recibidos[i]['entrega2'] == false && recibidos[i]['aceptada'] == true){
                var td = document.createElement("td");
                var btn = document.createElement('button');
                btn.innerHTML = 'Libro entregado';
                btn.id = ids;
                idsRecibidos.push({
                    intercambio: recibidos[i]['_id'],
                    usuario: recibidos[i]['usuario1']
                });
                ids++;
                btn.addEventListener('click', entregado2);
                btn.classList.add('submit');
                td.appendChild(btn);
                tr.appendChild(td);
            }

            if(recibidos[i]['entrega2'] == true && recibidos[i]['entrega1'] == false){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('Pendiente'));
                tr.appendChild(td);
            }

            if(recibidos[i]['entrega2'] == true && recibidos[i]['entrega1'] == true && recibidos[i]['devolucion2'] == false){
                var td = document.createElement("td");
                var btn = document.createElement('button');
                btn.innerHTML = 'Libro devuelto';
                btn.id = ids;
                idsRecibidos.push({
                    intercambio: recibidos[i]['_id'],
                    usuario: recibidos[i]['usuario1']
                });
                ids++;
                btn.addEventListener('click', devuelto2);
                btn.classList.add('submit');
                td.appendChild(btn);
                tr.appendChild(td);
            }

            if(recibidos[i]['devolucion2'] == true && recibidos[i]['devolucion1'] == false){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('Pendiente'));
                tr.appendChild(td);
            } 
            if(recibidos[i]['devolucion2'] == true && recibidos[i]['devolucion1'] == true){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('Finalizado'));
                tr.appendChild(td);
            }
            
            

            document.getElementById("table").appendChild(tr);
        }
    }

    var data = {
        id:sessionStorage.getItem('id')
    }
    var response = await fetch('/intercambio/enviados', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
    enviados = await response.json();

    for(var i=0;i<enviados.length;i++){
        
        if(enviados[i]['pendiente'] == true){

            resultados = true;
            ids = 0;
            var tr = document.createElement("tr");

            //libro1
            var td = document.createElement("td");
            var libro = document.createElement('a');
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == enviados[i]['libro1']){
                    libro.appendChild(document.createTextNode(libros[j]['nombre']));
                    libro.id = libros[j]['_id'];
                }
            }

            libro.href = "#";
            libro.addEventListener('click', perfil); 
            td.appendChild(libro);
            tr.appendChild(td);

            //libro2
            var td = document.createElement("td");
            var libro = document.createElement('a');
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == enviados[i]['libro2']){
                    libro.appendChild(document.createTextNode(libros[j]['nombre']));
                    libro.id = libros[j]['_id'];
                }
            }

            libro.href = "#";
            libro.addEventListener('click', perfil); 
            td.appendChild(libro);
            tr.appendChild(td);

            //sucursal
            var td = document.createElement("td");
            for(var j=0;j<sucursales.length;j++){
                if(sucursales[j]['_id'] == enviados[i]['sucursal']){
                    td.appendChild(document.createTextNode(sucursales[j]['nombreSucursal']));
                }
            }
            tr.appendChild(td);
            
            //fecha
            var td = document.createElement("td");
            var date = new Date(enviados[i]['fecha']);
            var fecha = document.createTextNode(date.toLocaleDateString()); 
            td.appendChild(fecha);
            tr.appendChild(td);

            //hora
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(enviados[i]['hora'])); 
            tr.appendChild(td);

            //usuario
            var td = document.createElement("td");
            for(var j=0;j<usuarios.length;j++){
                if(usuarios[j]['_id'] == enviados[i]['usuario2']){
                    td.appendChild(document.createTextNode(usuarios[j]['nombre']+' '+usuarios[j]['apellido1']+' '+usuarios[j]['apellido2']));
                }
            }
            tr.appendChild(td);

            if(enviados[i]['aceptada'] != true){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('Pendiente'));
                tr.appendChild(td);
            }

            if(enviados[i]['entrega1'] == false && enviados[i]['aceptada'] == true){
                var td = document.createElement("td");
                var btn = document.createElement('button');
                btn.innerHTML = 'Libro entregado';
                btn.id = ids;
                idsEnviados.push({
                    intercambio: enviados[i]['_id'],
                    usuario: enviados[i]['usuario2']
                });
                ids++;
                btn.addEventListener('click', entregado1);
                btn.classList.add('submit');
                td.appendChild(btn);
                tr.appendChild(td);
            }

            if(enviados[i]['entrega1'] == true && enviados[i]['entrega2'] == false){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('Pendiente'));
                tr.appendChild(td);
            }

            if(enviados[i]['entrega1'] == true && enviados[i]['entrega2'] == true && enviados[i]['devolucion1'] == false){
                var td = document.createElement("td");
                var btn = document.createElement('button');
                btn.innerHTML = 'Libro devuelto';
                btn.id = ids;
                idsEnviados.push({
                    intercambio: enviados[i]['_id'],
                    usuario: enviados[i]['usuario2']
                });
                ids++;
                btn.addEventListener('click', devuelto1);
                btn.classList.add('submit');
                td.appendChild(btn);
                tr.appendChild(td);
            }

            if(enviados[i]['devolucion1'] == true && enviados[i]['devolucion2'] == false){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('Pendiente'));
                tr.appendChild(td);
            } 
            if(enviados[i]['devolucion2'] == true && enviados[i]['devolucion1'] == true){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode('Finalizado'));
                tr.appendChild(td);
            }
            
            document.getElementById("table").appendChild(tr);
        }

        if(enviados[i]['pendiente'] == false && enviados[i]['aceptada'] == false){

            resultados = true;
            ids = 0;
            var tr = document.createElement("tr");

            //libro1
            var td = document.createElement("td");
            var libro = document.createElement('a');
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == enviados[i]['libro1']){
                    libro.appendChild(document.createTextNode(libros[j]['nombre']));
                    libro.id = libros[j]['_id'];
                }
            }

            libro.href = "#";
            libro.addEventListener('click', perfil); 
            td.appendChild(libro);
            tr.appendChild(td);

            //libro2
            var td = document.createElement("td");
            var libro = document.createElement('a');
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == enviados[i]['libro2']){
                    libro.appendChild(document.createTextNode(libros[j]['nombre']));
                    libro.id = libros[j]['_id'];
                }
            }

            libro.href = "#";
            libro.addEventListener('click', perfil); 
            td.appendChild(libro);
            tr.appendChild(td);

            //sucursal
            var td = document.createElement("td");
            for(var j=0;j<sucursales.length;j++){
                if(sucursales[j]['_id'] == enviados[i]['sucursal']){
                    td.appendChild(document.createTextNode(sucursales[j]['nombreSucursal']));
                }
            }
            tr.appendChild(td);
            
            //fecha
            var td = document.createElement("td");
            var date = new Date(enviados[i]['fecha']);
            var fecha = document.createTextNode(date.toLocaleDateString()); 
            td.appendChild(fecha);
            tr.appendChild(td);

            //hora
            var td = document.createElement("td");
            td.appendChild(document.createTextNode(enviados[i]['hora'])); 
            tr.appendChild(td);

            //usuario
            var td = document.createElement("td");
            for(var j=0;j<usuarios.length;j++){
                if(usuarios[j]['_id'] == enviados[i]['usuario2']){
                    td.appendChild(document.createTextNode(usuarios[j]['nombre']+' '+usuarios[j]['apellido1']+' '+usuarios[j]['apellido2']));
                }
            }
            tr.appendChild(td);

            var td = document.createElement("td");
            td.appendChild(document.createTextNode('Rechazado'));
            tr.appendChild(td);
            
            document.getElementById("table").appendChild(tr);
        }
    }

    if(!resultados){
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var text = document.createTextNode("No tiene intercambios activos");
        td.colSpan = 8;
        td.appendChild(text);
        td.style.textAlign = 'center'; 
        tr.appendChild(td);
        document.getElementById("table").appendChild(tr);
    }
}

function removeElements(list){
    
    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }

    var tr = document.createElement("tr");
    var td = document.createElement("td");

    var text = document.createTextNode("Libros");
    td.colSpan = 2;
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("td");
    var text = document.createTextNode("Sucursal");
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("td");
    var text = document.createTextNode("Fecha");
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("td");
    var text = document.createTextNode("Hora");
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("td");
    var text = document.createTextNode("Usuario");
    td.appendChild(text);
    tr.appendChild(td);

    var td = document.createElement("td");
    tr.appendChild(td);

    var td = document.createElement("td");
    tr.appendChild(td);

    tr.classList.add('table-titles')
    document.getElementById("table").appendChild(tr);
}

function removeOptions(list){
    
    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }
    var opc = document.createElement("option");
    opc.appendChild(document.createTextNode('Seleccione un libro'));
    opc.value = 0;

    document.getElementById("libros").appendChild(opc);
}

async function responder(e){
    var a = e.target;
    var id = a.id;

    idUsuario = idsRecibidos[id]['usuario'];
    idIntercambio = idsRecibidos[id]['intercambio'];
    document.getElementById('respuesta').classList.remove('oculto');
    removeOptions(document.getElementById('libros'));

    var data = {
        id: idUsuario
    };
    var response = await fetch('/usuarioCliente/perfil', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });
    usuario = await response.json();
    librosIntercambio = usuario['libros'];

    for(var i=0;i<librosIntercambio.length;i++){
        if(librosIntercambio[i][0]['intercambiable'] == true && librosIntercambio[i][0]['cantidad'] > 0){
            var opc = document.createElement("option");
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == librosIntercambio[i][0]['libro']){
                    opc.appendChild(document.createTextNode(libros[j]['nombre']));
                }
            }
            opc.value = librosIntercambio[i][0]['libro'];

            document.getElementById("libros").appendChild(opc);
        }
    }
}

async function enviar(e){
    e.preventDefault();
    if(validarForm()){
        document.getElementById('alert-intercambio').classList.add('oculto');
        var data = {
            id: idIntercambio,
            libro2: document.getElementById('libros').value,
            respuesta: true
        };
        await fetch('/intercambio/responder', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        });
        document.getElementById('respuesta').classList.add('oculto');
        fillTable();
    } else {
        document.getElementById('alert-intercambio').classList.remove('oculto');
    }
    
}

function cancelar(){
    document.getElementById("respuesta").classList.add('oculto');
    document.getElementById('libros').value = '0';
}

async function rechazar(e){
    var a = e.target;
    var id = a.id;

    idUsuario = idsRecibidos[id]['usuario'];
    idIntercambio = idsRecibidos[id]['intercambio'];

    var data = {
        id: idIntercambio,
        respuesta: false
    };
    await fetch('/intercambio/responder', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });

    fillTable();
}

async function entregado1(e){
    var a = e.target;
    var id = a.id;
    idIntercambio = idsEnviados[id]['intercambio'];

    var data = {
        id: idIntercambio,
        entrega: 1
    };
    await fetch('/intercambio/entregar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });

    fillTable();
}

async function entregado2(e){
    var a = e.target;
    var id = a.id;

    idIntercambio = idsRecibidos[id]['intercambio'];

    var data = {
        id: idIntercambio,
        entrega: 2
    };
    await fetch('/intercambio/entregar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });

    fillTable();
    
}

async function devuelto1(e){
    var a = e.target;
    var id = a.id;
    idIntercambio = idsEnviados[id]['intercambio'];
    idUsuario = idsEnviados[id]['usuario'];

    var data = {
        id: idIntercambio,
        devolucion: 1
    };
    await fetch('/intercambio/devolver', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });

    calificar();
    fillTable();
}

async function devuelto2(e){
    var a = e.target;
    var id = a.id;

    idIntercambio = idsRecibidos[id]['intercambio'];
    idUsuario = idsRecibidos[id]['usuario'];

    var data = {
        id: idIntercambio,
        devolucion: 2
    };
    await fetch('/intercambio/devolver', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });

    calificar();
    fillTable();
}

function perfil(e){
    var a = e.target;
    var id = a.id;
    sessionStorage.setItem("idLibro",id);
    window.location.href = "perfil-libro.html";
}

function validarForm(){
    var librosForm = document.getElementById('libros').value;
  
    if(librosForm == "0"){
        document.getElementById('libros').classList.add('invalid');
        return false;
    } else {
        document.getElementById("libros").classList.remove('invalid');
        return true;
    }
    
}

function calificar(){

    document.getElementById("pop-up-calif").classList.remove('oculto');
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

async function enviarCalif(){

    var data = {
        usuario1: sessionStorage.getItem('id'),
        usuario2: idUsuario,
        resena: document.getElementById('resena').value,
        calif: califActual
    };
	await fetch('/califUsuario/add', {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'Content-Type': 'application/json'}
    });
    
    document.getElementById("pop-up-calif").classList.add('oculto');
    document.getElementById('resena').value = '';
    califActual = 0;
}

function cancelarCalif(){
    document.getElementById("pop-up-calif").classList.add('oculto');
    document.getElementById('resena').value = '';
    califActual = 0;
}