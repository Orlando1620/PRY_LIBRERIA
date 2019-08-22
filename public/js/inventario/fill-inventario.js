var inventario = [];
var inventarios = [];
var libros = [];
var autores = [];
var idLibro;

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
    inventarios = json;

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
      var saveDelTd = document.createElement("td");

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
      cant.id = json[i]['libro'] + "cant";
      cantidadTd.appendChild(cantInd);
      cantidadTd.appendChild(cant);

      var precioInd = document.createElement('Label');
      var textPrecioInd = document.createTextNode('Precio (₡):');
      precioInd.appendChild(textPrecioInd);

      var precio = document.createElement('input');
      precio.type = 'number';
      precio.min = 1;
      precio.value = json[i]['precio'];
      precio.id = json[i]['libro'] + "precio";
      precioTd.appendChild(precioInd);
      precioTd.appendChild(precio);
      
      cant.classList.add("cantidad");
      precio.classList.add("cantidad");

      var aSave = document.createElement('a');
      var save = document.createElement("i");
      save.classList.add('fas');
      save.classList.add('fa-save');
      save.id = json[i]['libro'];
      aSave.addEventListener('click', modInv);
      aSave.appendChild(save);
      saveDelTd.appendChild(aSave);

      var aDel = document.createElement('a');
      var del = document.createElement("i");
      del.classList.add('fas');
      del.classList.add('fa-trash-alt');
      del.id = json[i]['libro'];
      aDel.addEventListener('click', popDel);
      aDel.appendChild(del);
      saveDelTd.appendChild(aDel);

      tr.appendChild(libroTd);
      tr.appendChild(autorTd);
      tr.appendChild(precioTd);
      tr.appendChild(cantidadTd);
      tr.appendChild(saveDelTd);

      document.getElementById("inv-cont").appendChild(tr);
      inventario.push(json[i]['libro']);
    }

    if(json.length == 0){
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var text = document.createTextNode("Aún no hay libros en el inventario");
      td.colSpan = 5;
      td.appendChild(text);
      td.style.textAlign = 'center'; 
      tr.appendChild(td);
      document.getElementById("inv-cont").appendChild(tr);
    }

    fillLibros();
}

function filtrarInv(){
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

  var nombreReq = document.getElementById('buscarInv').value;
  nombreReq = nombreReq.toLowerCase();
  
  if(inventarios.length>0){
      var resultados = 0;
      for(var i=0;i<inventarios.length;i++){

        var nombreRes;
        for(var j=0;j<libros.length;j++){
          if(libros[j]['_id'] == inventarios[i]['libro']){
            nombreRes = libros[j]['nombre'];
          }
        }

        for(var j=0;j<autores.length;j++){
          for(var n=0;n<libros.length;n++){
            if(autores[j]["_id"] == libros[n]["autor"] && libros[n]['_id'] == inventarios[i]['libro']){
              nombreRes += autores[j]["nombre"]+autores[j]["apellido1"]+autores[j]["apellido2"];
            }
          }
        }
        
        nombreRes = nombreRes.toLowerCase();

        if(nombreRes.includes(nombreReq)){
            resultados++;
            var tr = document.createElement("tr");

            var libroTd = document.createElement("td");
            var autorTd = document.createElement("td");
            var precioTd = document.createElement("td");
            var cantidadTd = document.createElement("td");
            var saveDelTd = document.createElement("td");

            var libro = document.createElement('Label');
            var textLibro = document.createTextNode(inventarios[i]['libro']);
            for(var j=0;j<libros.length;j++){
              if(libros[j]['_id'] == inventarios[i]['libro']){
                textLibro = document.createTextNode(libros[j]['nombre']);
              }
            }
            libro.appendChild(textLibro);
            libroTd.appendChild(libro);
            libroTd.id = inventarios[i]['libro'] + "lib"; 

            var autor = document.createElement('Label');
            var textAutor;
            for(var j=0;j<autores.length;j++){
              for(var n=0;n<libros.length;n++){
                if(autores[j]["_id"] == libros[n]["autor"] && libros[n]['_id'] == inventarios[i]['libro']){
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
            cant.value = inventarios[i]['cantidad'];
            cant.min = 1;
            cant.id = inventarios[i]['libro'] + "cant";
            cantidadTd.appendChild(cantInd);
            cantidadTd.appendChild(cant);

            var precioInd = document.createElement('Label');
            var textPrecioInd = document.createTextNode('Precio (₡):');
            precioInd.appendChild(textPrecioInd);

            var precio = document.createElement('input');
            precio.type = 'number';
            precio.min = 1;
            precio.value = inventarios[i]['precio'];
            precio.id = inventarios[i]['libro'] + "precio";
            precioTd.appendChild(precioInd);
            precioTd.appendChild(precio);
            
            cant.classList.add("cantidad");
            precio.classList.add("cantidad");

            var aSave = document.createElement('a');
            var save = document.createElement("i");
            save.classList.add('fas');
            save.classList.add('fa-save');
            save.id = inventarios[i]['libro'];
            aSave.addEventListener('click', modInv);
            aSave.appendChild(save);
            saveDelTd.appendChild(aSave);

            var aDel = document.createElement('a');
            var del = document.createElement("i");
            del.classList.add('fas');
            del.classList.add('fa-trash-alt');
            del.id = inventarios[i]['libro'];
            aDel.addEventListener('click', popDel);
            aDel.appendChild(del);
            saveDelTd.appendChild(aDel);

            tr.appendChild(libroTd);
            tr.appendChild(autorTd);
            tr.appendChild(precioTd);
            tr.appendChild(cantidadTd);
            tr.appendChild(saveDelTd);

            document.getElementById("inv-cont").appendChild(tr);
        }
      }

      if(resultados == 0){
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var text = document.createTextNode("No se encontraron resultados");
        td.colSpan = 5;
        td.appendChild(text);
        td.style.textAlign = 'center'; 
        tr.appendChild(td);
        document.getElementById("inv-cont").appendChild(tr);
      }
  } else {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var text = document.createTextNode("No se encontraron resultados");
      td.colSpan = 5;
      td.appendChild(text);
      td.style.textAlign = 'center'; 
      tr.appendChild(td);
      document.getElementById("inv-cont").appendChild(tr);
  }
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

            /*var button = document.createElement('button');
            button.id = libros[i]['_id'];
            button.innerText = 'Agregar';
            button.addEventListener('click', addInv);
            button.classList.add('submit');
            agregarTd.appendChild(button);*/

            var a = document.createElement('a');
            var add = document.createElement("i");
            add.classList.add('fas');
            add.classList.add('fa-plus');
            add.id = libros[i]['_id'];
            a.addEventListener('click', addInv);
            a.appendChild(add);
            agregarTd.appendChild(a);
            
            
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

function filtrarLibros(){
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

  var nombreReq = document.getElementById('buscarLib').value;
  nombreReq = nombreReq.toLowerCase();
  
  if(libros.length>0){
      var resultados = 0;
      for(var i=0;i<libros.length;i++){

        var nombreRes = libros[i]['nombre'];
        for(var j=0;j<autores.length;j++){
          if(autores[j]["_id"] == libros[i]["autor"]){
            nombreRes += autores[j]["nombre"]+autores[j]["apellido1"]+autores[j]["apellido2"];
          }
        }
        nombreRes = nombreRes.toLowerCase();

        if(nombreRes.includes(nombreReq)){
            resultados++;
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
  
              /*var button = document.createElement('button');
              button.id = libros[i]['_id'];
              button.innerText = 'Agregar';
              button.addEventListener('click', addInv);
              button.classList.add('submit');
              agregarTd.appendChild(button);*/
  
              var a = document.createElement('a');
              var add = document.createElement("i");
              add.classList.add('fas');
              add.classList.add('fa-plus');
              add.id = libros[i]['_id'];
              a.addEventListener('click', addInv);
              a.appendChild(add);
              agregarTd.appendChild(a);
              
              
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

      if(resultados == 0){
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var text = document.createTextNode("No se encontraron resultados");
        td.colSpan = 5;
        td.appendChild(text);
        td.style.textAlign = 'center'; 
        tr.appendChild(td);
        document.getElementById("lib-cont").appendChild(tr);
      }
  } else {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var text = document.createTextNode("No se encontraron resultados");
      td.colSpan = 5;
      td.appendChild(text);
      td.style.textAlign = 'center'; 
      tr.appendChild(td);
      document.getElementById("lib-cont").appendChild(tr);
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
      document.getElementById("alert-inv-add").classList.remove("oculto");
      document.getElementById("msg-inv-add").innerHTML = "Libro agregado al inventario";
      
      setTimeout(function () {
        document.getElementById("alert-inv-add").classList.add("oculto");
      }, 2000);
  } catch(err){
      console.log('Ocurrió un error con la ejecución', err);
  }
}

async function modInv(e){
try{
  var button = e.target;
  var id = button.id;

  var data = {
      idSuc: document.getElementById('sucursales').value,
      libro: id,
      cantidad: document.getElementById(id+"cant").value,
      precio: document.getElementById(id+"precio").value
  }
  await fetch('/inventario/mod', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
  });
  fillInventario();
  document.getElementById("alert-inv").classList.remove("oculto");
  document.getElementById("msg-inv").innerHTML = "Cambios guardados";
  
  setTimeout(function () {
    document.getElementById("alert-inv").classList.add("oculto");
  }, 2000);
  
} catch(err){
    console.log('Ocurrió un error con la ejecución', err);
}
}

async function delInv(){
try{

  var data = {
      idSuc: document.getElementById('sucursales').value,
      idLibro: idLibro
  }
  await fetch('/inventario/del', {
      method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-Type': 'application/json'}
  });
  fillInventario();
  document.getElementById("alert-inv-del").classList.remove("oculto");
  document.getElementById("msg-inv-del").innerHTML = "Libro eliminado del inventario";
  
  setTimeout(function () {
    document.getElementById("alert-inv-del").classList.add("oculto");
  }, 2000);
} catch(err){
    console.log('Ocurrió un error con la ejecución', err);
}
}

function popDel(e){
  var button = e.target;
  idLibro = button.id;

  
  document.getElementById("pop-up").classList.remove("oculto");
  document.getElementById("msg-pop").innerHTML = "¿Desea eliminar este libro de su inventario?";
}

function aceptar(){
  document.getElementById("pop-up").classList.add("oculto");
  delInv();
}

function cancelar(){
  document.getElementById("pop-up").classList.add("oculto");
}

async function sucursales(){

  var nombreLibreria = await fetchLib();

  var data = {
    nombreLibreria: nombreLibreria
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
          if(json.length>0){
            for(var i=0;i<json.length;i++){
              var opc = document.createElement("option");
              var textNode = document.createTextNode(json[i]['nombreSucursal']);
              opc.appendChild(textNode);
              opc.value = json[i]['_id'];

              document.getElementById("sucursales").appendChild(opc);
            }
            fillInventario();
          } else {
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("cards-wrapper").classList.add("oculto");
            document.getElementById("sucursales").classList.add("oculto");
            document.getElementById("msg").innerHTML = "Debe registrar al menos una sucursal"; 
          }
        }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

function fetchLib(){
  var data = {
    admin_id: sessionStorage.getItem("id")
  }
  return fetch('/libreria/libById', {
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
            var lib = json["nombreComercial"];
            return lib;
        }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
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

function removeElements(list){
    
  console.log(list);
  while (list.hasChildNodes()) {   
  list.removeChild(list.firstChild);
  }
}

sucursales();