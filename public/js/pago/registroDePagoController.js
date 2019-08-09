function addPago(e){
    e.preventDefault();
    var ccNumber = document.getElementById('ccNumber').value;
	var ccCode = document.getElementById("ccCode").value;
	var expMonth = document.getElementById("ccExpDate").value;
	var expYear = document.getElementById("ccExpDate").value;
	var expMonthSub = expMonth.substring(0, 2);
	var expYearSub = expYear.substring(3, 5);
	var date = new Date();
	var currentMonth = date.getMonth();
	var currentYear = date.getFullYear() %100;
	
	
    if (ccNumber.length < 15 || ccNumber.length > 16) {
		document.getElementById("alert").classList.remove("oculto");
		//document.getElementById("ccNumber").classList.add("border-error");
		document.getElementById("msg").innerHTML = "El número de tarjeta debe de contener 15 o 16 dígitos.";
		return false;
	} 	
	
	if (expMonthSub < currentMonth && expYearSub < currentYear || expMonthSub > currentMonth && expYearSub < currentYear || expMonthSub > 12) {
		document.getElementById("alert").classList.remove("oculto");
		//document.getElementById("ccExpDate").classList.add("border-error");
		document.getElementById("msg").innerHTML = "Fecha de expiración inválida.";
		return false;
	}
	
	if (ccCode.length > 4 || ccCode.length < 3){
		document.getElementById("alert").classList.remove("oculto");
		//document.getElementById("ccCode").classList.add("border-error");
		document.getElementById("msg").innerHTML = "Código CVV inválido.";	
		return false;
	}
	registro();
}

async function registro(){
	console.log("registro");
  	var data = {
	nombreTarjeta: document.getElementById('ccName').value,
	numTarjeta: document.getElementById('ccNumber').value,
	fechaVenc: document.getElementById('ccExpDate').value,	
	codSeg: document.getElementById('ccCode').value,
	idUsuario: sessionStorage.getItem("id")
	};
	var response  = await fetch('/pago/add', {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'Content-Type': 'application/json'}
	})

	document.getElementById("alert").classList.add("oculto");
	registrarBitacora(sessionStorage.getItem("correo"),'registro metodo de pago: '+document.getElementById("ccNumber").value);
	window.location.href = "registrar-metPago.html";
	
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

async function checkMetPago(){
	var data = {
        id: sessionStorage.getItem("id")
    };
	var response = await fetch('/pago/checkMetPago', {
		method: 'POST',
		body: JSON.stringify(data),
		headers:{'Content-Type': 'application/json'}
	})

	var json = await response.json();
	if(json.length>0){
		document.getElementById("btn-registrar").classList.add("oculto");
		document.getElementById("btn-modificar").classList.remove("oculto");

		document.getElementById("ccName").value = json[0]['nombreTarjeta'];
		document.getElementById("ccNumber").value = json[0]['numTarjeta'];
		document.getElementById("ccExpDate").value = json[0]['fechaVenc'];
	}      
}

checkMetPago();