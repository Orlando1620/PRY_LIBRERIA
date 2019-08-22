// JavaScript Document
if (sessionStorage.getItem("nombre") == null) {
    document.getElementById("btn-reg").classList.add("oculto");
}

var clubes = [];
var generosBD = [];

fetch('/genero/listar', {
    method: 'GET',
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
            for (var i = 0; i < json.length; i++) {
                generosBD[i] = json[i]['nombre'];
                var opc = document.createElement("option");
                var textNode = document.createTextNode(json[i]['nombre']);
                opc.appendChild(textNode);

                document.getElementById("generos").appendChild(opc);
            }
            listarClubesAll();
        }
    )
    .catch(
        function (err) {
            console.log('Ocurrió un error con la ejecución', err);
        }
    );



function fillClubes(json) {
    for (var i = 0; i < json.length; i++) {
        clubes.push(json[i]);
        var tRow = document.createElement('tr');

        var nombre = document.createElement('td');
        var nombreInput = document.createElement('input');
        //var nombreT = document.createTextNode(json[i]["nombre"]);
        nombreInput.id = json[i]['_id'] + '_' + "nombre";
        nombreInput.value = json[i]["nombre"];
        nombreInput.classList.add('inputActualizar');
        nombreInput.readOnly = true;

        nombre.appendChild(nombreInput);

        tRow.appendChild(nombre);

        var genero = document.createElement('td');
        //var generoT = document.createTextNode(json[i]["genero"]);
        /*var generoInput = document.createElement('input');
        generoInput.value = json[i]["genero"];
        generoInput.id = json[i]['_id'] + '_' + "genero";
        generoInput.readOnly = true;
        generoInput.classList.add('inputActualizar');
        genero.appendChild(generoInput);
        tRow.appendChild(genero);*/
        var generoSelect = document.createElement('select');

        var idSel = json[i]['_id'] + "_genero";
        generoSelect.id = idSel;
        for (var y = 0; y < generosBD.length; y++) {
            var opc = document.createElement("option");
            var textNode = document.createTextNode(generosBD[y]);
            opc.appendChild(textNode);
            generoSelect.appendChild(opc);
        }
        generoSelect.value = json[i]["genero"];
        genero.appendChild(generoSelect);
        tRow.appendChild(genero);

        var tipo = document.createElement('td');
        //var tipoT = document.createTextNode(json[i]["tipo"]);
        /*var tipoInput = document.createElement('input');
        tipoInput.value = json[i]["tipo"];
        tipoInput.id = json[i]['_id'] + '_' + "tipo";
        tipoInput.readOnly = true;
        tipoInput.classList.add('inputActualizar');
        tipo.appendChild(tipoInput);
        tRow.appendChild(tipo);*/
        var tipoSelect = document.createElement('select');
        var idtipoSel = json[i]['_id'] + "_tipo";
        tipoSelect.id = idtipoSel;

        var opc1 = document.createElement("option");
        var textNode1 = document.createTextNode('Físico');
        opc1.appendChild(textNode1);
        tipoSelect.appendChild(opc1);

        var opc2 = document.createElement("option");
        var textNode2 = document.createTextNode('Virtual');
        opc2.appendChild(textNode2);
        tipoSelect.appendChild(opc2);

        tipoSelect.value = json[i]["tipo"];

        tipo.appendChild(tipoSelect);
        tRow.appendChild(tipo);

        var tdEliminar = document.createElement("td");
        var tdModificar = document.createElement("td");

        var a = document.createElement('a');
        var add = document.createElement("i");
        add.classList.add('fas');
        add.classList.add('fa-trash');
        add.id = json[i]['_id'] + '_eliminar';
        a.addEventListener('click', popDel);
        a.appendChild(add);
        tdEliminar.appendChild(a);
        tRow.appendChild(tdEliminar);

        var a = document.createElement('a');
        var add = document.createElement("i");
        add.classList.add('fas');
        add.classList.add('fa-pencil-alt');
        add.id = json[i]['_id'] + '_modificar';
        a.addEventListener('click', modificarClub);
        a.appendChild(add);
        tdModificar.appendChild(a);
        tRow.appendChild(tdModificar);


        var table = document.getElementById("table");
        table.appendChild(tRow);
    }
}

function listarClubesAll() {


    fetch('/clubes/listar', {
        method: 'GET',
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
                fillClubes(json);
            }
        )
        .catch(
            function (err) {
                console.log('Ocurrió un error con la ejecución', err);
            }
        );
}



function filtrarNombre() {

    var list = document.getElementById('table');
    removeElements(list);

    var nameInput = document.getElementById("buscar").value;
    nameInput = nameInput.toLowerCase();

    if (clubes.length > 0) {
        var resultados = 0;
        for (var i = 0; i < clubes.length; i++) {

            var name = clubes[i]["nombre"];
            name = name.toLowerCase();

            if (name.includes(nameInput)) {
                resultados++;

                var tRow = document.createElement('tr');

                var nombre = document.createElement('td');
                var nombreInput = document.createElement('input');
                // var nombreT = document.createTextNode(clubes[i]["nombre"]);
                nombreInput.id = clubes[i]['_id'] + '_' + "nombre";
                nombreInput.value = clubes[i]["nombre"];
                nombreInput.classList.add('inputActualizar');
                nombreInput.readOnly = true;

                nombre.appendChild(nombreInput);
                tRow.appendChild(nombre);
 
                var genero = document.createElement('td');

                var generoSelect = document.createElement('select');

                var idSel = clubes[i]['_id'] + "_genero";
                generoSelect.id = idSel;
                for (var y = 0; y < generosBD.length; y++) {
                    var opc = document.createElement("option");
                    var textNode = document.createTextNode(generosBD[y]);
                    opc.appendChild(textNode);
                    generoSelect.appendChild(opc);
                }
                generoSelect.value = clubes[i]["genero"];
                genero.appendChild(generoSelect);
                tRow.appendChild(genero);

                var tipo = document.createElement('td');
                
                var tipoSelect = document.createElement('select');
                var idtipoSel = clubes[i]['_id'] + "_tipo";
                tipoSelect.id = idtipoSel;

                var opc1 = document.createElement("option");
                var textNode1 = document.createTextNode('Físico');
                opc1.appendChild(textNode1);
                tipoSelect.appendChild(opc1);

                var opc2 = document.createElement("option");
                var textNode2 = document.createTextNode('Virtual');
                opc2.appendChild(textNode2);
                tipoSelect.appendChild(opc2);

                tipoSelect.value = clubes[i]["tipo"];

                tipo.appendChild(tipoSelect);
                tRow.appendChild(tipo);

                var tdEliminar = document.createElement("td");
                var tdModificar = document.createElement("td");

                var a = document.createElement('a');
                var add = document.createElement("i");
                add.classList.add('fas');
                add.classList.add('fa-trash');
                add.id = clubes[i]['_id'];
                a.addEventListener('click', popDel);
                a.appendChild(add);
                tdEliminar.appendChild(a);
                tRow.appendChild(tdEliminar);

                var a = document.createElement('a');
                var add = document.createElement("i");
                add.classList.add('fas');
                add.classList.add('fa-pencil-alt');
                add.id = clubes[i]['_id'];
                a.addEventListener('click', modificarClub);
                a.appendChild(add);
                tdModificar.appendChild(a);
                tRow.appendChild(tdModificar);

                var table = document.getElementById("table");
                table.appendChild(tRow);
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


function filtrarGenTipo() {

    var list = document.getElementById('table');
    removeElements(list);
    document.getElementById("buscar").value = "";
    clubes = [];

    var data = {
        genero: document.getElementById("generos").value,
        tipo: document.getElementById("tipo").value
    };
    fetch('/clubes/filtrarGenTipo', {
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
                    fillClubes(json);
                   
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


function filtrarTipo() {

    var list = document.getElementById('table');
    removeElements(list);

    var data = {
        tipo: document.getElementById("tipo").value
    };
    fetch('/clubes/filtrarTipo', {
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
                    fillClubes(json);
                    /*for (var i = 0; i < json.length; i++) {
                        var tRow = document.createElement('tr');

                        var nombreT = document.createElement('td');

                        var nombre = document.createElement('input');
                        nombre.value = json[i]["nombre"];
                        nombre.id = json[i]['_id'] + '_' + "nombre";
                        nombre.readOnly = true;
                        nombre.classList.add('inputActualizar');

                        nombreT.appendChild(nombre);
                        tRow.appendChild(nombreT);

                        var genero = document.createElement('td');
                        var generoT = document.createTextNode(json[i]["genero"]);
                        genero.appendChild(generoT);
                        tRow.appendChild(genero);

                        var tipo = document.createElement('td');
                        var tipoT = document.createTextNode(json[i]["tipo"]);
                        tipo.appendChild(tipoT);
                        tRow.appendChild(tipo);

                        var tdEliminar = document.createElement("td");
                        var tdModificar = document.createElement("td");

                        var a = document.createElement('a');
                        var add = document.createElement("i");
                        add.classList.add('fas');
                        add.classList.add('fa-trash');
                        a.appendChild(add);
                        tdEliminar.appendChild(a);
                        tRow.appendChild(tdEliminar);

                        var a = document.createElement('a');
                        var add = document.createElement("i");
                        add.classList.add('fas');
                        add.classList.add('fa-pencil-alt');
                        add.id = clubes[i]['_id'];
                        a.addEventListener('click', modificarClub);
                        a.appendChild(add);
                        tdModificar.appendChild(a);
                        tRow.appendChild(tdModificar);

                        var table = document.getElementById("table");
                        table.appendChild(tRow);
                    }*/
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
    while (list.childNodes.length > 2) {
        list.removeChild(list.lastChild);
    }
}

function nuevoClub(e) {
    window.location.href = "registrar-club.html";
}