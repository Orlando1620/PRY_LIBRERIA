function validarCamposFormulario(FormularioId) {
    var inputs = document.getElementById(FormularioId).elements;
    var esValido = true; 
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].nodeName === "INPUT" && inputs[i].required && inputs[i].value.trim() === "") {
            inputs[i].classList.add("invalid");
            esValido = false;
            inputs[i].onchange = function () {
                if (this.value.trim() === "") {
                    this.classList.add("invalid");
                } else {
                    this.classList.remove("invalid");
                }

            }
        }
    }
    
    return esValido;
}