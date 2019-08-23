async function registrarPromocion(e){
    

    e.preventDefault();
    var esValido = validarCamposFormulario("form");
    if (esValido == false || validarForm() == false) {
        validarForm(); 
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
        return false;
    } else {
        var fechaInicio = document.getElementById('fechaInicio').value;
        var fechaFinal = document.getElementById('fechaFinaliza').value;
        if(validarFecha()){
            if(fechaInicio < fechaFinal){
                document.getElementById("alert-fecha").classList.add("oculto");
                var formData = new FormData(document.getElementById('form'));
            
                await fetch('/promocion/localUploadImg', {
                method: 'POST',
                body: formData,
                enctype: "multipart/form-data"
                }) 

                var data = {
                    sucursal: document.getElementById("sucursales").value,
                    libro: document.getElementById("libroPromo").value,
                    porcentaje: document.getElementById("porcentaje").value,
                    fechaInicio: document.getElementById("fechaInicio").value,
                    fechaFinaliza: document.getElementById("fechaFinaliza").value,
                    path: 'public/uploads/' + document.getElementById('foto').files[0]['name']
                };
            
                var response = await fetch('/promocion/add', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers:{'Content-Type': 'application/json'}
                });

                var result = await response.json();

                msg = result['result'];
                console.log(msg);
                switch(msg){
                    case 'repetido':
                        document.getElementById("alert").classList.remove("oculto");
                        document.getElementById("msg").innerHTML = "Una promoción para este libro está activa en esta sucursal";
                        break;
                    case 'exito':
                        document.getElementById("alert").classList.add("oculto");
                        registrarBitacora(sessionStorage.getItem("correo"),'registro promoción: ');
                        document.getElementById("alert-success").classList.remove("oculto");
                        document.getElementById("msg-success").innerHTML = "Promoción registrada";
                        setTimeout(function () {
                            switch(sessionStorage.getItem("tipo")){
                                
                                case "AdminLib":
                                    window.location.href = "listar-promociones-adminLib.html";
                                    break;
                                case "adminGlobal":
                                    window.location.href = "listar-promociones-adminGlobal.html";
                                    break;
                            }
                            
                        }, 2000);
                        break;
                }
            } else{
                document.getElementById("alert-fecha").classList.remove("oculto");
                document.getElementById("msg-fecha").innerHTML = "La fecha de inicio debe ser previa a la fecha de finalización";
            }
        } else {
            document.getElementById("alert-fecha").classList.remove("oculto");
            document.getElementById("msg-fecha").innerHTML = "La fecha de inicio debe ser en el futuro";
        }
    }

    
    
}

function validarFecha(){
    var fecha = new Date(document.getElementById('fechaInicio').value);
    var hoy = new Date();
        if (hoy >= fecha) {
            return false;
        } else {
            return true;
        }
}
  

function validarForm(){
    var espaciosVacios = [];
    var sucursales = document.getElementById('sucursales').value;
    var libroPromo = document.getElementById('libroPromo').value;
    var porcentaje = document.getElementById('porcentaje').value;

    if(sucursales == "Seleccione una sucursal"){
        espaciosVacios.push('sucursales');
    } else {
        document.getElementById("sucursales").classList.remove('invalid');
    }
    if(libroPromo == "Seleccione un libro"){
        espaciosVacios.push('libroPromo');
    } else {
        document.getElementById("libroPromo").classList.remove('invalid');
    }
    if(porcentaje == 0){
        document.getElementById("alert-porcentaje").classList.remove("oculto");
        document.getElementById("msg-porcentaje").innerHTML = "El porcentaje de descuento debe ser mayor a 0";
    } else {
        document.getElementById("alert").classList.add("oculto");
    }
    if(espaciosVacios.length > 0){
        for(var i=0;i<espaciosVacios.length;i++){
            document.getElementById(espaciosVacios[i]).classList.add('invalid');
        }
        return false;
    } else {
        var elements = document.getElementsByClassName('form-control');
        for(var i=0;i<elements.length;i++){
            document.getElementById(elements[i].id).classList.remove('invalid');
        }
        return true;
    }

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
