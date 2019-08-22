'use strict';
if(sessionStorage.getItem("nombre") == null){
    window.location.href = ("login.html");
}
document.getElementById("usrName").innerHTML = sessionStorage.getItem("nombre");

var libros = [];
var autores = [];
var ventas = [];
var sucursales = [];

window.onload = function () {
    cargarInfo();
}

async function cargarInfo(){
    var response = await fetch('/autor/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    });
    var json = await response.json();
    autores = json;

    var response = await fetch('/libro/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    var json = await response.json();
    libros = json;
    infoVendidos();
    infoVotados();
}

async function infoVendidos(){

    var response = await fetch('/venta/listarTodo', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    var json = await response.json();

    fillMasVendidos(json);
}

async function fillMasVendidos(json){

    var sumar = [];
    for(var i=0;i<json.length;i++){

        if(sumar.length > 0){
            var repetido = false;
            var index;
            for(var j=0;j<sumar.length;j++){
                if(sumar[j]['libro'] == json[i]['libro']){
                    repetido = true;
                    sumar[j]['cantidad'] = sumar[j]['cantidad'] + json[i]['cantidad'];
                }
            }

            if(!repetido){
                sumar.push(json[i]);
            }

        } else {
            sumar.push(json[i]);
        }
        
    }

    for(var i=0;i<sumar.length;i++){

        for(var j=0;j<sumar.length;j++){
            if(sumar[i]['cantidad'] > sumar[j]['cantidad']){
                var temp = sumar[i];
                sumar[i] = sumar[j];
                sumar[j] = temp;
            }
        }
        
    }


    json = sumar;

    for(var i=0;i<json.length;i++){
        var libro;
        for(var j=0;j<libros.length;j++){
            if(libros[j]['_id'] == json[i]['libro']){
                libro = libros[j];
            }
        }
        if(i == 0){
            document.getElementById('avend1').addEventListener('click',perfil);
            document.getElementById('vend1').setAttribute('src',libro['urlImg']);
            document.getElementById('vend1').id = libro['_id'];
            document.getElementById('vend1Name').innerHTML = libro['nombre'];

            var textAutor;
            for(var j=0;j<autores.length;j++){
                if(autores[j]["_id"] == libro["autor"]){
                    textAutor = autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"];
                }
            }
            document.getElementById('vend1Autor').innerHTML = textAutor;

            var data = {
                libro:libro['_id']
            }
            var response = await fetch('/califLibro/listar', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'}
            })
            var califs = await response.json();
    
            
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
                    icon.classList.add("fa-lg");
                    icon.classList.add("calif-true");
                    document.getElementById('vend1Calif').appendChild(icon);
                }
    
                for(var j=0;j<5-calif;j++){
                    var icon = document.createElement("i");
                    icon.classList.add("fas");
                    icon.classList.add("fa-book");
                    icon.classList.add("fa-lg");
                    icon.classList.add("calif-false");
                    document.getElementById('vend1Calif').appendChild(icon);
                }
            } else {
                var califT = document.createTextNode("");
                document.getElementById('vend1Calif').appendChild(califT);
            }
        } else {
            var index = i + 1;
            document.getElementById('vend'+index).setAttribute('src',libro['urlImg']);
            document.getElementById('avend'+index).addEventListener('click',perfil);
            document.getElementById('vend'+index).id = libro['_id'];
        }
        

    }
}

async function infoVotados(){
    var lista = [];
    
    for(var i=0;i<libros.length;i++){
        var data = {
            libro: libros[i]['_id']
        }
        var response = await fetch('/califLibro/listar', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        })
        var califs = await response.json();

        var calif = 0;
        if(califs.length != 0){
            for(var j=0;j<califs.length;j++){
                calif += califs[j]['calif'];
            }
            calif = calif/califs.length;
            calif = Math.round(calif);
        } 

        lista.push({
            libro: libros[i]['_id'],
            calif: calif
        });
    }

    fillMejorVotados(lista);
}

function fillMejorVotados(json){

    for(var i=0;i<json.length;i++){

        for(var j=0;j<json.length;j++){
            if(json[i]['calif'] > json[j]['calif']){
                var temp = json[i];
                json[i] = json[j];
                json[j] = temp;
            }
        }
        
    }

    for(var i=0;i<json.length;i++){
        var libro;
        for(var j=0;j<libros.length;j++){
            if(libros[j]['_id'] == json[i]['libro']){
                libro = libros[j];
            }
        }
        
        var index = i + 1;
        document.getElementById('vot'+index).setAttribute('src',libro['urlImg']);
        document.getElementById('avot'+index).addEventListener('click',perfil);
        document.getElementById('vot'+index).id = libro['_id'];
    }
}

function perfil(e){
    var a = e.target;
    var id = a.id;
    sessionStorage.setItem("idLibro",id);
    window.location.href = "perfil-libro.html";
}