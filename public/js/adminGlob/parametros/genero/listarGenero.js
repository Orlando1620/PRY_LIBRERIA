var generos = [];

function listarGenero() {

  fetch('/genero/listar', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(
      function (response) {
        if (response.status != 200)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else
          return response.json();
      }
    )
    .then(
      function (json) {
        console.log(json);
        for (var i = 0; i < json.length; i++) {
          generos.push(json[i]);
          var tr = document.createElement("tr");
          var td = document.createElement("td");
          var input = document.createElement("input");
          input.value = json[i]['nombre'];
          input.id = json[i]['_id'] + '_' + "nombre";
          input.classList.add('inputActualizar');
          input.readOnly = true;

          td.appendChild(input);
          tr.appendChild(td);

          var tdEliminar = document.createElement("td");
          var tdModificar = document.createElement("td");



          var a = document.createElement("a");
          var add = document.createElement("i");
          add.classList.add('fas');
          add.classList.add('fa-trash');
          add.id = json[i]['_id'] + "_" + "listGenero" + i;
          a.addEventListener('click', popDel);
          a.appendChild(add);
          tdEliminar.appendChild(a);
          tr.appendChild(tdEliminar);

          var a = document.createElement('a');
          var add = document.createElement("i");
          add.classList.add('fas');
          add.classList.add('fa-pencil-alt');
          add.id = json[i]['_id'];
          a.addEventListener('click', modificarGenero);
          a.appendChild(add);
          tdModificar.appendChild(a);
          tr.appendChild(tdModificar);

          document.getElementById("listGenero").appendChild(tr);
        }

      }
    )
    .catch(
      function (err) {
        console.log('Ocurrió un error con la ejecución', err);
      }

    );
}

listarGenero();

