var alert = document.getElementById('alert');
var alertCorrect = document.getElementById("alertCorrect");


function mostrarPopUp() {
    document.getElementById("pop-up").classList.remove("oculto");
}

function cancelar() {
    document.getElementById("pop-up").classList.add("oculto");
}

async function eliminarLibro() {
    var idLibro = sessionStorage.getItem('idLibro');
    var nombrelibro = document.getElementById("titulo").innerHTML;

    var tmp = await obtenerDatoAsociacionLibro(nombrelibro, idLibro);

    if (tmp) {
        mostrarMsg('alert');
    } else {
        var del = await deleteLibro(idLibro);
        if (del) {
            mostrarMsg('alertCorrect');
            setTimeout(function () {
                window.location.href = ("listar-libros-admin.html");
            }, 3000);

        }

    }
}

function aceptar() {
    eliminarLibro();
    document.getElementById("pop-up").classList.add("oculto");
}


function cancelar() {
    document.getElementById("pop-up").classList.add("oculto");
}

function mostrarMsg(id_clase_error) {
    setTimeout(function () {
        document.getElementById(id_clase_error).classList.add("oculto");
    }, 3000);

    document.getElementById(id_clase_error).classList.remove("oculto");

}