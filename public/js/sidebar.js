if(sessionStorage.getItem("tipo") == "adminGlobal"){
    document.getElementById("select-sidebar-lib").classList.add("oculto");
    document.getElementById("sidebar-lib").classList.add("oculto");

    document.getElementById("select-sidebar-global").classList.remove("oculto");
    document.getElementById("sidebar-global").classList.remove("oculto");
}