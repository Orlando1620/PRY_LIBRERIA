async function fillSucursales(){
    removeElements(document.getElementById('sucursales'));
    var opc = document.createElement("option");
    var textNode = document.createTextNode("Seleccione una sucursal");
    opc.appendChild(textNode);
    document.getElementById("sucursales").appendChild(opc);

    var data ={
        admin_id : sessionStorage.getItem("id")
    }
    var response = await fetch('/libreria/libById', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });
    var libreria = await response.json();


    var data = {
        nombreLibreria: libreria["nombreComercial"]
    }
    var response = await fetch('/sucursal/listar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });
    var json = await response.json();
    console.log(json);

    document.getElementById("sucursales").appendChild(opc);
    for(var i=0;i<json.length;i++){
        var opc = document.createElement("option");
        var textNode = document.createTextNode(json[i]['nombreSucursal']);
        opc.appendChild(textNode);
        opc.value = (json[i]['_id']);

        document.getElementById("sucursales").appendChild(opc);
    }
}
fillSucursales();  

async function fillInventario() {
    var response = await fetch('/libro/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
      })
    var libros = await response.json();

    var list = document.getElementById("libroPromo");
    removeElements(list);
    var option = document.createElement("option");
  
    var nombre = document.createTextNode("Selecione un libro");
    option.appendChild(nombre);
  
    document.getElementById('libroPromo').appendChild(option);
    var data = {
      sucursal:document.getElementById('sucursales').value
    }

    var response = await fetch('/inventario/listar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    
    var json = await response.json();
    if(document.getElementById('sucursales').value != "Seleccione un sucursal"){
        for (var i = 0; i < json.length; i++) {

            var option = document.createElement("option");

            var nombre;
            for(var j=0;j<libros.length;j++){
                if(libros[j]['_id'] == json[i]['libro']){
                    nombre = document.createTextNode(libros[j]['nombre']);
                }
            }
            option.value = json[i]['libro'];

            option.appendChild(nombre);

            document.getElementById('libroPromo').appendChild(option);
        }
    }
}
  
function removeElements(list){
    while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
    }
}


