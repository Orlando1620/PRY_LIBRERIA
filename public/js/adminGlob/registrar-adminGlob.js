if(sessionStorage.getItem("tipo") != "adminGlobal"){
    window.location.href = "homePage.html"
}

async function addUsuario(e){
    var esValido = validarCamposFormulario("form");
    if (esValido == false) {
        document.getElementById("alert").classList.remove("oculto");
        document.getElementById("msg").innerHTML = "Complete los espacios requeridos";
        return false;
    } else {
        var correo = document.getElementById('correo').value;
        if(validarCorreo(correo)){
            var tel = document.getElementById('tel').value;
            if(validarTel(tel)){
                e.preventDefault();
                registrarUsuario(); 
            } else {
                e.preventDefault();
                document.getElementById("alert").classList.remove("oculto");
                document.getElementById("msg").innerHTML = "Formato del teléfono no es válido";
            }
        } else {
            e.preventDefault();
            document.getElementById("alert").classList.remove("oculto");
            document.getElementById("msg").innerHTML = "Formato del correo electrónico no es válido";
        }
    }
}

async function registrarUsuario(){
    
    var contrasena = contrasenaAleatoria();
    var data = {
        tipoUsuario: "adminGlobal",
        fechaRegistro: new Date(),
        nombre: document.getElementById("nombre").value,
        primerApellido: document.getElementById("primerApellido").value,
        segundoApellido: document.getElementById("segundoApellido").value,
        correo: document.getElementById("correo").value,
        contrasena: contrasena,
        tipoIdentificacion:document.getElementById("tipoIdentificacion").value,
        identificacion: document.getElementById("identificacion").value
    };
    
    var response = await fetch('/adminGlobal/registrar', {
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
            registrarBitacora(document.getElementById("correo").value,'registro administrador global: '+document.getElementById("nombre").value+
            " "+document.getElementById("primerApellido").value)+" "+document.getElementById("segundoApellido").value;
            window.location.href = "homePage.html";
            break;
    }
}

function validarCorreo(correo){
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(correo.match(format)){
        return true;
    } else {
        return false;
    }
} 

function validarTel(tel){
    var format = /^\d{8}$/;
    if(tel.match(format)){
        return true;
    } else {
        return false;
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