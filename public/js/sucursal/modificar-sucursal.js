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