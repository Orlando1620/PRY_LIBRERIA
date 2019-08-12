if(sessionStorage.getItem("tipo") == "adminGlobal" || sessionStorage.getItem("tipo") == "AdminLib"){
  document.getElementById("opciones-cont").classList.add("oculto");
  document.getElementById("info").classList.add("full");
}

if(sessionStorage.getItem("tipo") == "usuarioCliente" || sessionStorage.getItem("nombre") == null){
  document.getElementById("mod").classList.add("oculto");
}

document.getElementById("usrName").innerHTML = sessionStorage.getItem("correo");
var autores = [];
async function fillPerfil(isbn){

    var responseAutor = await fetch('/autor/listar', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    });
    var autorJson = await responseAutor.json();
    autores = autorJson;
    var data = {
        isbn: isbn
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
          function(json){
            document.getElementById('portada').src = json["urlImg"];
            document.getElementById('titulo').innerHTML += json['nombre']; 

            var textAutor;
            for(var j=0;j<autores.length;j++){
                if(autores[j]["_id"] == json["autor"]){
                    textAutor = autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"];
                }
            }    

            document.getElementById('autor').innerHTML += textAutor; 
            document.getElementById('idioma').innerHTML += json['idioma']; 
            document.getElementById('genero').innerHTML += json['genero']; 
            document.getElementById('categoria').innerHTML += json['categoria'];
            document.getElementById('desc').innerHTML += json['descripcion']; 
            fillInventario(isbn);
          }
      )
      .catch(
        function(err) {
          console.log('Ocurrió un error con la ejecución', err);
        }
      );
}

function fillInventario(isbn){
    //inventario = [];
    var data = {
        isbn: isbn
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
                
                var opcion = document.createElement("div");
                var div1 = document.createElement("div");
                var div2 = document.createElement("div");

                var sucursal = document.createElement("label");
                var precio = document.createElement("p");
                var button = document.createElement("button");

    
                var textSuc = document.createTextNode(json[i]['nombreSuc']);
                sucursal.appendChild(textSuc);
    
                var textPrecio = document.createTextNode("Precio: ₡"+json[i]['precio'].toLocaleString());
                precio.appendChild(textPrecio);

                button.id = json[i]['sucursal'];
                button.innerText = 'Agregar al Carrito';
                //button.addEventListener('click', addInv);
                
                opcion.classList.add("opcion");
                div1.classList.add("div-opcion");
                div2.classList.add("div-opcion");
    
                div1.appendChild(sucursal);
                div1.appendChild(precio);
                div2.appendChild(button);

                opcion.appendChild(div1);
                opcion.appendChild(div2);
    
                document.getElementById("opciones").appendChild(opcion);
                //inventario.push(json[i]['isbn']);
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