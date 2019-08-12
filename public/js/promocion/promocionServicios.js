  function registrarPromocion(){
    var data = {
        libroPromo: document.getElementById("libroPromo").value,
        porcentaje: document.getElementById("porcentaje").value,
        fechaInicio: document.getElementById("fechaInicio").value,
        fechaFinaliza: document.getElementById("fechaFinaliza").value
    };

    fetch('/promocion/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    });
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
