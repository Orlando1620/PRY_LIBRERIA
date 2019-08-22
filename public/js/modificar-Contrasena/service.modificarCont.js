async function obtenerDatos (id) {

    let dato = {
        id: id
    }

    let msg = await fetch('/usuario/obtenerDatos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dato)
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
}

async function guardarContra(id, contrasena, changePassword) {
    
    let dato = {
        id: id,
        contrasena: contrasena,
        changePassword: changePassword
    }

    return await fetch('/usuario/guardarContra', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dato)
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