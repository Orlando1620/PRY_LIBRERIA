async function eliminar(){

    var dataInv = {
        nombreSuc:nombreSuc
    }
    var inv = await fetch('/inventario/eliminarTodo', {
        method: 'POST',
        body: JSON.stringify(dataInv),
        headers:{'Content-Type': 'application/json'}
    });

    var dataSuc = {
        id:idSuc
    }
    var suc = await fetch('/sucursal/eliminar', {
        method: 'POST',
        body: JSON.stringify(dataSuc),
        headers:{'Content-Type': 'application/json'}
    });

    window.location.href = "perfil-libreria.html";
}

function popDel(){
    document.getElementById("pop-up").classList.remove("oculto");
    document.getElementById("msg-pop").innerHTML = "¿Desea eliminar esta sucursal?";
}
  
function aceptar(){
    document.getElementById("pop-up").classList.add("oculto");
    eliminar();
}

function cancelar(){
    document.getElementById("pop-up").classList.add("oculto");
}