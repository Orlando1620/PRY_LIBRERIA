var sucursales = [];
//Fetch para listar autores
async function listarSucursal(nombreLibreria){

  var data = {
    nombreLibreria: nombreLibreria
  }
  fetch('/sucursal/listar', {
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
          for(var i=0;i<json.length;i++){
              sucursales.push(json[i]);
              var tr = document.createElement("tr");
              var td1 = document.createElement("td");
              var td2 = document.createElement("td");
              var td3 = document.createElement("td");

              var a = document.createElement("a");
              
              var textTd1 = document.createTextNode(json[i]['nombreSucursal']);
              a.appendChild(textTd1);
              a.href = "#";
              a.id = json[i]['nombreSucursal'];
              a.addEventListener('click', perfil);

              var textTd2 = document.createTextNode(json[i]['provincia']+", "+json[i]['canton']+", "+json[i]['distrito']);
              var textTd3 = document.createTextNode(json[i]['telefono']);

              td1.appendChild(a);
              td2.appendChild(textTd2);
              td3.appendChild(textTd3);

              td2.colSpan = 2;

              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);

              document.getElementById("lista-suc").appendChild(tr);
          }
        }
    )
    .catch(
      function(err) {
        console.log('Ocurrió un error con la ejecución', err);
      }
    );
}

async function filtrar(){
  nombreLibreria = "Libreria Internacional Com";
  var list = document.getElementById("lista-suc");
  removeElements(list);
  var nombreReq = document.getElementById("buscar").value;
  nombreReq = nombreReq.toLowerCase();
  
  if(sucursales.length>0){
    var resultados = 0;
      for(var i=0;i<sucursales.length;i++){
          var nombreSucursales = sucursales[i]['nombreSucursal'];
          nombreSucursales  = nombreSucursales.toLowerCase();

          if(nombreSucursales.includes(nombreReq)){
              resultados++;
              var tr = document.createElement("tr");
              var td1 = document.createElement("td");
              var td2 = document.createElement("td");
              var td3 = document.createElement("td");


              var a = document.createElement("a");
              
              var textTd1 = document.createTextNode(sucursales[i]['nombreSucursal']);
              a.appendChild(textTd1);
              a.href = "#";
              a.id = sucursales[i]['nombreSucursal'];
              a.addEventListener('click', perfil);

              var textTd2 = document.createTextNode(sucursales[i]['provincia']+", "+sucursales[i]['canton']+", "+sucursales[i]['distrito']);
              var textTd3 = document.createTextNode(sucursales[i]['telefono']);

              td1.appendChild(a);
              td2.appendChild(textTd2);
              td3.appendChild(textTd3);

              td2.colSpan = 2;

              tr.appendChild(td1);
              tr.appendChild(td2);
              tr.appendChild(td3);

              document.getElementById("lista-suc").appendChild(tr);

              
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
  while (list.childNodes[1]) {
      list.removeChild(list.childNodes[1]);
  }
  var titles = document.createElement("tr");
  var t1 = document.createElement("td");
  var t2 = document.createElement("td");
  var t3 = document.createElement("td");

  var textT1 = document.createTextNode("Nombre");
  var textT2 = document.createTextNode("Dirección");
  var textT3 = document.createTextNode("Teléfono");

  t1.appendChild(textT1);
  t2.appendChild(textT2);
  t3.appendChild(textT3);

  t2.colSpan = 2;

  titles.appendChild(t1);
  titles.appendChild(t2);
  titles.appendChild(t3);

  titles.classList.add("table-titles");

  document.getElementById("lista-suc").appendChild(titles);
}

function perfil(e){
  var a = e.target;
  var nombreSucursal = a.id;
  sessionStorage.setItem("nombreSucursal",nombreSucursal);
  window.location.href = "perfil-sucursal.html";
}

listarSucursal(sessionStorage.getItem("nombreLibreria"));