function nuevaPromocion(event){
  window.location.href = "registrar-promocion-global.html";
}

function nuevaPromocionLib(event){
  window.location.href = "registrar-promocion.html";
}

var promociones;
var libros;
var sucursales;
var admin_id = sessionStorage.getItem("id");


async function listarPromociones(){
var response = await fetch('/libro/listar', {
    method: 'GET',
    headers:{'Content-Type': 'application/json'}
  })
libros = await response.json();

var nombreLibreria = await fetchLib();

var data = {
  nombreLibreria: nombreLibreria
}
var response = await fetch('/sucursal/listarSucursalInv', {
  method: 'POST',
  body: JSON.stringify(data),
  headers:{'Content-Type': 'application/json'}
})
sucursales = await response.json();

var resultados = 0;
for(var i=0;i<sucursales.length;i++){
  var data = {
    sucursal: sucursales[i]['_id']
  }
  var response = await fetch('/promocion/listarBySuc', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{'Content-Type': 'application/json'}
  })
  promociones = await response.json();
  resultados += promociones.length;
  fillPromociones();
}
if(resultados.length == 0){
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  var text = document.createTextNode("No hay promociones activas");
  td.colSpan = 6;
  td.appendChild(text);
  td.style.textAlign = 'center'; 
  tr.appendChild(td);
  document.getElementById("lista-prom").appendChild(tr);
}
}
listarPromociones();

function fillPromociones(){
for(var i=0;i<promociones.length;i++){
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("td");
  var td5 = document.createElement("td");
  // var td6 = document.createElement("td");

  var textTd1;
  for(var j=0;j<sucursales.length;j++){
      if(sucursales[j]['_id'] == promociones[i]['sucursal']){
          textTd1 = document.createTextNode(sucursales[j]['nombreSucursal']);
      }
  }
  td1.appendChild(textTd1);


  var textTd2;
  for(var j=0;j<libros.length;j++){
      if(libros[j]['_id'] == promociones[i]['libro']){
          textTd2 = document.createTextNode(libros[j]['nombre']);
      }
  }
  td2.appendChild(textTd2);

  var textTd3 = document.createTextNode(promociones[i]['porcentaje']+ "%");
  td3.appendChild(textTd3);

  var date = new Date(promociones[i]['fechaInicio']);

  var textTd4 = document.createTextNode(date.toLocaleDateString());
  td4.appendChild(textTd4);

  var date2 = new Date(promociones[i]['fechaFinaliza']);

  var textTd5 = document.createTextNode(date2.toLocaleDateString());
  td5.appendChild(textTd5);
  

  // var textTd6 = document.createTextNode(json[i]['sucursal']);
  // td6.appendChild(textTd1);
  var modDelTd = document.createElement("td");
  var aMod = document.createElement('a');
  var mod = document.createElement("i");
  mod.classList.add('fas');
  mod.classList.add('fa-pencil-alt');
  mod.id = promociones[i]['_id'];
  //aMod.addEventListener('click', modInv);
  aMod.appendChild(mod);
  modDelTd.appendChild(aMod);

  var aDel = document.createElement('a');
  var del = document.createElement("i");
  del.classList.add('fas');
  del.classList.add('fa-trash-alt');
  del.id = promociones[i]['_id'];
  //aDel.addEventListener('click', popDel);
  aDel.appendChild(del);
  modDelTd.appendChild(aDel);



  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(modDelTd);

  document.getElementById("lista-prom").appendChild(tr);
}
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

function filtrar(){
var list = document.getElementById("lista-prom");
removeElements(list);
var nombreReq = document.getElementById("buscar").value;
nombreReq = nombreReq.toLowerCase();

if(promociones.length>0){
  var resultados = 0;
  for(var i=0;i<promociones.length;i++){


    var sucursal;
    for(var j=0;j<sucursales.length;j++){
        if(sucursales[j]['_id'] == promociones[i]['sucursal']){
            sucursal = sucursales[j]['nombreSucursal'];
        }
    }

    var libro;
    for(var j=0;j<libros.length;j++){
        if(libros[j]['_id'] == promociones[i]['libro']){
            libro = libros[j]['nombre'];
        }
    }

    var nombreRes =sucursal+" "+libro;
    nombreRes = nombreRes.toLowerCase();

    if(nombreRes.includes(nombreReq)){
      resultados++;
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");
      var td4 = document.createElement("td");
      var td5 = document.createElement("td");
      // var td6 = document.createElement("td");

      var textTd1;
      for(var j=0;j<sucursales.length;j++){
          if(sucursales[j]['_id'] == promociones[i]['sucursal']){
              textTd1 = document.createTextNode(sucursales[j]['nombreSucursal']);
          }
      }
      td1.appendChild(textTd1);


      var textTd2;
      for(var j=0;j<libros.length;j++){
          if(libros[j]['_id'] == promociones[i]['libro']){
              textTd2 = document.createTextNode(libros[j]['nombre']);
          }
      }
      td2.appendChild(textTd2);

      var textTd3 = document.createTextNode(promociones[i]['porcentaje']+ "%");
      td3.appendChild(textTd3);

      var date = new Date(promociones[i]['fechaInicio']);

      var textTd4 = document.createTextNode(date.toLocaleDateString());
      td4.appendChild(textTd4);

      var date2 = new Date(promociones[i]['fechaFinaliza']);

      var textTd5 = document.createTextNode(date2.toLocaleDateString());
      td5.appendChild(textTd5);

      // var textTd6 = document.createTextNode(promociones[i]['sucursal']);
      // td6.appendChild(textTd1);




      var modDelTd = document.createElement("td");
  var aMod = document.createElement('a');
  var mod = document.createElement("i");
  mod.classList.add('fas');
  mod.classList.add('fa-pencil-alt');
  mod.id = promociones[i]['_id'];
  //aMod.addEventListener('click', modInv);
  aMod.appendChild(mod);
  modDelTd.appendChild(aMod);

  var aDel = document.createElement('a');
  var del = document.createElement("i");
  del.classList.add('fas');
  del.classList.add('fa-trash-alt');
  del.id = promociones[i]['_id'];
  //aDel.addEventListener('click', popDel);
  aDel.appendChild(del);
  modDelTd.appendChild(aDel);



  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(modDelTd);

      document.getElementById("lista-prom").appendChild(tr);
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
  var t2 = document.createElement("td");
  var t3 = document.createElement("td");
  var t4 = document.createElement("td");
  var t5 = document.createElement("td");
  var t6 = document.createElement("td");
  var t7 = document.createElement("td");


  var textT2 = document.createTextNode("Sucursal");
  var textT3 = document.createTextNode("Libro");
  var textT4 =document.createTextNode("Descuento")
  var textT5 =document.createTextNode("Fecha de inicio")
  var textT6 =document.createTextNode("Fecha finalización")


  t2.appendChild(textT2);
  t3.appendChild(textT3);
  t4.appendChild(textT4);
  t5.appendChild(textT5);
  t6.appendChild(textT6);


  t7.colSpan = 2;

  titles.appendChild(t2);
  titles.appendChild(t3);
  titles.appendChild(t4);
  titles.appendChild(t5);
  titles.appendChild(t6);
  titles.appendChild(t7);



  titles.classList.add("table-titles");

  document.getElementById("lista-prom").appendChild(titles);
}