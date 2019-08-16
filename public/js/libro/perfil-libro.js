if(sessionStorage.getItem("tipo") == "adminGlobal" || sessionStorage.getItem("tipo") == "AdminLib"){
  document.getElementById("opciones-cont").classList.add("oculto");
  document.getElementById("info").classList.add("full");
}

if(sessionStorage.getItem("tipo") == "usuarioCliente" || sessionStorage.getItem("nombre") == null){
  document.getElementById("icons").classList.add("oculto");
}

document.getElementById("usrName").innerHTML = sessionStorage.getItem("correo");

var autores = [];
var califs = [];
var sucursales = [];

async function fillPerfil(id){

    var responseAutor = await fetch('/autor/listar', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    });
    var autorJson = await responseAutor.json();
    autores = autorJson;
    var data = {
        id: id
    }
    fetch('/libro/perfil', {
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
          async function(json){
            document.getElementById('portada').src = json["urlImg"];
            document.getElementById('titulo').innerHTML += json['nombre']; 

            var textAutor;
            for(var j=0;j<autores.length;j++){
                if(autores[j]["_id"] == json["autor"]){
                    textAutor = autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"];
                }
            }    

            document.getElementById('autor').innerHTML += textAutor; 

            var data = {
              libro:id
            }
            var response = await fetch('/califLibro/listar', {
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


            document.getElementById('idioma').innerHTML += json['idioma']; 
            document.getElementById('genero').innerHTML += json['genero']; 
            document.getElementById('categoria').innerHTML += json['categoria'];
            document.getElementById('desc').innerHTML += json['descripcion']; 
            fillInventario(id);
            resenas(id);
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
}

async function fillInventario(id){

    var response = await fetch('/sucursal/listarTodo', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    })
    var sucursalesJson = await response.json();
    sucursales = sucursalesJson;
    //inventario = [];
    var data = {
        libro: id
    }

    fetch('/inventario/listarPerfilLibro', {
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
            var list = document.getElementById("opciones");
            removeElements(list);
            
            for(var i=0;i<json.length;i++){
                
                var tr = document.createElement("tr");
                var td1 = document.createElement("td");
                var td2 = document.createElement("td");
                var td3 = document.createElement("td");

                var sucursal = document.createElement("label");
                var precio = document.createElement("label");
                var button = document.createElement("i");

    
                var textSuc;
                for(var j=0;j<sucursales.length;j++){
                  if(sucursales[j]['_id'] == json[i]['sucursal']){
                    textSuc = document.createTextNode(sucursales[j]['nombreSucursal']);
                  }
                }
                sucursal.appendChild(textSuc);
    
                var textPrecio = document.createTextNode("Precio: ₡"+json[i]['precio'].toLocaleString());
                precio.appendChild(textPrecio);

                
                //button.addEventListener('click', addInv);
                
                var aAdd = document.createElement('a');
                button.classList.add('fas');
                button.classList.add('fa-cart-plus');
                button.id = json[i]['_id'];
                aAdd.addEventListener('click', addCart);
                aAdd.appendChild(button);
                
                td1.appendChild(sucursal);
                td2.appendChild(precio);
                td3.appendChild(aAdd);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
    
                document.getElementById("opciones").appendChild(tr);
                //inventario.push(json[i]['isbn']);
            }

            if(json.length == 0){
              var tr = document.createElement("tr");
              var td = document.createElement("td");
              var text = document.createTextNode("Este libro no está disponible");
              td.colSpan = 3;
              td.appendChild(text);
              td.style.textAlign = 'center'; 
              tr.appendChild(td);
              document.getElementById("opciones").appendChild(tr);
            }
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
}

function modificar(){
  window.location.href = "modificar-libro.html";
}

fillPerfil(sessionStorage.getItem("idLibro"));


function addCart(e){

  var a = e.target;
  var id = a.id;

  if(localStorage.getItem("carrito") != "" && localStorage.getItem("carrito") != null){
    var carrito = JSON.parse(localStorage.getItem("carrito"));
    var existe = false;
    for(var i=0;i<carrito.length;i++){
      if(carrito[i]['inventario'] == id){
        existe = true;
        carrito[i] = {
          inventario:id,
          cantidad: carrito[i]['cantidad']+1
        }
      }
    }
    if(!existe){
      carrito.push({
        inventario:id,
        cantidad:1
      });
    }
    
    localStorage.setItem("carrito",JSON.stringify(carrito));
  } else {
    var carrito = [];
    carrito.push({
      inventario:id,
      cantidad:1
    });
    
    localStorage.setItem("carrito",JSON.stringify(carrito));
  }
  document.getElementById('pop-up').classList.remove('oculto');
  document.getElementById('msg-pop').innerHTML = "Libro añadido al carrito";
}

function seguir(){
  window.location.href = "listar-libros.html";
}

function carrito(){
  window.location.href = "carrito.html";
}

async function resenas(id){

    var response = await fetch('/usuario/listar', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    var usuarios = await response.json();
    console.log(usuarios);
    
    var data = {
      libro:id
    }
    var response = await fetch('/califLibro/listar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
    califs = await response.json();

    

    for(var i=0;i<califs.length;i++){
      var tr = document.createElement('tr');
      //foto perfil
      var td = document.createElement('td');
      var ppic = document.createElement('img');

      var wrapper = document.createElement('div');
      var div = document.createElement('div');

      wrapper.classList.add('usr-pic-cont');

      for(var j=0;j<usuarios.length;j++){
        if(usuarios[j]['_id'] == califs[i]['usuario']){
          ppic.src = usuarios[j]['imgUrl'];
        }
      }
      div.appendChild(ppic);
      div.classList.add('usr-pic-pic');
      wrapper.appendChild(div);

      //nombre del usuario
      var div = document.createElement('div');
      var nombre = document.createElement('a');

      for(var j=0;j<usuarios.length;j++){
        if(usuarios[j]['_id'] == califs[i]['usuario']){
          nombre.appendChild(document.createTextNode(usuarios[j]['nombre']+' '+usuarios[j]['apellido1']));
        }
      }
      div.appendChild(nombre);
      div.classList.add('usr-pic-nombre');
      wrapper.appendChild(div);
      td.appendChild(wrapper);
      tr.appendChild(td);

      tr.classList.add('resena');
      document.getElementById('table').appendChild(tr);

      //calificacion
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      var calif = califs[i]['calif'];

      td.appendChild(document.createTextNode('Calificación: '))

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
      tr.appendChild(td);

      tr.classList.add('resena');
      document.getElementById('table').appendChild(tr);

      //fecha
      var tr = document.createElement('tr');
      var td = document.createElement('td');

      var date = new Date(califs[i]['fecha']);
			var formatedDate = date.toLocaleDateString(); 

      td.appendChild(document.createTextNode(formatedDate));
      tr.appendChild(td);

      tr.classList.add('resena');
      document.getElementById('table').appendChild(tr);

      //resena
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(califs[i]['resena']));
      tr.appendChild(td);
      

      document.getElementById('table').appendChild(tr);

    }
    
    
}