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

        var card = document.createElement("div");
        card.classList.add("card");

        var img = document.createElement("img");
        img.classList.add("img-card");
        img.src = json[i]['urlImg'];
        card.appendChild(img);

        var cardTextCont = document.createElement("div");
        cardTextCont.classList.add("card-text-cont");
        var title = document.createElement("a");
        var textTitle = document.createTextNode(json[i]["nombre"]);
        title.appendChild(textTitle);
        cardTextCont.appendChild(title);
        card.appendChild(cardTextCont);

        title.href = "#";
        title.id = json[i]["_id"];
        title.addEventListener('click', perfil);    

        var cardTextCont2 = document.createElement("div");
        cardTextCont2.classList.add("card-text-cont");
        var label = document.createElement("label");
        var textLabel = document.createTextNode("Por: ");
        label.appendChild(textLabel);
        cardTextCont2.appendChild(label);

        var autor = document.createElement("label");

        var textAutor;
        for(var j=0;j<autores.length;j++){
            if(autores[j]["_id"] == json[i]["autor"]){
                textAutor = document.createTextNode(autores[j]["nombre"]+" "+autores[j]["apellido1"]+" "+autores[j]["apellido2"]);
            }
        }

        autor.appendChild(textAutor);
        cardTextCont2.appendChild(autor);
        card.appendChild(cardTextCont2);

        var cardTextCont3 = document.createElement("div");
        cardTextCont3.classList.add("card-text-cont");
        if(json[i]["calificacion"]){
            for(var j=0;j<json[i]["calificacion"];j++){
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-book");
                icon.classList.add("calif-true");
                cardTextCont3.appendChild(icon);
            }

            for(var j=0;j<5-json[i]["calificacion"];j++){
                var icon = document.createElement("i");
                icon.classList.add("fas");
                icon.classList.add("fa-book");
                icon.classList.add("calif-false");
                cardTextCont3.appendChild(icon);
            }
        } else {
            var califT = document.createTextNode("N/A");
            cardTextCont3.appendChild(califT);
        }
        card.appendChild(cardTextCont3);

        document.getElementById("cards-cont").appendChild(card);
        
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

function perfil(e){
    var a = e.target;
    var id = a.id;
    sessionStorage.setItem("idLibro",id);
    window.location.href = "perfil-libro.html";
}

listarLibros();
