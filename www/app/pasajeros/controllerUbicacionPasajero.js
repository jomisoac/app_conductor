(function () {
    'use strict';

//transmovil_valleduparcesar_338


    angular
        .module('pasajeros')
        .controller('UbicacionPasajeroCtrl', UbicacionPasajeroCtrl);

    function UbicacionPasajeroCtrl($scope, $location, $rootScope, $ionicLoading, $cordovaGeolocation, $ionicPopup) {

        var pasajeros = [];

        var infoPasajeroEncomienda = $rootScope.infoPasajeroEncomienda;;
        var nombre;
        var direccion;

        var markerConductor = "img/marker_car.png";
        var markerPasajero = "img/marker_pasajero.png";
        var direccionConductor;
        var myLatlng;
        $scope.opcion = "Prueba";
        $scope.titulo;

        $scope.$on('$ionicView.enter', function () {
            var posicion = {}; 
            if ($rootScope.bandera == "pasajero") {
                $scope.opcion = "Pasajero Recogido";
                direccion = infoPasajeroEncomienda.direccion;
                $scope.titulo = "Ubicación Pasajero";
            }
            console.log(infoPasajeroEncomienda);
            console.log($rootScope.MiGeolocation)
            


            if (navigator.geolocation) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando el mapa...'
                }); 
                // var posOptions = {
                //     enableHighAccuracy: true,
                //     timeout: 20000,
                //     maximumAge: 0
                // };

                var myLatlng = new google.maps.LatLng($rootScope.MiGeolocation.lat, $rootScope.MiGeolocation.long);

                var mapOptions = {
                    center: myLatlng,
                    zoom: 16,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false,
                };
                initMap(mapOptions);
                $ionicLoading.hide();

                // $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                    // var lat  = position.coords.latitude;
                    // var long = position.coords.longitude;
                    
                    // $scope.posicion = {
                    //     lat : lat,
                    //     lng : long,
                    //     myLatlng : myLatlng
                    // }
                    // var mapOptions = {
                    //     center: myLatlng,
                    //     zoom: 16,
                    //     mapTypeId: google.maps.MapTypeId.ROADMAP,
                    //     scrollwheel: false,
                    // };             
                    // initMap(mapOptions);
                    // $ionicLoading.hide();            
                // }, function(err) {
                    // $ionicLoading.hide();
                    // console.log(err);
                // });
            }
        });

        $scope.finalizarBusqueda = function () {
            $ionicLoading.show(); 
            if ($rootScope.bandera == "pasajero") {
                $rootScope.listaPasajeros[$rootScope.infoPasajeroEncomienda.indice].recogido = true;
                $ionicLoading.hide();
                $location.path("/pasajeros");
            } 
        }

        $scope.volver = function () {
            $location.path("app/home");
        }

        function initMap(mapOptions) {
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
            $scope.map = map;

            var geocoder = new google.maps.Geocoder();

            var markerMiPosicion = new google.maps.Marker({
                position: {lat: $rootScope.MiGeolocation.lat, lng: $rootScope.MiGeolocation.long},
                map: $scope.map,
                title: 'Mi Posición',
                icon: markerConductor
            });

            setInterval(function () {
                var myLatlng = new google.maps.LatLng($rootScope.MiGeolocation.lat, $rootScope.MiGeolocation.long);
                markerMiPosicion.setPosition(myLatlng);
                // var posOptions = {
                    // enableHighAccuracy: true,
                    // timeout: 20000,
                    // maximumAge: 0
                // };
                // $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                    // var lat  = position.coords.latitude;
                    // var long = position.coords.longitude;
                    // var myLatlng = new google.maps.LatLng(lat, long);
                    // markerMiPosicion.setPosition(myLatlng);             
                // }, function(err) {
                    // $ionicLoading.hide();
                    // console.log(err);
                // });
            }, 10000);

            var infowindow = new google.maps.InfoWindow();

            markerMiPosicion.addListener('click', function () {
                infowindow.setContent(markerMiPosicion.title);
                infowindow.open(map, markerMiPosicion);
            });
            geocodeLatLng(geocoder, $scope.map, markerMiPosicion.getPosition().lat(), markerMiPosicion.getPosition().lng());

            geocoder.geocode({'address': direccion}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var posicion = ParseLocation(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        position: {lat: parseFloat(posicion.lat), lng: parseFloat(posicion.lng)},
                        map: $scope.map,
                        title: infoPasajeroEncomienda.pasajeros[0].nombre + "<br>" + "Dirección: " + direccion,
                        icon: markerPasajero,
                        address: infoPasajeroEncomienda.direccion
                    });

                    marker.addListener('click', function () {
                        infowindow.setContent(marker.title);
                        infowindow.open(map, marker);
                        trazarRuta(direccionConductor, marker.address)
                    });
                }
                else {
                    $ionicPopup.alert({
                        title: 'Lo sentimos!',
                        template: 'No se pudo obtener la ubicacion de este pasajero, verifica con tu central.'
                    });
                    $ionicLoading.hide();
                }

            });

            //angular.forEach($rootScope.listaPasajeros, function(value, key) {
            //});

            function ParseLocation(location) {
                var position = {
                    lat: location.lat().toString().substr(0, 12),
                    lng: location.lng().toString().substr(0, 12)
                }

                return position;
            }

            function geocodeLatLng(geocoder, map, lat, lng) {
                var latlng = {lat: lat, lng: lng};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            direccionConductor = results[0].formatted_address;
                        } else {
                            window.alert('No results found');
                        }
                    } else {
                        window.alert('Geocoder failed due to: ' + status);
                    }
                });
            }

            function trazarRuta(origen, destino) {
                if (!origen || !destino) return;
                var directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: {strokeColor: "#d50002"}});
                directionsDisplay.setOptions({suppressMarkers: true});
                var directionsService = new google.maps.DirectionsService();
                var request = {
                    origin: origen,
                    destination: destino,
                    travelMode: google.maps.DirectionsTravelMode['DRIVING'],
                    unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
                    provideRouteAlternatives: false
                };

                directionsDisplay.setMap($scope.map);

                directionsService.route(request, function (response, status) {
                    console.log('response', response)
                    response.routes[0].copyrights = ''
                    $scope.datos = response[0].legs[0];
                    if (status == google.maps.DirectionsStatus.OK) {
                        var ruta=directionsDisplay.setDirections(response);
                        console.log(ruta)
                    } else {
                        alert("No existen rutas entre ambos puntos");
                    }
                });
            }
        }
    }
})();