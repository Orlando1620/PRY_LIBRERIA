window.onload = function () {
    obtenerListLibrerias();
}

var datosAdminLib;

async function obtenerListLibrerias() {
    let librerias = await listar_librerias_Solicitudes();
    listar(librerias);
}

async function filtrarLib() {
    let input = document.getElementById("buscar").value;
    let librerias;
    if (input) {
        librerias = await obtener_librerias_Solicitudes(input);
    } else {
        librerias = await listar_librerias_Solicitudes();
    }
    listar(librerias);

}

async function listar(librerias) {
    var tbl = document.getElementById("lista-suc");
    deleteRow();
    var tblbdy = document.createElement('tbody');
    let data;
    var tbltd;
    var tbldata;
    var tblrw;
    var a;
    if (librerias.length > 0) {

        for (var i = 0; i < librerias.length; i++) {


            tblrw = document.createElement('tr');
            tblrw.setAttribute('id', librerias[i]._id);

            for (var j = 0; j <= 3; j++) {

                tbltd = document.createElement('td');
                switch (j) {
                    case 0:
                        var text = document.createTextNode(librerias[i].nombreComercial);
                        a = document.createElement("a");
                        a.appendChild(text);
                        a.href = "#";
                        a.id = librerias[i].nombreComercial;
                        a.addEventListener('click', perfil);

                        tbltd.appendChild(a);
                        tblrw.appendChild(tbltd);
                        break;

                    case 1:
                        var idAdmin = librerias[i].admin_id;
                        datosAdminLib = await obtenerDatosAdmin(idAdmin);
                        data = datosAdminLib.nombre;
                        tbldata = document.createTextNode(data);
                        tbltd.appendChild(tbldata);
                        tblrw.appendChild(tbltd);
                        break;

                    case 2:
                        datosAdminLib = await obtenerDatosAdmin(idAdmin);
                        data = datosAdminLib.correo;
                        tbldata = document.createTextNode(data);
                        tbltd.appendChild(tbldata);
                        tblrw.appendChild(tbltd);
                        break;

                    case 3:
                        let aceptar = document.createElement('a');
                        let aceparI = document.createElement("i");

                        aceptar.classList.add('far');
                        aceptar.classList.add('fa-check-circle');
                        aceptar.id = librerias[i].admin_id;;
                        aceptar.setAttribute('onclick', "aceptSolicitud(this)");
                        aceparI.appendChild(aceptar);


                        tbltd.appendChild(aceparI);
                        tblrw.appendChild(tbltd);
                        tbltd


                        let denegar = document.createElement('a');
                        let denegarI = document.createElement("i");

                        denegar.classList.add('fas');
                        denegar.classList.add('fa-trash-alt');
                        denegar.id = librerias[i].admin_id;;
                        denegar.setAttribute('onclick', "denegar(this)");
                        denegarI.appendChild(denegar);


                        tbltd.appendChild(denegarI);
                        tblrw.appendChild(tbltd);
                        /*        var aDel = document.createElement('a');
                                var del = document.createElement("i");
                                del.classList.add('fas');
                                del.classList.add('fa-trash-alt');
                                del.id = json[i]['libro'];
                                aDel.addEventListener('click', popDel);
                                aDel.appendChild(del);
                                saveDelTd.appendChild(aDel);
        
                                */

                        break;

                    default:
                        break;
                }

            }

            tblbdy.appendChild(tblrw);


        }
    } else {
        tblbdy.innerHTML = "<span style='float:right'>No se han encontrado datos</span>";
    }


    tbl.appendChild(tblbdy);
}


function deleteRow() {
    var row = document.getElementsByTagName('tbody')[0];
    if (row) {
        row.parentNode.removeChild(row);
    }

};


async function aceptSolicitud(e) {
    var id = e.id;
    let result = await actualizarSolicitud(id, 1);
    if (result) {
        obtenerListLibrerias();
    }
}

async function denegar(e) {
    var id = e.id;
    let result = await actualizarSolicitud(id, 2);

    if (result) {
        obtenerListLibrerias();
    }
}