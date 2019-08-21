if(sessionStorage.getItem("tipo") == "adminGlobal" || sessionStorage.getItem("tipo") == "AdminLib"){
  document.getElementById("opciones-cont").classList.add("oculto");
  document.getElementById("info").classList.add("full");
}

if(sessionStorage.getItem("tipo") == "usuarioCliente" || sessionStorage.getItem("nombre") == null){
  document.getElementById("icons").classList.add("oculto");
}

document.getElementById("usrName").innerHTML = sessionStorage.getItem("correo");


window.onload = function () {
  fillPerfil(sessionStorage.getItem("idLibro"));
  fillSucursales();
  document.getElementById('select-opciones').value = "1";
}

var autores = [];
var califs = [];
var sucursales = [];
var promociones = [];
var usuarios = [];
var libros = [];
var idUsuarioItercambio;

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

            document.getElementById('select-opciones').classList.remove('oculto');
              
            fillIntercambios(id);
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
    var response = await fetch('/promocion/listarTodo', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    })
    promociones = await response.json();

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
            //removeElements(list);
            var resultados = 0;
            for(var i=0;i<json.length;i++){
                if(json[i]['cantidad'] > 0){
                  resultados++;
                  var tr = document.createElement("tr");
                  var td1 = document.createElement("td");
                  var td2 = document.createElement("td");
                  var td3 = document.createElement("td");
                  var td4 = document.createElement("td");

                  var sucursal = document.createElement("label");
                  var precio = document.createElement("label");
                  var descuento = document.createElement("label");
                  var button = document.createElement("i");

      
                  var textSuc;
                  for(var j=0;j<sucursales.length;j++){
                    if(sucursales[j]['_id'] == json[i]['sucursal']){
                      textSuc = document.createTextNode(sucursales[j]['nombreSucursal']);
                    }
                  }
                  sucursal.appendChild(textSuc);

                  //promociones
                  var textProm = document.createTextNode('-');
                  for(var j=0;j<promociones.length;j++){
                    if(promociones[j]['libro'] == json[i]['libro'] && promociones[j]['sucursal'] == json[i]['sucursal']){
                      if(new Date(promociones[j]['fechaInicio']) <= new Date() && new Date(promociones[j]['fechaFinaliza']) >= new Date()){
                        textProm = document.createTextNode(promociones[j]['porcentaje']+'%');
                      }
                    }
                  }
                  descuento.appendChild(textProm);

      
                  var textPrecio = document.createTextNode("₡"+json[i]['precio'].toLocaleString());
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
                  td3.appendChild(descuento);
                  td4.appendChild(aAdd);

                  tr.appendChild(td1);
                  tr.appendChild(td2);
                  tr.appendChild(td3);
                  tr.appendChild(td4);
      
                  document.getElementById("opciones").appendChild(tr);
                  //inventario.push(json[i]['isbn']);
              }
            }

            if(json.length == 0 || resultados == 0){
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

async function fillIntercambios(id){
  var response = await fetch('/usuario/listar', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  usuarios = await response.json();
  var resultados = 0;
  for(var i= 0;i<usuarios.length;i++){
    var data = {
      id: usuarios[i]['_id']
    };
  
    var response = await fetch('/usuarioCliente/perfil', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });
    var usuario = await response.json();
    misLibros = usuario['libros'];

    if(usuario['_id'] != sessionStorage.getItem('id')){
      for(var j= 0;j<misLibros.length;j++){
        var idLibro = misLibros[j][0]['libro'];
        var intercambiable = misLibros[j][0]['intercambiable'];
        var cantidad = misLibros[j][0]['cantidad'];
        if(idLibro == id && intercambiable == true && cantidad > 0){
          resultados++;
          var tr = document.createElement("tr");
          var td = document.createElement("td");
          
          var a = document.createElement('a');
          var textNode = document.createTextNode(usuario['nombre']+' '+usuario['apellido1']+' '+usuario['apellido2']);
          a.id = usuario['_id'];
          a.appendChild(textNode);
          a.href = "#";
          a.addEventListener('click', perfil); 
          td.appendChild(a);
          tr.appendChild(td);

          var td = document.createElement("td");
          td.style.textAlign = 'right';
          var btn = document.createElement('button');
          btn.innerHTML = 'Solicitar intercambio';
          btn.id = usuario['_id'];
          btn.addEventListener('click', intercambio);
          btn.classList.add('submit');
          td.appendChild(btn);
          tr.appendChild(td);

          document.getElementById("intercambios").appendChild(tr);
        }
      }
    }
  }
  if(resultados == 0){
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var text = document.createTextNode("Este libro no está disponible");
    td.colSpan = 3;
    td.appendChild(text);
    td.style.textAlign = 'center'; 
    tr.appendChild(td);
    document.getElementById("intercambios").appendChild(tr);
  }

  
}

function opciones(){
  var opc = document.getElementById('select-opciones').value;
  switch(opc){
    case "1":
      document.getElementById('intercambios').classList.add('oculto');
      document.getElementById('opciones').classList.remove('oculto');
      break;
    case "2":
      document.getElementById('opciones').classList.add('oculto');
      document.getElementById('intercambios').classList.remove('oculto');
      break;
  }
}

async function fillSucursales(){
  var response = await fetch('/sucursal/listarTodo', {
    method: 'GET',
    headers:{'Content-Type': 'application/json'}
  });
  var sucursales = await response.json();

  for(var i=0;i<sucursales.length;i++){
    var opc = document.createElement("option");
    var textNode = document.createTextNode(sucursales[i]['nombreSucursal']);
    opc.value = sucursales[i]['_id'];
    opc.appendChild(textNode);

    document.getElementById("sucursales").appendChild(opc);
  }

}

function intercambio(e){
  document.getElementById('pop-up-intercambio').classList.remove('oculto');
  var a = e.target;
  idUsuarioItercambio = a.id;
}

async function aceptarIntercambio(e){
  try{
    var esValido = validarCamposFormulario("form");
    if (esValido == false || validarForm() == false) {
        validarForm();
        document.getElementById("alert-intercambio").classList.remove("oculto");
        document.getElementById("msg-intercambio").innerHTML = "Complete los espacios requeridos";
        return false;
    }
    e.preventDefault();
    if(validarFecha()){
      document.getElementById("alert-intercambio").classList.add("oculto");
      var data = {
        libro: sessionStorage.getItem("idLibro"),
        sucursal: document.getElementById('sucursales').value,
        fecha: document.getElementById('fecha-intercambio').value,
        hora: document.getElementById('hora-intercambio').value,
        usuario1: sessionStorage.getItem('id'),
        usuario2: idUsuarioItercambio
      };
      
      var response  = await fetch('/intercambio/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
      });

      var result = await response.json();
      
      msg = result['result'];
      switch(msg){
        case 'repetido':
              document.getElementById("alert-intercambio").classList.remove("oculto");
              document.getElementById("msg-intercambio").innerHTML = "Ya envió una solicitud por este libro";
              break;
          case 'exito':
              document.getElementById("alert").classList.add("oculto");
              registrarBitacora(sessionStorage.getItem("correo"),'envío de solicitud de intercambio: '+document.getElementById("titulo").value);
              document.getElementById("alert-intercambio-success").classList.remove("oculto");
              document.getElementById("msg-intercambio-success").innerHTML = "Solicitud enviada";
              setTimeout(function () {
                document.getElementById('pop-up-intercambio').classList.add('oculto');
              }, 2000);
              break;
      }
    } else {
      document.getElementById("alert-intercambio").classList.remove("oculto");
      document.getElementById("msg-intercambio").innerHTML = "La fecha del intercambio debe ser en el futuro";
    }
  } catch(err) {
    console.log('Ocurrió un error con la ejecución', err);
  }
}

function validarFecha(){
  var fecha = new Date(document.getElementById('fecha-intercambio').value);
  var hoy = new Date();
      if (hoy >= fecha) {
          return false;
      } else {
          return true;
      }
}

function validarForm(){
  var sucursal = document.getElementById('sucursales').value;

  if(sucursal == "Seleccione una sucursal"){
    document.getElementById('sucursales').classList.add('invalid');
    return false;
  } else {
    document.getElementById('sucursales').classList.remove('invalid');
    return true;
  }
}

function cancelarIntercambio(){
  document.getElementById('pop-up-intercambio').classList.add('oculto');
}

function modificar(){
  window.location.href = "modificar-libro.html";
}

function addCart(e){
  if(sessionStorage.getItem("nombre") == null){
    window.location.href = 'login.html';
    return false;
  }

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
  document.getElementById('pop-up-cart').classList.remove('oculto');
  document.getElementById('msg-pop-cart').innerHTML = "Libro añadido al carrito";
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

    if(califs.length == 0){
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.style.textAlign = 'center';
      td.appendChild(document.createTextNode('No hay reseñas para este libro'));
      tr.appendChild(td);
      document.getElementById('table').appendChild(tr);
    }
    

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

function perfil(e){
  var a = e.target;
  var id = a.id;
  localStorage.setItem("idUsuario",id);
  window.location.href = "perfil-uc-pub.html";
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