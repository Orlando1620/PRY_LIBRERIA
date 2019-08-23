//document.getElementById("nav-promo").classList.add('oculto');
if(sessionStorage.getItem("nombre") == null){
    document.getElementById("dropdown").classList.add("oculto");
    if(document.getElementById("nav-cart") != null){
        document.getElementById("nav-cart").classList.add("oculto");
    }
    document.getElementById("nav-login").classList.remove("oculto");

    document.getElementById("nav-login").href = "login.html";
    document.getElementById("c-r").href = "registrarUC.html";
    document.getElementById("home").href = "landing-prod.html";

} else {
    document.getElementById("dropdown").classList.remove("oculto");
    document.getElementById("login").classList.add("oculto");
    document.getElementById("usrName").innerHTML = sessionStorage.getItem("nombre");
    document.getElementById("c-r").addEventListener('click', cerrarSesion);
    document.getElementById("home").href = "homePage.html";
    

    switch(sessionStorage.getItem("tipo")){
        case "usuarioCliente":
            document.getElementById("perfil").href = "perfil-uc.html";
            document.getElementById("nav-cart").href = "carrito.html";
            break;
        case "AdminLib":
            document.getElementById("perfil").href = "perfil-adminLib.html";
            document.getElementById("admin").classList.remove("oculto");
            document.getElementById("admin").href = "perfil-lib-admin.html";
            document.getElementById("home").href = "perfil-lib-admin.html";
            var navElements = document.getElementsByClassName("wrapper-nav2");
            navElements[0].classList.add("oculto");
            if(document.getElementById("nav-cart") != null){
                document.getElementById("nav-cart").classList.add("oculto");
            }
            break;
        case "adminGlobal":
            document.getElementById("perfil").href = "perfil-adminGlobal.html";
            document.getElementById("admin").classList.remove("oculto");
            document.getElementById("admin").href = "listar-usuarios.html";
            document.getElementById("home").href =  "listar-usuarios.html";
            var navElements = document.getElementsByClassName("wrapper-nav2");
            navElements[0].classList.add("oculto");
            if(document.getElementById("nav-cart") != null){
                document.getElementById("nav-cart").classList.add("oculto");
            }
            break;
    }
}

document.getElementById("nav-libros").href = "listar-libros.html";
document.getElementById("nav-autores").href = "listar-autores.html";
document.getElementById("nav-librerias").href = "listar-librerias.html";
document.getElementById("nav-club").href = "listar-clubes.html";



document.getElementById("select-nav").addEventListener('change', opcionesNav);

function opcionesNav(){
    var opc = document.getElementById("select-nav").value;
    console.log(opc);
    switch(opc){
        case "1":
            window.location.href = "listar-libros.html";
            break;
        case "2":
            window.location.href = "listar-autores.html";
            break;
        case "3":
            window.location.href = "listar-librerias.html";
            break;
        case "4":
            window.location.href = "listar-clubes.html";
            break;

    }
}


function cerrarSesion(){
    sessionStorage.clear();
    window.location.href = "login.html";
}