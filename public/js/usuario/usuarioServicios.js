
/**
 * Funcion para el registro de un usuario
 **/
var generoLength;
var arrayGeneros;
async function registrarUsuario(){
    
    var formData = new FormData(document.getElementById('form'));
    await fetch('/usuarioCliente/localUploadImg', {
    method: 'POST',
    body: formData,
    enctype: "multipart/form-data"
    })
  
    var generos=[];
    var j=0;
    for(var i=0 ;i<generoLength; i++){
        idGenero=document.getElementById("genero"+i).checked;
        if(idGenero){
            generos[j]=arrayGeneros[i]['nombre'];
            j++;
        }
    }
    var contrasena = contrasenaAleatoria();
    var data = {
        tipoUsuario: "usuarioCliente",
        fechaRegistro: new Date(),
        nombre: document.getElementById("nombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        correo: document.getElementById("correo").value,
        contrasena: contrasena,
        tipoIdentificacion:document.getElementById("tipoIdentificacion").value,
        identificacion: document.getElementById("identificacion").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        sexo: document.getElementById("sexo").value,
        provincia: document.getElementById("provincias").value,
        canton: document.getElementById("cantones").value,
        distrito: document.getElementById("distritos").value,
        direccionExacta: document.getElementById("dirExacta").value,
        latitud: lat,
        longitud: lng,
        generosFav: generos,
        libros: [],
        librosFav: [],
        path: 'public/uploads/' + document.getElementById('foto').files[0]['name']
    };
    
    var response = await fetch('/usuarioCliente/registrar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
    
    var result = await response.json();

    var msg = result['result'];

    switch(msg){
      case 'correoRepetido':
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "Un usuario con el mismo correo ya fue registrado";
            break;
      case 'idRepetido':
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "Un usuario con la misma identificacion ya fue registrado";
            break;
      case 'exito':
            enviarContrasena(contrasena);
            registrarBitacora(document.getElementById("correo").value,'registro usuario: '+document.getElementById("nombre").value+
            " "+document.getElementById("primerApellido").value+" "+document.getElementById("segundoApellido").value);
            document.getElementById("alert").classList.add("oculto");
            document.getElementById("alert-success").classList.remove("oculto");
            document.getElementById("msg-success").innerHTML = "Usuario registrado";
            setTimeout(function () {
                window.location.href = "login.html";
            }, 2000);
            
            break;
    }
}

function contrasenaAleatoria() {
  var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  var pass = "";
  for (var x = 0; x < 8; x++) {
      var i = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(i);
  }
  return pass;
}

function registrarBitacora(correo,accion){
    var data = {
        correo: correo,
        accion: accion,
        fecha: new Date()
    };
    fetch('/bitacora/add', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
    .then(
        function(response) {
        if (response.status != 200)
            console.log('Ocurrió un error con el servicio: ' + response.status);
        else
            return response.json();
        }
    )
    .catch(
        function(err) {
        console.log('Ocurrió un error con la ejecución', err);
        }
    );
}

function enviarContrasena(contrasena){
    var data = {
        contrasena: contrasena,
        correo: document.getElementById("correo").value
    };
    
    fetch('/usuarioCliente/enviarContrasena', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
}

async function recuperarContrasena(){
    var contrasena = contrasenaAleatoria();
    var data = {
        contrasena: contrasena,
        correo: document.getElementById("correo").value
    };
    
    var response = await fetch('/usuario/recuperarContrasena', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'}
    })
    
    var result = await response.json();

    var msg = result['result'];

    switch(msg){
      case 'exito':
            document.getElementById("alert").classList.add("oculto");
            document.getElementById("alert-success").classList.remove("oculto");
            document.getElementById("msg-success").innerHTML = "Se envió una nueva contraseña a tu correo electrónico.";
            setTimeout(function () {
                window.location.href = "login.html";
            }, 2000);
            break;
    }
}