'use strict';
if (sessionStorage.getItem("tipo") == "usuarioCliente" || sessionStorage.getItem("nombre") == null) {
    document.getElementById("mod").classList.add("oculto");
}

window.onload = function () {
    cargarPerfil();
}

async function cargarPerfil() {
    let autor = await obtener_autor(localStorage.getItem('idAutor'));
    document.getElementById("eliminarAutorInput").value = localStorage.getItem('idAutor');

    document.getElementById("nombreCompletoAutor").innerHTML = autor.nombre + " " + autor.apellido1 + " " + autor.apellido2;
    var fechaDeNacimiento = new Date(autor.nac);
    document.getElementById("fechaDeNacimiento").innerHTML = "Fecha de nacimiento: " + fechaDeNacimiento.toLocaleDateString();

    document.getElementById("edad").innerHTML = "Edad: " + getAnnos(autor.nac)

    document.getElementById("infoAutor").innerHTML = autor.bio;

    document.getElementById("imagenAutor").src = autor.imgUrl;

    for (var i = 0; i < autor.libros.length; i++) {
        var card = document.createElement("div");
        card.classList.add("card");

        var img = document.createElement("img");
        img.classList.add("img-card");
        img.src = autor.libros[i]['urlImg'];
        card.appendChild(img);

        var cardTextCont = document.createElement("div");
        cardTextCont.classList.add("card-text-cont");
        var title = document.createElement("a");
        var textTitle = document.createTextNode(autor.libros[i]["nombre"]);
        title.appendChild(textTitle);
        cardTextCont.appendChild(title);
        card.appendChild(cardTextCont);

        title.href = "#";
        title.id = autor.libros[i]["isbn"];
        title.addEventListener('click', perfil);

        var cardTextCont2 = document.createElement("div");
        cardTextCont2.classList.add("card-text-cont");
        var label = document.createElement("label");
        var textLabel = document.createTextNode("Por: ");
        label.appendChild(textLabel);
        cardTextCont2.appendChild(label);
        var autorLibro = document.createElement("label");
        var textAutor = document.createTextNode(autor.libros[i]["autor"]);
        autorLibro.appendChild(textAutor);
        cardTextCont2.appendChild(autorLibro);
        card.appendChild(cardTextCont2);

        var cardTextCont3 = document.createElement("div");
        cardTextCont3.classList.add("card-text-cont");
        for (var j = 0; j < 5; j++) {
            var icon = document.createElement("i");
            icon.classList.add("fas");
            icon.classList.add("fa-book");
            cardTextCont3.appendChild(icon);
        }
        card.appendChild(cardTextCont3);



        document.getElementById("cards-cont").appendChild(card);

    }

}

function getAnnos(nacimiento) {
    var today = new Date();
    var birthDate = new Date(nacimiento);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

function perfil(e) {
    var a = e.target;
    var isbn = a.id;
    sessionStorage.setItem("idLibro", isbn);
    window.location.href = "perfil-libro.html";
}

function modificar() {
    window.location.href = "modificar-autor.html";
}

var varAccion;

function popDel(accion){
  varAccion = accion;
  document.getElementById("pop-up").classList.remove("oculto");
  document.getElementById("msg-pop").innerHTML = "¿Desea eliminar este autor?";
}

function aceptar(){
  document.getElementById("pop-up").classList.add("oculto");
  eliminarAutor();
}

function msgInfoBtn(){
    document.getElementById("msgInfo").classList.add("oculto");
}

function cancelar(){
  document.getElementById("pop-up").classList.add("oculto");
}

function eliminarAutor() {

    try {
        var autorInput = document.getElementById("eliminarAutorInput").value;

        var data = {
            autor: autorInput
        };
        var dataAutor = {
            id: autorInput
        };
        fetch('/libro/validarAutLibros', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(
                function (response) {
                    if (response.status != 200)
                        console.log('Ocurrió un error con el servicio: ' + response.status);
                    else
                        return response.json();
                }
            )
            .then(
                function (json) {
                    if (json.length == 0) {
                        eliminarAutorNoAsociado(dataAutor);
                    } else {
                        document.getElementById("msg-pop-info").innerHTML = "No se puede eliminar el autor porque hay libros asociados a el primero elimine los libros";
                        document.getElementById("msgInfo").classList.remove("oculto");
                    }
                }
            )
            .catch(
                function (err) {
                    console.log('Ocurrió un error con la ejecución', err);
                }
            );

    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

function eliminarAutorNoAsociado(data) {
    fetch('/autor/del', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    });
    window.location.href = "listar-autores-admin.html";
    
}