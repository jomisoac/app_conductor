app.controller('UbicacionPasajeroCtrl', function($scope,$location,uiGmapGoogleMapApi,$rootScope) {
    
    var pasajeros = [];
        
    $scope.$on('$ionicView.enter',function(){
        var posicion = {};
    
        if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    var posicion = {
                        conductor_id: $rootScope.placa,
                        latitud: lat,
                        longitud: lng
                    };

                    $scope.map = {center: {latitude: posicion.latitud, longitude: posicion.longitud }, zoom: 17, bounds: {}};

                    $scope.options = {scrollwheel: false};
                    var createRandomMarker = function (i, bounds, idKey) {
                        var lat_min = bounds.southwest.latitude,
                            lat_range = bounds.northeast.latitude - lat_min,
                            lng_min = bounds.southwest.longitude,
                            lng_range = bounds.northeast.longitude - lng_min;

                        if (idKey == null) {
                            idKey = "id";
                        }

                        /*var ret = {
                            latitude: posicion.latitud,
                            longitude: posicion.longitud,
                            title: 'm' + i,
                            show: false
                        };*/
                        var ret = {
                            latitude: posicion.latitud,
                            longitude: posicion.longitud,
                            title: 'm' + i,
                            show: false
                        };
                        ret[idKey] = i;
                        return ret;
                    };

                    $scope.onClick = function(marker, eventName, model) {
                        console.log("Clicked!");
                        model.show = !model.show;
                    };
                    $scope.randomMarkers = [];
                    // Get the bounds from the map once it's loaded
                    $scope.$watch(function() { return $scope.map.bounds; }, function(nv, ov) {
                        // Only need to regenerate once
                        if (!ov.southwest && nv.southwest) {
                            var markers = [];
                            for (var i = 0; i < 1; i++) {
                                markers.push(createRandomMarker(i, $scope.map.bounds))
                            }
                            $scope.randomMarkers = markers;
                        }
                    }, true);
                });
        }
    });
     
    $scope.volver = function(){
        $location.path("app/home");
    }
})
