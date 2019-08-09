'use strict';

async function registrar_Adimin_Lib(pnombre, papellido1, papellido2, pcorreo, pfechaNaci, ptipoIdentificacion,
    pnumberIdentificacion, ptipoSexo, pnombreComercial, pnombreFantasia, pprovincia, pcanton,
    pdistrito, pdireccion, ptelefono, lat, lng, pcontrasena, pbloqueado) {

    let datos = {
        nombre: pnombre,
        apellido1: papellido1,
        apellido2: papellido2,
        correo: pcorreo,
        contrasena: pcontrasena,
        bloqueado: pbloqueado,
        fechaNaci: pfechaNaci,
        tipoIdentificacion: ptipoIdentificacion,
        numberIdentificacion: pnumberIdentificacion,
        tipoSexo: ptipoSexo,
        latitud: lat,
        longitud: lng,
        nombreComercial: pnombreComercial,
        nombreFantasia: pnombreFantasia,
        provincia: pprovincia,
        canton: pcanton,
        distrito: pdistrito,
        direccion: pdireccion,
        telefono: ptelefono
    }
    let msg = await fetch('/adminLib/registrar_Admin_Lib', {
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
    return msg;
};

