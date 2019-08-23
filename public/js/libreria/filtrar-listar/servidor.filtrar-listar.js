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

async function filtrarLibreria(datos) {

    let librerias = {};

    librerias = await fetch('/libreria/filtrarLibreria', {
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

async function listar_librerias_Solicitudes(pnombre) {

    let librerias = {};

    let datos = {
        nombreComercial: pnombre
    }

    librerias = await fetch('/libreria/listarSolicitudes', {
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


async function actualizarLibreria(libreria) {

    return await fetch('/libreria/modificar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(libreria)
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
};

async function actualizarSolicitud(id, estado) {

    let datos = {
        id: id,
        estado: estado
    }

    let msg = await fetch('/libreria/actualizarSolicitud', {
        method: 'PUT',
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

async function obtenerDatosAdmin(id) {

    let librerias = {};

    let datos = {
        id: id
    }

    librerias = await fetch('/usuario/obtenerDatosAdmin', {
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