app.controller('UbicacionPasajeroCtrl', function($scope,$location,$rootScope) {
    
    var pasajeros = [];
        
    $scope.$on('$ionicView.enter',function(){
        var posicion = {};
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                var posicion = {
                    lat: lat,
                    lng: lng
                };
                initMap(posicion);
            });
        }
    });
     
    $scope.volver = function(){
        $location.path("app/home");
    }
    
    function initMap(pos) {
        //var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/user.png';
        
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: pos.lat, lng: pos.lng},
          scrollwheel: false,
          zoom: 13
        });
        
        var geocoder = new google.maps.Geocoder();

        var markerMiPosicion = new google.maps.Marker({
            position: {lat: pos.lat, lng: pos.lng},
            map: map,
            title: 'Mi Posición',
        });
        
        var infowindow = new google.maps.InfoWindow();
        
        markerMiPosicion.addListener('click', function() {
            infowindow.setContent(markerMiPosicion.title);
            infowindow.open(map, markerMiPosicion);
        }); 
        
        angular.forEach($rootScope.listaPasajeros, function(value, key) {
            geocoder.geocode({ 'address': value.direccion }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var posicion = ParseLocation(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        position: {lat: parseFloat(posicion.lat), lng: parseFloat(posicion.lng)},
                        map: map,
                        title: value.nombres
                    });
                    
                    marker.addListener('click', function() {
                        infowindow.setContent(marker.title);
                        infowindow.open(map, marker);
                    });
                }
                else
                    alert('error: ' + status);
            });
        });
        
        function ParseLocation(location) {
            var position = {
                lat: location.lat().toString().substr(0, 12),
                lng: location.lng().toString().substr(0, 12)
            }
            
            return position;
        }
    }
})
