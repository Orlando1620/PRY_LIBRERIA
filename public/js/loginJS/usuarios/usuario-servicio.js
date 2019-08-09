'use strict';

async function iniciar_sesion(pcorreo, pcontrasenna) {

    let user = null;

    let datos = {
        correo: pcorreo,
        contrasena: pcontrasenna
    }

    await fetch('/usuario/iniciar_sesion', {
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
            //debugger;
            user = response;
            console.log(user);
        })
        .catch(err => console.log('Error:', err));
        console.log(user);
    return user;

};