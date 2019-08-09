
var libros = [];
var autores = [];
async function listarLibros(){

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
    var json = await response.json();

    for(var i=0;i<json.length;i++){
        libros.push(json[i]);
        var tRow = document.createElement('tr');
        
        var nombre = document.createElement('td');
        var nombreT = document.createTextNode(json[i]["nombre"]);
        nombre.appendChild(nombreT);
        tRow.appendChild(nombre);

        var autorT;
        for(var j=0;j<autores.length;j++){
            if(autores[j]["_id"] == json[i]["autor"]){
                autorT = document.createTextNode(autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"]);
            }
        }

        var autor = document.createElement('td');
        autor.appendChild(autorT);
        tRow.appendChild(autor);
        
        var calif = document.createElement('td');
        if(json[i]["calificacion"]){
            for(var j=0;j<json[i]["calificacion"];j++){
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-book");
                icon.classList.add("calif-true");
                calif.appendChild(icon);
            }

            for(var j=0;j<5-json[i]["calificacion"];j++){
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-book");
                icon.classList.add("calif-false");
                calif.appendChild(icon);
            }
        } else {
            var califT = document.createTextNode("N/A");
            calif.appendChild(califT);
        }
        tRow.appendChild(calif);

        var table = document.getElementById("table");
        table.appendChild(tRow);
    }
}

fetch('/genero/listar', {
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
                var textNode = document.createTextNode(json[i]['nombre']);
                opc.appendChild(textNode);
    
                document.getElementById("generos").appendChild(opc);
            }
        }
    )
    .catch(
        function(err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    );

fetch('/categoria/listar', {
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
            var textNode = document.createTextNode(json[i]['nombre']);
            opc.appendChild(textNode);

            document.getElementById("categorias").appendChild(opc);
        }
    }
)
.catch(
    function(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
);
        


function filtrarNombre(){
    var list = document.getElementById("table");
    removeElements(list);
    var nombreReq = document.getElementById('buscar').value;
    nombreReq = nombreReq.toLowerCase();
    
    if(libros.length>0){
        var resultados = 0;
        for(var i=0;i<libros.length;i++){
            var nombreRes = libros[i]['nombre'];
            nombreRes = nombreRes.toLowerCase();

            if(nombreRes.includes(nombreReq)){
                resultados++;
                var tRow = document.createElement('tr');
                
                var nombre = document.createElement('td');
                var nombreT = document.createTextNode(libros[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);

                var autor = document.createElement('td');
                var autorT = document.createTextNode(libros[i]["autor"]);
                autor.appendChild(autorT);
                tRow.appendChild(autor);
                
                var calif = document.createElement('td');
                if(libros[i]["calificacion"]){
                    for(var j=0;j<libros[i]["calificacion"];j++){
                        var icon = document.createElement("i");
                        icon.classList.add("fas");
                        icon.classList.add("fa-book");
                        icon.classList.add("calif-true");
                        calif.appendChild(icon);
                    }
        
                    for(var j=0;j<5-libros[i]["calificacion"];j++){
                        var icon = document.createElement("i");
                        icon.classList.add("fas");
                        icon.classList.add("fa-book");
                        icon.classList.add("calif-false");
                        calif.appendChild(icon);
                    }
                } else {
                    var califT = document.createTextNode("N/A");
                    calif.appendChild(califT);
                }
                tRow.appendChild(calif);

                var table = document.getElementById("table");
                table.appendChild(tRow);
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
  
function filtrarGenCat(){
    var list = document.getElementById("table");
    removeElements(list);
    document.getElementById("buscar").value = "";
    libros = [];

    var data = {
        gen: document.getElementById("generos").value,
        cat: document.getElementById("categorias").value
    };
    fetch('/libro/filtrarGenCat', {
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
                libros.push(json[i]);
                var tRow = document.createElement('tr');
        
                var nombre = document.createElement('td');
                var nombreT = document.createTextNode(json[i]["nombre"]);
                nombre.appendChild(nombreT);
                tRow.appendChild(nombre);

                var autorT;
                for(var j=0;j<autores.length;j++){
                    if(autores[j]["_id"] == json[i]["autor"]){
                        autorT = document.createTextNode(autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"]);
                    }
                }

                var autor = document.createElement('td');
                autor.appendChild(autorT);
                tRow.appendChild(autor);
                
                var calif = document.createElement('td');
                if(json[i]["calificacion"]){
                    for(var j=0;j<json[i]["calificacion"];j++){
                        var icon = document.createElement("i");
                        icon.classList.add("fas");
                        icon.classList.add("fa-book");
                        icon.classList.add("calif-true");
                        calif.appendChild(icon);
                    }

                    for(var j=0;j<5-json[i]["calificacion"];j++){
                        var icon = document.createElement("i");
                        icon.classList.add("fas");
                        icon.classList.add("fa-book");
                        icon.classList.add("calif-false");
                        calif.appendChild(icon);
                    }
                } else {
                    var califT = document.createTextNode("N/A");
                    calif.appendChild(califT);
                }
                tRow.appendChild(calif);

                var table = document.getElementById("table");
                table.appendChild(tRow);
            }
                document.getElementById("alert").classList.add("oculto");
            } else {
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "No se encontraron resultados";
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
    while (list.hasChildNodes()) {   
    list.removeChild(list.firstChild);
    }
    var titles = document.createElement("tr");
    var t1 = document.createElement("td");
    var t2 = document.createElement("td");
    var t3 = document.createElement("td");

    var textT1 = document.createTextNode("Nombre");
    var textT2 = document.createTextNode("Autor");
    var textT3 = document.createTextNode("Calificación");

    t1.appendChild(textT1);
    t2.appendChild(textT2);
    t3.appendChild(textT3);

    titles.appendChild(t1);
    titles.appendChild(t2);
    titles.appendChild(t3);

    titles.classList.add("table-titles");

    document.getElementById("table").appendChild(titles);
}

function nuevoLibro(){
    window.location.href = "registrar-libro.html"
}

listarLibros();