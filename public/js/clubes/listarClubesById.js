// JavaScript Document
var clubes = [];
var data ={
    creador: sessionStorage.getItem("id")
}
fetch('/clubes/listarClubesById', {
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
            if(json.length==0){
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "No se encontraron resultados";
            }
            for(var i=0;i<json.length;i++){
                clubes.push(json[i]);
                var tRow = document.createElement('tr');
                
                var nombre = document.createElement('td');
                var nombreT = document.createTextNode(json[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);
                
                var genero = document.createElement('td');
                var generoT = document.createTextNode(json[i]["genero"]);
                genero.appendChild(generoT);
                tRow.appendChild(genero);
                
                var tipo = document.createElement('td');
                var tipoT = document.createTextNode(json[i]["tipo"]);
                tipo.appendChild(tipoT);
                tRow.appendChild(tipo);

                var table = document.getElementById("table");
                table.appendChild(tRow);
            }
        }
    )
    .catch(
        function(err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    );

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
            for(var i=0;i<json.length;i++){
                var opc = document.createElement("option");
                var textNode = document.createTextNode(json[i]['nombre']);
                opc.appendChild(textNode);
    
                document.getElementById("generos").appendChild(opc);
            }
        }
    )
    .catch(
        function(err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    );

function filtrarNombre(){

    var list = document.getElementById('table');
    removeElements(list);
    
    var nameInput = document.getElementById("buscar").value;
    nameInput = nameInput.toLowerCase();
    
    if(clubes.length>0){
        var resultados = 0;
        for(var i=0;i<clubes.length;i++){

            var name = clubes[i]["nombre"];
            name = name.toLowerCase();
            
            if (name.includes(nameInput)){
                resultados++;
            
                var tRow = document.createElement('tr');
            
                var nombre = document.createElement('td');
                var nombreT = document.createTextNode(clubes[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);
                
                var genero = document.createElement('td');
                var generoT = document.createTextNode(clubes[i]["genero"]);
                genero.appendChild(generoT);
                tRow.appendChild(genero);
                
                var tipo = document.createElement('td');
                var tipoT = document.createTextNode(clubes[i]["tipo"]);
                tipo.appendChild(tipoT);
                tRow.appendChild(tipo);
                
                var table = document.getElementById("table");
                table.appendChild(tRow);
            }
        }
        if(resultados == 0){
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "No se encontraron resultados";
        } else {
            document.getElementById("alert").classList.add("oculto");
        }
        
    } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "No se encontraron resultados";
    }
}

function filtrarGenCat(){
	
	var list = document.getElementById('table');
    removeElements(list);
    
    var genero = document.getElementById("generos").value;
    
    if(clubes.length>0){
        var resultados = 0;
        for(var i=0;i<clubes.length;i++){

            var generoReq = clubes[i]["genero"];
            
            if (generoReq == genero || genero == "Generos"){
                resultados++;
            
                var tRow = document.createElement('tr');
            
                var nombre = document.createElement('td');
                var nombreT = document.createTextNode(clubes[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);
                
                var genero = document.createElement('td');
                var generoT = document.createTextNode(clubes[i]["genero"]);
                genero.appendChild(generoT);
                tRow.appendChild(genero);
                
                var tipo = document.createElement('td');
                var tipoT = document.createTextNode(clubes[i]["tipo"]);
                tipo.appendChild(tipoT);
                tRow.appendChild(tipo);
                
                var table = document.getElementById("table");
                table.appendChild(tRow);
            }
        }
        if(resultados == 0){
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "No se encontraron resultados";
        } else {
            document.getElementById("alert").classList.add("oculto");
        }
        
    } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "No se encontraron resultados";
    }
}




function filtrarTipo(){
	
	var list = document.getElementById('table');
    removeElements(list);
    
    var tipo = document.getElementById("tipo").value;
    
    if(clubes.length>0){
        var resultados = 0;
        for(var i=0;i<clubes.length;i++){

            var tipoReq = clubes[i]["tipo"];
            
            if (tipoReq == tipo || tipo == "Tipo"){
                resultados++;
            
                var tRow = document.createElement('tr');
            
                var nombre = document.createElement('td');
                var nombreT = document.createTextNode(clubes[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);
                
                var genero = document.createElement('td');
                var generoT = document.createTextNode(clubes[i]["genero"]);
                genero.appendChild(generoT);
                tRow.appendChild(genero);
                
                var tipo = document.createElement('td');
                var tipoT = document.createTextNode(clubes[i]["tipo"]);
                tipo.appendChild(tipoT);
                tRow.appendChild(tipo);
                
                var table = document.getElementById("table");
                table.appendChild(tRow);
            }
        }
        if(resultados == 0){
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "No se encontraron resultados";
        } else {
            document.getElementById("alert").classList.add("oculto");
        }
        
    } else {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "No se encontraron resultados";
    }
}


function removeElements(list){
	while (list.childNodes.length > 2) {
        list.removeChild(list.lastChild);
    }
}