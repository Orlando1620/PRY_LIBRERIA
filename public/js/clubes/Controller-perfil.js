window.onload = function () {
    cargarDatos();
}

var idUsuario = sessionStorage.getItem("id");

var club;
var book;
var suc;
var clubId;
var unirse;
var salir;
var verificar;

async function cargarDatos() {
    var nombre = localStorage.getItem('nombre');
    club = await obtenerClubesLectura(nombre);
    book = await obtenerLibroClubesLectura(club.libro);
    suc = await obtenerSucursalClubesLectura(club.sucursal);
    clubId = club._id;
    document.getElementById("nombre").innerHTML = club.nombre;
    document.getElementById("genero").innerHTML = club.genero;
    document.getElementById("tipo").innerHTML = club.tipo;
    document.getElementById("dia").innerHTML = club.dia;
    document.getElementById("libro").innerHTML = book.nombre;
    if (club.tipo == "Virtual"){
        document.getElementById('ContenedorSucursal').classList.add('oculto');
    }
    document.getElementById("sucursal").innerHTML = suc.nombreSucursal;
    document.getElementById("descripcion").innerHTML = club.descripcion;
    validarUsuarioClub();
}

async function unirse() {
    unirse = await registrarUsuarioClub(idUsuario, clubId);
    window.location.href= ("perfil-clubLectura.html");
}

async function salir() {
    salir = await deleteUsuario(idUsuario, clubId);
    window.location.href= ("perfil-clubLectura.html");
}

async function validarUsuarioClub() {
    verificar = await verificarUsuario(idUsuario, clubId);
    if (verificar) {
        document.getElementById('boton_salir').classList.remove('oculto');
    }else{
        document.getElementById('boton_unirse').classList.remove('oculto');
    }
}