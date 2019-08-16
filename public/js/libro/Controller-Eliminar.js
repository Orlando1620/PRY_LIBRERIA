function mostrarPopUp(){
    document.getElementById("pop-up").classList.remove("oculto");
}

function cancelar(){
    document.getElementById("pop-up").classList.add("oculto");
}

async function eliminarLibro() {
    var idLibro = sessionStorage.getItem('idLibro');
    var nombrelibro = document.getElementById("titulo").innerHTML;

    var tmp = await obtenerDatoAsociacionLibro(nombrelibro, idLibro);
   
    if (tmp) {
        //mostrarle el msj que no lo puede eliminar
        alert("Hay datos asociados al libro no se puede eliminar :)");
    } else {
     //   var del = await deleteLibro(idLibro);
        if (del){

            alert("se elimino el libro :)");
            window.location.href = ("listar-libros-admin.html");
        }else{
            alert("Hubo un error :(");
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

