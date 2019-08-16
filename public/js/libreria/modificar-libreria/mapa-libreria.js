var map;
// INICIALIZAR Y ANADIR EL MAPA
function initMap() {
  // LOCALIZACION
  var location = {lat: 	9.934739, lng: 	-84.087502};
  // MAPA
  map = new google.maps.Map(
      document.getElementById('map'), {zoom: 14, center: location});
}

function addMarker(coords){
  var marker = new google.maps.Marker({position: coords, map: map});
}

function centerMap(coords){
  map.setCenter(coords);
}
