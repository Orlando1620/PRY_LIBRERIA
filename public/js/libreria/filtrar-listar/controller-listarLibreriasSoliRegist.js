window.onload = function () {
    obtenerListLibrerias();
}

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

            for (var j = 0; j <= 2; j++) {

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
                        data = librerias[i].admin_id;
                        tbldata = document.createTextNode(data);
                        tbltd.appendChild(tbldata);
                        tblrw.appendChild(tbltd);
                        break;

                    case 2:
                        data = librerias[i].correo;
                        tbldata = document.createTextNode(data);
                        tbltd.appendChild(tbldata);
                        tblrw.appendChild(tbltd);
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
