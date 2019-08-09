var inventario = [];

function fillInventario(){
    inventario = [];
    var data = {
        nombreSuc: document.getElementById('sucursales').value
    }
    fetch('/inventario/listar', {
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
            var list = document.getElementById("inv-cont");
            removeElements(list);
            for(var i=0;i<json.length;i++){
                var card = document.createElement("div");
                var libro = document.createElement("p");
                var cantInd = document.createElement("p");
                var precioInd = document.createElement("p");
                var isbn = document.createElement("label");
                var isbnInd = document.createElement("label");
                var cant = document.createElement("input");
                var precio = document.createElement("input");
                var div1 = document.createElement("div");
                var div2 = document.createElement("div");
    
                var textLibro = document.createTextNode(json[i]['libro']);
                libro.appendChild(textLibro);
    
                var textISBN = document.createTextNode(json[i]['isbn']);
                isbn.appendChild(textISBN);
    
                var textISBNInd = document.createTextNode('ISBN: ');
                isbnInd.appendChild(textISBNInd);

                var textCantInd = document.createTextNode('Cantidad:');
                cantInd.appendChild(textCantInd);

                var textPrecioInd = document.createTextNode('Precio:');
                precioInd.appendChild(textPrecioInd);
    
    
    
                cant.type = 'number';
                cant.min = 1;
                cant.value = json[i]['cantidad'];

                precio.type = 'number';
                precio.min = 1;
                precio.value = json[i]['precio'];
                
                card.classList.add("card");
                cant.classList.add("cantidad");
                precio.classList.add("cantidad");
                div1.classList.add("inv-list-div");
                div2.classList.add("inv-list-div");
    
                div1.appendChild(libro);
                div1.appendChild(isbnInd);
                div1.appendChild(isbn);
                div2.appendChild(precioInd);
                div2.appendChild(precio);
                div2.appendChild(cantInd);
                div2.appendChild(cant);

                card.appendChild(div1);
                card.appendChild(div2);
    
                document.getElementById("inv-cont").appendChild(card);
                inventario.push(json[i]['isbn']);
            }
            fillLibros();
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
}

function fillLibros(){
    fetch('/libro/listar', {
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
            var list = document.getElementById("lib-cont");
            removeElements(list);
            for(var i=0;i<json.length;i++){
                if(!inventario.includes(json[i]['isbn'])){
                    var card = document.createElement("div");
                    var libro = document.createElement("p");
                    var isbn = document.createElement("label");
                    var isbnInd = document.createElement("label");
                    var button = document.createElement("button");
                    var cantInd = document.createElement("p");
                    var precioInd = document.createElement("p");
                    var cant = document.createElement("input");
                    var precio = document.createElement("input");
                    var div1 = document.createElement("div");
                    var div2 = document.createElement("div");
        
                    

                    var textLibro = document.createTextNode(json[i]['nombre']);
                    libro.appendChild(textLibro);
                    libro.id = json[i]['isbn'] + "lib"; 
        
                    var textISBN = document.createTextNode(json[i]['isbn']);
                    isbn.appendChild(textISBN);
        
                    var textISBNInd = document.createTextNode('ISBN: ');
                    isbnInd.appendChild(textISBNInd);

                    var textCantInd = document.createTextNode('Cantidad:');
                    cantInd.appendChild(textCantInd);

                    var textPrecioInd = document.createTextNode('Precio:');
                    precioInd.appendChild(textPrecioInd);

                    cant.type = 'number';
                    cant.value = 1;
                    cant.min = 1;
                    cant.id = json[i]['isbn'] + "cant";

                    precio.type = 'number';
                    precio.min = 1;
                    precio.value = 1;
                    precio.id = json[i]['isbn'] + "precio";

                    button.id = json[i]['isbn'];
                    button.innerText = 'Agregar';
                    button.addEventListener('click', addInv);
                    
                    card.classList.add("card");
                    cant.classList.add("cantidad");
                    precio.classList.add("cantidad");
                    div1.classList.add("inv-list-div");
                    div2.classList.add("inv-list-div");
        
                    div1.appendChild(libro);
                    div1.appendChild(isbnInd);
                    div1.appendChild(isbn);
                    div2.appendChild(precioInd);
                    div2.appendChild(precio);
                    div2.appendChild(cantInd);
                    div2.appendChild(cant);
                    div2.appendChild(button);

                    card.appendChild(div1);
                    card.appendChild(div2);
        
                    document.getElementById("lib-cont").appendChild(card);
                }
            }
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

async function addInv(e){
    try{
        var button = e.target;
        var isbn = button.id;
    
        var data = {
            nombreSuc: document.getElementById('sucursales').value,
            isbn: isbn,
            libro: document.getElementById(isbn+"lib").innerHTML,
            cantidad: document.getElementById(isbn+"cant").value,
            precio: document.getElementById(isbn+"precio").value
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