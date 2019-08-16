async function eliminar(){

    var dataInv = {
        sucursal:idSuc
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
    registrarBitacora(sessionStorage.getItem("correo"),'eliminación de sucursal: '+nombreSuc);

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