//Almacena el objeto de provincias al hacer el fetch
var provincias;
//Almacena el objeto de cantones al hacer el fetch
var cantones;

//Ejecuta la funciones respectivas cuando se cambia una opcion en el select
document.getElementById("provincias").addEventListener("change", llenarCantones);
document.getElementById("cantones").addEventListener("change", llenarDistritos);

//Busca el key en el objeto, del valor seleccionado en el select
//Ejemplo: el key de San Jose en el objeto de provincias es 1
function findKey(obj, value){
    var key = 1;
    for(i in obj){
        if(obj[i] == value){
            return key;
        } else {
            key++;
        }
    }
}

//Vacia el select antes de llenarlo con los nuevos valores
function removeOptions(id){
    var select = document.getElementById(id);
    var length = select.options.length;
    for(var i=0;i<length;i++){
        select.remove(0);
    }
}

//Llena el select de distritos con los valores respectivos
function llenarDistritos(){
    var provincia = document.getElementById('provincias').value;
    var keyCanton = findKey(provincias,provincia);

    var canton = document.getElementById('cantones').value;
    var keyDist = findKey(cantones,canton);
    //Fetch para popular el select de distritos
    fetch('https://ubicaciones.paginasweb.cr/provincia/'+keyCanton+'/canton/'+keyDist+'/distritos.json')
    .then(
    function(response) {
        if (response.status != 200)
        console.log('Ocurrió un error con el servicio: ' + response.status);
        else
        return response.json();
    }
    )
    .then(
        function(json){
            removeOptions('distritos');
            for(i in json){
                var opc = document.createElement("option");
                var textNode = document.createTextNode(json[i]);
                opc.appendChild(textNode);

                document.getElementById("distritos").appendChild(opc);
            }
        }
    )
    .catch(
    function(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
    );
}

//Llena el select de cantones con los valores respectivos
function llenarCantones(){
    var provincia = document.getElementById('provincias').value;
    var key = findKey(provincias,provincia);
    //Fetch para popular el select de cantones
    fetch('https://ubicaciones.paginasweb.cr/provincia/'+key+'/cantones.json')
    .then(
    function(response) {
        if (response.status != 200)
        console.log('Ocurrió un error con el servicio: ' + response.status);
        else
        return response.json();
    }
    )
    .then(
        function(json){
            removeOptions('cantones');
            for(i in json){
                var opc = document.createElement("option");
                var textNode = document.createTextNode(json[i]);
                opc.appendChild(textNode);

                document.getElementById("cantones").appendChild(opc);
            }
            cantones = json;
            llenarDistritos();
        }
    )
    .catch(
    function(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
    );
}

//Fetch para popular el select de provincias
fetch('https://ubicaciones.paginasweb.cr/provincias.json')
    .then(
    function(response) {
        if (response.status != 200)
        console.log('Ocurrió un error con el servicio: ' + response.status);
        else

        return response.json();
    }
    )
    .then(
        function(json){
            for(i in json){
                var opc = document.createElement("option");
                var textNode = document.createTextNode(json[i]);
                opc.appendChild(textNode);

                document.getElementById("provincias").appendChild(opc);
            }
            provincias = json;
            llenarCantones(json);
        }
    )
    .catch(
    function(err) {
        console.log('Ocurrió un error con la ejecución', err);
    }
    );
