async function registroDigital() {
    try {
        var formData = new FormData(document.getElementById('form'));
        await fetch('/libro/localUpload', {
            method: 'POST',
            body: formData,
            enctype: "multipart/form-data"
        });

        var data = {
        nombre: document.getElementById("nombre").value,
        isbn: document.getElementById("isbn").value,
        idioma: document.getElementById("idioma").value,
        autor: document.getElementById("autor").value,
        genero: document.getElementById("genero").value,
        categoria: document.getElementById("categoria").value,
        desc: document.getElementById("desc").value,
        pathImg: 'public/uploads/' + document.getElementById('portada').files[0]['name'],
        pathPdf: 'public/uploads/' + document.getElementById('pdf').files[0]['name']
        };

        var response = await fetch('/libro/registrarDigital', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        var result = await response.json();

        msg = result['result'];
        console.log(msg);
        switch (msg) {
            case 'repetido':
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Un libro con el mismo ISBN ya fue registrado";
                break;
            case 'exito':
                document.getElementById("alert").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"), 'registro libro: ' + document.getElementById("nombre").value);
                document.getElementById("alert-success").classList.remove("oculto");
                document.getElementById("msg-success").innerHTML = "Libro registrado";
                setTimeout(function () {
                    window.location.href = "listar-libros-admin.html";
                }, 2000);
                break;
        }
    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

async function registroImpreso() {
    try {
        var formData = new FormData(document.getElementById('form'));
        await fetch('/libro/localUpload', {
            method: 'POST',
            body: formData,
            enctype: "multipart/form-data"
        });

        var data = {
        nombre: document.getElementById("nombre").value,
        isbn: document.getElementById("isbn").value,
        idioma: document.getElementById("idioma").value,
        autor: document.getElementById("autor").value,
        genero: document.getElementById("genero").value,
        categoria: document.getElementById("categoria").value,
        desc: document.getElementById("desc").value,
        pathImg: 'public/uploads/' + document.getElementById('portada').files[0]['name']
        };

        var response = await fetch('/libro/registrarImpreso', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        var result = await response.json();

        msg = result['result'];
        console.log(msg);
        switch (msg) {
            case 'repetido':
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Un libro con el mismo ISBN ya fue registrado";
                break;
            case 'exito':
                document.getElementById("alert").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"), 'registro libro: ' + document.getElementById("nombre").value);
                document.getElementById("alert-success").classList.remove("oculto");
                document.getElementById("msg-success").innerHTML = "Libro registrado";
                setTimeout(function () {
                    window.location.href = "listar-libros-admin.html";
                }, 2000);
                break;
        }
    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

function filtrarNombre() {
    var list = document.getElementById("cards-cont");
    removeElements(list);
    var nombreReq = document.getElementById('buscar').value;
    nombreReq = nombreReq.toLowerCase();

    if (libros.length > 0) {
        var resultados = 0;
        for (var i = 0; i < libros.length; i++) {
            var nombreRes = libros[i]['nombre'];
            nombreRes = nombreRes.toLowerCase();

            if (nombreRes.includes(nombreReq)) {
                resultados++;
                var card = document.createElement("div");
                card.classList.add("card");

                var img = document.createElement("img");
                img.classList.add("img-card");
                img.src = libros[i]['urlImg'];
                card.appendChild(img);

                var cardTextCont = document.createElement("div");
                cardTextCont.classList.add("card-text-cont");
                var title = document.createElement("a");
                var textTitle = document.createTextNode(libros[i]["nombre"]);
                title.appendChild(textTitle);
                cardTextCont.appendChild(title);
                card.appendChild(cardTextCont);

                title.href = "#";
                title.id = libros[i]["_id"];
                title.addEventListener('click', perfil);

                var cardTextCont2 = document.createElement("div");
                cardTextCont2.classList.add("card-text-cont");
                var label = document.createElement("label");
                var textLabel = document.createTextNode("Por: ");
                label.appendChild(textLabel);
                cardTextCont2.appendChild(label);
                var autor = document.createElement("label");
                var textAutor = document.createTextNode(libros[i]["autor"]);
                autor.appendChild(textAutor);
                cardTextCont2.appendChild(autor);
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
        if (resultados == 0) {
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

function filtrarGenCat() {
    var list = document.getElementById("cards-cont");
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
                if (json.length > 0) {
                    for (var i = 0; i < json.length; i++) {
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
                        for (var j = 0; j < autores.length; j++) {
                            if (autores[j]["_id"] == json[i]["autor"]) {
                                textAutor = document.createTextNode(autores[j]["nombre"] + " " + autores[j]["apellido1"] + " " + autores[j]["apellido2"]);
                    }
                }

                autor.appendChild(textAutor);
                cardTextCont2.appendChild(autor);
                card.appendChild(cardTextCont2);

                var cardTextCont3 = document.createElement("div");
                cardTextCont3.classList.add("card-text-cont");
                        if (json[i]["calificacion"]) {
                            for (var j = 0; j < json[i]["calificacion"]; j++) {
                        var icon = document.createElement("i");
                        icon.classList.add("fas");
                        icon.classList.add("fa-book");
                        icon.classList.add("calif-true");
                        cardTextCont3.appendChild(icon);
                    }

                            for (var j = 0; j < 5 - json[i]["calificacion"]; j++) {
                        var icon = document.createElement("i");
                        icon.classList.add("fas");
                        icon.classList.add("fa-book");
                        icon.classList.add("calif-false");
                        cardTextCont3.appendChild(icon);
                    }
                } else {
                    var califT = document.createTextNode("N/A");
                    calif.appendChild(califT);
                }
                card.appendChild(cardTextCont3);

                document.getElementById("cards-cont").appendChild(card);
            }
                document.getElementById("alert").classList.add("oculto");
            } else {
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "No se encontraron resultados";
            }
        }
    )
    .catch(
            function (err) {
        console.log('Ocurrió un error con la ejecución', err);
        }
    );
}

function removeElements(list) {
    while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
    }
}

function registrarBitacora(correo, accion) {
    var data = {
        correo: correo,
        accion: accion,
        fecha: new Date()
    };
    fetch('/bitacora/add', {
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
    .catch(
            function (err) {
        console.log('Ocurrió un error con la ejecución', err);
        }
    );
}

function nuevoLibro() {
    window.location.href = "registrar-libro.html"
}

async function modDigital() {
    try {
        if (document.getElementById('portada').value != "" && document.getElementById('pdf').value != "") {
            var formData = new FormData(document.getElementById('form'));
            await fetch('/libro/localUpload', {
                method: 'POST',
                body: formData,
                enctype: "multipart/form-data"
            });
            var data = {
                idLibro: idLibro,
                nombre: document.getElementById("nombre").value,
                isbn: document.getElementById("isbn").value,
                idioma: document.getElementById("idioma").value,
                autor: document.getElementById("autor").value,
                genero: document.getElementById("genero").value,
                categoria: document.getElementById("categoria").value,
                desc: document.getElementById("desc").value,
                pathImg: 'public/uploads/' + document.getElementById('portada').files[0]['name'],
                pathPdf: 'public/uploads/' + document.getElementById('pdf').files[0]['name'],
                portada: true,
                pdf: true
            };
        }
        if (document.getElementById('portada').value != "" && document.getElementById('pdf').value == "") {
            var formData = new FormData(document.getElementById('form'));
            await fetch('/libro/localUpload', {
                method: 'POST',
                body: formData,
                enctype: "multipart/form-data"
            });

            var data = {
                idLibro: idLibro,
                nombre: document.getElementById("nombre").value,
                isbn: document.getElementById("isbn").value,
                idioma: document.getElementById("idioma").value,
                autor: document.getElementById("autor").value,
                genero: document.getElementById("genero").value,
                categoria: document.getElementById("categoria").value,
                desc: document.getElementById("desc").value,
                pathImg: 'public/uploads/' + document.getElementById('portada').files[0]['name'],
                pathPdf: pathPdf,
                portada: true,
                pdf: false
            };
        }
        if (document.getElementById('portada').value == "" && document.getElementById('pdf').value != "") {
            var formData = new FormData(document.getElementById('form'));
            await fetch('/libro/localUpload', {
                method: 'POST',
                body: formData,
                enctype: "multipart/form-data"
            });

            var data = {
                idLibro: idLibro,
                nombre: document.getElementById("nombre").value,
                isbn: document.getElementById("isbn").value,
                idioma: document.getElementById("idioma").value,
                autor: document.getElementById("autor").value,
                genero: document.getElementById("genero").value,
                categoria: document.getElementById("categoria").value,
                desc: document.getElementById("desc").value,
                pathImg: pathImg,
                pathPdf: 'public/uploads/' + document.getElementById('pdf').files[0]['name'],
                portada: false,
                pdf: true
            };
        }
        if (document.getElementById('portada').value == "" && document.getElementById('pdf').value == "") {
            var data = {
                idLibro: idLibro,
                nombre: document.getElementById("nombre").value,
                isbn: document.getElementById("isbn").value,
                idioma: document.getElementById("idioma").value,
                autor: document.getElementById("autor").value,
                genero: document.getElementById("genero").value,
                categoria: document.getElementById("categoria").value,
                desc: document.getElementById("desc").value,
                pathImg: pathImg,
                pathPdf: pathPdf,
                portada: false,
                pdf: false
            };
        }

        var response = await fetch('/libro/modificarDigital', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        var result = await response.json();

        msg = result['result'];
        console.log(msg);
        switch (msg) {
            case 'repetido':
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Un libro con el mismo ISBN ya fue registrado";
                break;
            case 'exito':
                document.getElementById("alert").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"), 'modificación libro: ' + document.getElementById("nombre").value);
                document.getElementById("alert-success").classList.remove("oculto");
                document.getElementById("msg-success").innerHTML = "Libro modificado";
                setTimeout(function () {
                    window.location.href = "listar-libros-admin.html";
                }, 2000);
                break;
        }
    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

async function modImpreso() {
    try {
        if (document.getElementById('portada').value != "") {
            var formData = new FormData(document.getElementById('form'));
            await fetch('/libro/localUpload', {
                method: 'POST',
                body: formData,
                enctype: "multipart/form-data"
            });
            var data = {
                idLibro: idLibro,
                nombre: document.getElementById("nombre").value,
                isbn: document.getElementById("isbn").value,
                idioma: document.getElementById("idioma").value,
                autor: document.getElementById("autor").value,
                genero: document.getElementById("genero").value,
                categoria: document.getElementById("categoria").value,
                desc: document.getElementById("desc").value,
                pathImg: 'public/uploads/' + document.getElementById('portada').files[0]['name'],
                portada: true
            };
        } else {
            var data = {
                idLibro: idLibro,
                nombre: document.getElementById("nombre").value,
                isbn: document.getElementById("isbn").value,
                idioma: document.getElementById("idioma").value,
                autor: document.getElementById("autor").value,
                genero: document.getElementById("genero").value,
                categoria: document.getElementById("categoria").value,
                desc: document.getElementById("desc").value,
                pathImg: pathImg,
                portada: false
            };
        }

        var response = await fetch('/libro/modificarImpreso', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });

        var result = await response.json();

        msg = result['result'];
        console.log(msg);
        switch (msg) {
            case 'repetido':
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Un libro con el mismo ISBN ya fue registrado";
                break;
            case 'exito':
                document.getElementById("alert").classList.add("oculto");
                registrarBitacora(sessionStorage.getItem("correo"), 'modificación libro: ' + document.getElementById("nombre").value);
                document.getElementById("alert-success").classList.remove("oculto");
                document.getElementById("msg-success").innerHTML = "Libro modificado";
                setTimeout(function () {
                    window.location.href = "listar-libros-admin.html";
                }, 2000);
                break;
        }
    } catch (err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
}

async function obtenerDatoAsociacionLibro(nombreLibro, idLibro) {

    let datos = {
        nombreLibro: nombreLibro,
        id: idLibro
    }

    let dato = await fetch('/libro/verificarAsociacionLibro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
             return response;
        })
        .catch(err => console.log('Error:', err));

    return dato;
};

async function deleteLibro(id) {

    let dato = {
        id: id
    }

    let msg = await fetch('/libro/deleteLibro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dato)
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            return response;
        })
        .catch(err => console.log('Error:', err));
    return msg;
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