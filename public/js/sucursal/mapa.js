//Almacena el mapa que se crea en la funcion initMap()
var map;
//Almacena el marcador agregado
var markers = [];
//Almacenan la latitud y longitud del marcador agregado
var lat = 0;
var lng = 0;

//document.getElementById("alert").classList.remove("oculto");
//document.getElementById("msg").innerHTML = "El código ISBN es inválido";
//e.preventDefault();
//return false;


function initMap(){
    //Configuracion del mapa
    var options = {
        zoom:10,
        center:{lat: 9.934739, lng: -84.087502}
    }

    //Creacion del mapa
    map = new google.maps.Map(document.getElementById('map'), options);

    //Escucha eventos de clicks en el mapa
    google.maps.event.addListener(map, 'click',function(event){
        addMarker(event.latLng);
    });

    initAutocomplete();
}

//Funcion para crear nuevos markers
function addMarker(location) {
    clearMarkers();
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
    lat = marker.getPosition().lat();
    lng = marker.getPosition().lng();
}

//Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

//Elimina todos los markers
function clearMarkers() {
    setMapOnAll(null);
    markers = [];
}

//Funcion para el uso del metodo de busqueda de google maps
function initAutocomplete() {

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
}


//Previene el submit cuando se presiona la tecla enter
document.getElementById("form").onkeypress = function(e) {
  var key = e.charCode || e.keyCode || 0;
  if (key == 13) {
    e.preventDefault();
  }
}
