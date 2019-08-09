var nombreOrig;
var idAutor;
var path;
async function cargarPerfil() {
    let autor = await obtener_autor(localStorage.getItem('idAutor'));
    idAutor = autor._id;
    document.getElementById("nombre").value = autor.nombre;
    document.getElementById("apellido1").value = autor.apellido1;
    document.getElementById("apellido2").value = autor.apellido2;
    nombreOrig = autor.nombre+autor.apellido1+autor.apellido2;
    path = autor.imgUrl;
    var nac_date = new Date(autor.nac);
    let formatted_nac = nac_date.getFullYear() + "-" + appendLeadingZeroes(nac_date.getMonth() + 1) + "-" + appendLeadingZeroes(nac_date.getDate());
    document.getElementById("nac").value = formatted_nac;
    document.getElementById("bio").value = autor.bio;
}

cargarPerfil();

function appendLeadingZeroes(n){
    if(n <= 9){
        return "0" + n;
    }
    return n
}
  