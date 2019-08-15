var tmp;

async function eliminarLibro() {
    var idLibro = sessionStorage.getItem('idLibro');
    var nombrelibro = document.getElementById("titulo").innerHTML;

    var tmp = await obtenerDatoAsociacionLibro(nombrelibro, idLibro);

    if (tmp) {
        //mostrarle el msj que no lo puede eliminar

    } else {
        //mostrarle el msj si de verdad lo quiere eliminar
        //cuando le de que si 
    }

}


function aceptar() {
    document.getElementById("pop-up").classList.add("oculto");
    //eliminarLibro();
}


function cancelar() {
    document.getElementById("pop-up").classList.add("oculto");
}
