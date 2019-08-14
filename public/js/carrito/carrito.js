var inventarios = [];
var libros = [];
var sucursales = [];
var carrito;
var impuesto;

window.onload = function () {
    fillCarrito();
}

async function fillCarrito(){
    carrito = JSON.parse(localStorage.getItem('carrito'));

    var response = await fetch('/inventario/listarTodo', {
      method: 'GET',
      headers:{'Content-Type': 'application/json'}
    })
    inventarios = await response.json();

    var response = await fetch('/libro/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
      })
    libros = await response.json();

    var response = await fetch('/impuesto/listar', {
        method: 'GET',
        headers:{'Content-Type': 'application/json'}
    })
    impuestoJson = await response.json();
    impuesto = impuestoJson[0]['valor'];

    var list = document.getElementById("table");
    removeElements(list);
    var total = 0;
    for(var i=0;i<carrito.length;i++){
        var tr = document.createElement("tr");

        var inventario;
        for(var j=0;j<inventarios.length;j++){
            if(inventarios[j]['_id'] == carrito[i]['inventario']){
                inventario = inventarios[j];
            }
        }

        var td = document.createElement("td");
        var libro = document.createElement('a');
        var cover = document.createElement('img');
        for(var j=0;j<libros.length;j++){
            if(libros[j]['_id'] == inventario['libro']){
                libro.appendChild(document.createTextNode(libros[j]['nombre']));
                libro.id = libros[j]['_id'];
                cover.src = libros[j]['urlImg'];
            }
        }
        td.appendChild(cover);
        tr.appendChild(td);

        var td = document.createElement("td");
        libro.href = "#";
        libro.addEventListener('click', perfil); 
        td.appendChild(libro);
        tr.appendChild(td);
        
        var td = document.createElement("td");
        var cantidad = document.createElement('input');
        cantidad.type = 'number';
        cantidad.value = carrito[i]['cantidad'];
        cantidad.min = 0;
        cantidad.id = carrito[i]['inventario'];
        cantidad.addEventListener('change', mod);

        cantidad.classList.add('cantidad');
        
        td.appendChild(cantidad);
        tr.appendChild(td);

        var td = document.createElement("td");
        var precio = document.createTextNode("₡"+(inventario['precio']).toLocaleString());
        total += inventario['precio']*carrito[i]['cantidad'];
        td.appendChild(precio);
        tr.appendChild(td);

        var td = document.createElement("td");
        var a = document.createElement('a');
        var del = document.createElement('i');
        del.classList.add('fas');
        del.classList.add('fa-minus-circle');
        del.id = carrito[i]['inventario'];
        a.addEventListener('click', remove);
        a.appendChild(del);
        td.appendChild(a);
        tr.appendChild(td);

        document.getElementById("table").appendChild(tr);
    }
    var impAgregado = total*(impuesto/100);
    total = total+impAgregado;
    
    document.getElementById('total').innerHTML = '₡'+(total).toLocaleString();
    document.getElementById('imp').innerHTML = 'IVA: ₡'+ (impAgregado).toLocaleString();

    if(carrito.length == 0){
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var text = document.createTextNode("El carrito está vacío");
        td.colSpan = 4;
        td.appendChild(text);
        td.style.textAlign = 'center'; 
        tr.appendChild(td);
        document.getElementById("opciones").appendChild(tr);
    }
}

function removeElements(list){
    
    while (list.hasChildNodes()) {   
        list.removeChild(list.firstChild);
    }

    var tr = document.createElement("tr");
    var td = document.createElement("td");

    var libro = document.createTextNode("Libro");
    td.colSpan = 2;
    td.appendChild(libro);
    tr.appendChild(td);

    var td = document.createElement("td");
    var cantidad = document.createTextNode("Cantidad");
    td.appendChild(cantidad);
    tr.appendChild(td);

    var td = document.createElement("td");
    var precio = document.createTextNode("Precio");
    td.colSpan = 2;
    td.appendChild(precio);
    tr.appendChild(td);

    tr.classList.add('table-titles')
    document.getElementById("table").appendChild(tr);
}


function mod(e){
    
    var a = e.target;
    var id = a.id;
    var nuevoCarrito = [];

    for(var i=0;i<carrito.length;i++){
        if(carrito[i]['inventario'] == id){
            var cantidad = document.getElementById(id).value;
            if(cantidad != 0){
                nuevoCarrito.push({
                    inventario:id,
                    cantidad: cantidad
                });
            } 
        } else {
            nuevoCarrito.push(carrito[i]);
        }
    }

    localStorage.setItem("carrito",JSON.stringify(nuevoCarrito));
    fillCarrito();
}

function remove(e){
    
    var a = e.target;
    var id = a.id;
    var nuevoCarrito = [];

    for(var i=0;i<carrito.length;i++){
        if(carrito[i]['inventario'] != id){
            nuevoCarrito.push(carrito[i]);
        } 
    }

    localStorage.setItem("carrito",JSON.stringify(nuevoCarrito));
    fillCarrito();
}

function perfil(e){
    var a = e.target;
    var id = a.id;
    sessionStorage.setItem("idLibro",id);
    window.location.href = "perfil-libro.html";
}