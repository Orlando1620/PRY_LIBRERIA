'use strict';
async function listarLibrerias() {

    let librerias = [];

    await fetch('/libreria/listar', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            if (response.status != 200)
                console.log('Error en el servicio: ' + response.status);
            else
                return response.json();
        })
        .then(function (response) {
            librerias = response;
        })
        .catch(err => console.log('Error:', err));

    return librerias;
};


async function obtener_libreria(pnombre) {

    let librerias = {};

    let datos = {
        nombreComercial: pnombre
    }

    librerias = await fetch('/libreria/obtener_libreria', {
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
    return librerias;
};