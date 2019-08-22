var libros = [];
var autores = [];
var ventas = [];
var sucursales = [];

window.onload = function () {
    cargarInfo();
    cargarLibrerias();
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
}

async function infoVendidos(){
    titulosMasVendidos();
    var lista = [];
    var libreria = document.getElementById('librerias').value;
    var sucursal = document.getElementById('sucursales').value;

    if(libreria == 0){
        var response = await fetch('/venta/listarTodo', {
            method: 'GET',
            headers:{'Content-Type': 'application/json'}
        })
        var json = await response.json();
        lista = json;
    }

    if(libreria != 0 && sucursal == 0){
        for(var i=0;i<sucursales.length;i++){
            var data = {
                sucursal: sucursales[i]['_id']
            }
            var response = await fetch('/venta/listar', {
                method: 'POST',
                body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json'}
            })
            var json = await response.json();
            for(var j=0;j<json.length;j++){
                lista.push(json[j]);
            }
        }
    }

    if(libreria != 0 && sucursal != 0){
        var data = {
            sucursal: sucursal
        }
        var response = await fetch('/venta/listar', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        })
        var json = await response.json();
        lista = json;
    }

    

    fillMasVendidos(lista);
}

function fillMasVendidos(json){

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

    json = sumar;

    for(var i=0;i<json.length;i++){
        var tr = document.createElement("tr");

        var libroTd = document.createElement("td");
        var autorTd = document.createElement("td");
        var cantidadTd = document.createElement("td");

        var libro = document.createElement('Label');
        var textLibro = document.createTextNode(json[i]['libro']);
        for(var j=0;j<libros.length;j++){
            if(libros[j]['_id'] == json[i]['libro']){
            textLibro = document.createTextNode(libros[j]['nombre']);
            }
        }
        libro.appendChild(textLibro);
        libroTd.appendChild(libro);
        libroTd.id = json[i]['libro'] + "lib"; 

        var autor = document.createElement('Label');
        var textAutor;
        for(var j=0;j<autores.length;j++){
            for(var n=0;n<libros.length;n++){
            if(autores[j]["_id"] == libros[n]["autor"] && libros[n]['_id'] == json[i]['libro']){
                textAutor = document.createTextNode(autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"]);
            }
            }
        }
        autor.appendChild(textAutor);
        autorTd.appendChild(autor);

        var cantInd = document.createElement('Label');
        var textCantInd = document.createTextNode(json[i]['cantidad']);
        cantInd.appendChild(textCantInd);
        cantidadTd.appendChild(cantInd);

        tr.appendChild(libroTd);
        tr.appendChild(autorTd);
        tr.appendChild(cantidadTd);

        document.getElementById("inv-cont").appendChild(tr);
    }
}

function fillSucursales(){

  var data = {
    nombreLibreria: document.getElementById('librerias').value
  }
  fetch('/sucursal/listarSucursalInv', {
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
        sucursales = json;
        var list = document.getElementById("sucursales");
        removeElements(list);
        var opc = document.createElement("option");
        var textNode = document.createTextNode('Todas las sucursales');
        opc.value = 0;
        opc.appendChild(textNode);

        document.getElementById("sucursales").appendChild(opc);
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombreSucursal']);
            opc.value = json[i]["_id"];
            opc.appendChild(textNode);

            document.getElementById("sucursales").appendChild(opc);
        }
        infoVendidos();
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );
}

function removeElements(list){
    
    console.log(list);
    while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
    }
}

function titulosMasVendidos(){
    var list = document.getElementById("inv-cont");
    removeElements(list);
    var titles = document.createElement("tr");
    var libroTitleTd = document.createElement("td");
    var autorTitleTd = document.createElement("td");
    var cantidadTitleTd = document.createElement("td");

    var libroTitle = document.createElement('Label');
    var textLibro = document.createTextNode("Libro");
    libroTitle.appendChild(textLibro);
    libroTitleTd.appendChild(libroTitle);

    var autorTitle = document.createElement('Label');
    var textAutor = document.createTextNode("Autor");
    autorTitle.appendChild(textAutor);
    autorTitleTd.appendChild(autorTitle);

    var cantidadTitle = document.createElement('Label');
    var textCantidad = document.createTextNode("Cantidad");
    cantidadTitle.appendChild(textCantidad);
    cantidadTitleTd.appendChild(cantidadTitle);

    titles.appendChild(libroTitleTd);
    titles.appendChild(autorTitleTd);
    titles.appendChild(cantidadTitleTd);
    titles.classList.add('table-titles')
    document.getElementById("inv-cont").appendChild(titles);
}

function cargarLibrerias(){
fetch('/libreria/listar', {
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
        var opc = document.createElement("option");
        var textNode = document.createTextNode('Todas las librerías');
        opc.value = 0;
        opc.appendChild(textNode);

        document.getElementById("librerias").appendChild(opc);
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombreComercial']);
            opc.appendChild(textNode);
  
            document.getElementById("librerias").appendChild(opc);
        }
        fillSucursales();
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );
}