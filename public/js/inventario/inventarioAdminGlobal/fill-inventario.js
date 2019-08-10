var inventario = [];
var libros = [];
var autores = [];

async function fillInventario(){
    var responseAutor = await fetch('/autor/listar', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    });
    var autorJson = await responseAutor.json();
    autores = autorJson;

    var response = await fetch('/libro/listar', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    })
    var librosJson = await response.json();
    libros = librosJson;

    inventario = [];
    var data = {
      sucursal: document.getElementById('sucursales').value
    }
    var resultInv = await fetch('/inventario/listar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })

    var json = await resultInv.json();

    var list = document.getElementById("inv-cont");
    removeElements(list);
    var titles = document.createElement("tr");
    var libroTitleTd = document.createElement("td");
    var autorTitleTd = document.createElement("td");
    var accionesTitleTd = document.createElement("td");

    var libroTitle = document.createElement('Label');
    var textLibro = document.createTextNode("Libro");
    libroTitle.appendChild(textLibro);
    libroTitleTd.appendChild(libroTitle);

    var autorTitle = document.createElement('Label');
    var textAutor = document.createTextNode("Autor");
    autorTitle.appendChild(textAutor);
    autorTitleTd.appendChild(autorTitle);

    accionesTitleTd.colSpan = 3;

    titles.appendChild(libroTitleTd);
    titles.appendChild(autorTitleTd);
    titles.appendChild(accionesTitleTd);
    titles.classList.add('table-titles')
    document.getElementById("inv-cont").appendChild(titles);


    for(var i=0;i<json.length;i++){
      var tr = document.createElement("tr");

      var libroTd = document.createElement("td");
      var autorTd = document.createElement("td");
      var precioTd = document.createElement("td");
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
      var textCantInd = document.createTextNode('Cantidad:');
      cantInd.appendChild(textCantInd);

      var cant = document.createElement('input');
      cant.type = 'number';
      cant.value = json[i]['cantidad'];
      cant.min = 1;
      cant.id = json[i]['_id'] + "cant";
      cantidadTd.appendChild(cantInd);
      cantidadTd.appendChild(cant);

      var precioInd = document.createElement('Label');
      var textPrecioInd = document.createTextNode('Precio (₡):');
      precioInd.appendChild(textPrecioInd);

      var precio = document.createElement('input');
      precio.type = 'number';
      precio.min = 1;
      precio.value = json[i]['precio'];
      precio.id = json[i]['_id'] + "precio";
      precioTd.appendChild(precioInd);
      precioTd.appendChild(precio);
      
      cant.classList.add("cantidad");
      precio.classList.add("cantidad");

      tr.appendChild(libroTd);
      tr.appendChild(autorTd);
      tr.appendChild(precioTd);
      tr.appendChild(cantidadTd);

      document.getElementById("inv-cont").appendChild(tr);
      inventario.push(json[i]['libro']);
    }
    fillLibros();
}

async function fillLibros(){
    
    var list = document.getElementById("lib-cont");
    removeElements(list);
    var titles = document.createElement("tr");
    var libroTitleTd = document.createElement("td");
    var autorTitleTd = document.createElement("td");
    var accionesTitleTd = document.createElement("td");

    var libroTitle = document.createElement('Label');
    var textLibro = document.createTextNode("Libro");
    libroTitle.appendChild(textLibro);
    libroTitleTd.appendChild(libroTitle);

    var autorTitle = document.createElement('Label');
    var textAutor = document.createTextNode("Autor");
    autorTitle.appendChild(textAutor);
    autorTitleTd.appendChild(autorTitle);

    accionesTitleTd.colSpan = 3;

    titles.appendChild(libroTitleTd);
    titles.appendChild(autorTitleTd);
    titles.appendChild(accionesTitleTd);
    titles.classList.add('table-titles')
    document.getElementById("lib-cont").appendChild(titles);

    for(var i=0;i<libros.length;i++){
        if(!inventario.includes(libros[i]['_id'])){
            var tr = document.createElement("tr");

            var libroTd = document.createElement("td");
            var autorTd = document.createElement("td");
            var precioTd = document.createElement("td");
            var cantidadTd = document.createElement("td");
            var agregarTd = document.createElement("td");

            var libro = document.createElement('Label');
            var textLibro = document.createTextNode(libros[i]['nombre']);
            libro.appendChild(textLibro);
            libroTd.appendChild(libro);
            libroTd.id = libros[i]['isbn'] + "lib"; 

            var autor = document.createElement('Label');
            var textAutor;
            for(var j=0;j<autores.length;j++){
                if(autores[j]["_id"] == libros[i]["autor"]){
                    textAutor = document.createTextNode(autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"]);
                }
            }
            autor.appendChild(textAutor);
            autorTd.appendChild(autor);

            var cantInd = document.createElement('Label');
            var textCantInd = document.createTextNode('Cantidad:');
            cantInd.appendChild(textCantInd);

            var cant = document.createElement('input');
            cant.type = 'number';
            cant.value = 1;
            cant.min = 1;
            cant.id = libros[i]['_id'] + "cant";
            cantidadTd.appendChild(cantInd);
            cantidadTd.appendChild(cant);

            var precioInd = document.createElement('Label');
            var textPrecioInd = document.createTextNode('Precio (₡):');
            precioInd.appendChild(textPrecioInd);

            var precio = document.createElement('input');
            precio.type = 'number';
            precio.min = 1;
            precio.value = 1;
            precio.id = libros[i]['_id'] + "precio";
            precioTd.appendChild(precioInd);
            precioTd.appendChild(precio);

            var button = document.createElement('button');
            button.id = libros[i]['_id'];
            button.innerText = 'Agregar';
            button.addEventListener('click', addInv);
            button.classList.add('submit');
            agregarTd.appendChild(button);
            
            
            cant.classList.add("cantidad");
            precio.classList.add("cantidad");

            tr.appendChild(libroTd);
            tr.appendChild(autorTd);
            tr.appendChild(precioTd);
            tr.appendChild(cantidadTd);
            tr.appendChild(agregarTd);

            document.getElementById("lib-cont").appendChild(tr);
        }
    }
}

function removeElements(list){
    
    console.log(list);
    while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
    }
}

async function addInv(e){
    try{
        var button = e.target;
        var id = button.id;
    
        var data = {
            idSuc: document.getElementById('sucursales').value,
            libro: id,
            cantidad: document.getElementById(id+"cant").value,
            precio: document.getElementById(id+"precio").value
        }
        await fetch('/inventario/add', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{'Content-Type': 'application/json'}
        });
        fillInventario();
    } catch(err){
        console.log('Ocurrió un error con la ejecución', err);
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
        var list = document.getElementById("sucursales");
        removeElements(list);
        for(var i=0;i<json.length;i++){
            var opc = document.createElement("option");
            var textNode = document.createTextNode(json[i]['nombreSucursal']);
            opc.value = json[i]["_id"];
            opc.appendChild(textNode);

            document.getElementById("sucursales").appendChild(opc);
        }
        fillInventario();
      }
  )
  .catch(
    function(err) {
      console.log('Ocurrió un error con la ejecución', err);
    }
  );
}

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