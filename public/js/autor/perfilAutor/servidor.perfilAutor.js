'use strict';

async function obtener_autor(id) {


    let autor = null;

    let datos = {
        id: id
    }

    autor = await fetch('/autor/obtenerAutor', {
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

    return autor;
};

