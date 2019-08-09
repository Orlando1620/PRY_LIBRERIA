var map;
var markers = [];
// INICIALIZAR Y ANADIR EL MAPA
function initMap() {
  // LOCALIZACION
  var location = { lat: 9.934739, lng: -84.087502 };
  // MAPA
  map = new google.maps.Map(
    document.getElementById('map'), { zoom: 8, center: location });
}

function addMarker(coords) {
  var marker = new google.maps.Marker({ position: coords, map: map });
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function addNameCustomMarker(coords, title) {
  var marker = new google.maps.Marker({
    position: coords,
    map: map,
    title: title
  });
  markers.push(marker);
}