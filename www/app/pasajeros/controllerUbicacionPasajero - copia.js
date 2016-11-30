(function () {
    'use strict';

//transmovil_valleduparcesar_338


    angular
        .module('pasajeros')
        .controller('UbicacionPasajeroCtrl', UbicacionPasajeroCtrl);

    function UbicacionPasajeroCtrl($scope, $window, $location, $rootScope, $ionicLoading, NotificacionService) {

        var pasajeros = [];

        var infoPasajeroEncomienda = $rootScope.infoPasajeroEncomienda;;
        var nombre;
        var direccion;

        var markerConductor = "img/marker_car.png";
        var markerPasajero = "img/marker_pasajero.png";
        var direccionConductor;

        $scope.opcion = "Prueba";
        $scope.titulo;

        $scope.$on('$ionicView.enter', function () {
            var posicion = {};
            // if ($rootScope.bandera == "encomienda") {
            //     direccion = infoPasajeroEncomienda.direccionD;
            //     $scope.opcion = "Encomienda Recogida";
            //     $scope.titulo = "Ubicación Encomienda";
            // } else 
            if ($rootScope.bandera == "pasajero") {
                $scope.opcion = "Pasajero Recogido";
                direccion = infoPasajeroEncomienda.direccion;
                $scope.titulo = "Ubicación Pasajero";
            }
            // } else if ($rootScope.bandera == "giro") {
            //     $scope.opcion = "Giro Recogido";
            //     direccion = infoPasajeroEncomienda.direccionD;
            //     $scope.titulo = "Ubicación Giro";
            // }

            console.log(infoPasajeroEncomienda);
            if (navigator.geolocation) {
                $ionicLoading.show();
                navigator.geolocation.getCurrentPosition(function (position) {
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

        $scope.finalizarBusqueda = function () {
            $ionicLoading.show({
                template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Cargando el mapa...'
            });
            // if ($rootScope.bandera == "encomienda") {
            //     var data = {
            //         id: infoPasajeroEncomienda.id,
            //         tipo: "paquete"
            //     };
            //     NotificacionService.FinalizarBusqueda(data).then(
            //         function (respuesta) {
            //             console.log(respuesta);
            //             $ionicLoading.hide();
            //             alert("La encomienda se encuentra en el vehiculo");
            //         }, function (error) {
            //             console.log(error);
            //             $ionicLoading.hide();
            //         }
            //     );
            // } else 
            if ($rootScope.bandera == "pasajero") {
                $rootScope.listaPasajeros[$rootScope.infoPasajeroEncomienda.indice].recogido = true;
                $ionicLoading.hide();
                $location.path("/pasajeros");
            } 
            // else if ($rootScope.bandera == "giro") {
            //     var data = {
            //         id: infoPasajeroEncomienda.id,
            //         tipo: "giro"
            //     };
            //     NotificacionService.FinalizarBusqueda(data).then(
            //         function (respuesta) {
            //             console.log(respuesta);
            //             $ionicLoading.hide();
            //             alert("El giro se encuentra en el vehiculo");
            //         }, function (error) {
            //             console.log(error);
            //         }
            //     );
            // }
        }

        $scope.volver = function () {
            $location.path("app/home");
        }

        function initMap(pos) {
            $ionicLoading.hide();
            const map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: pos.lat, lng: pos.lng},
                scrollwheel: false,
                zoom: 11
            });

            var geocoder = new google.maps.Geocoder();

            var markerMiPosicion = new google.maps.Marker({
                position: {lat: pos.lat, lng: pos.lng},
                map: map,
                title: 'Mi Posición',
                icon: markerConductor
            });

            setInterval(function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;

                    var latlng = new google.maps.LatLng(lat, lng);
                    markerMiPosicion.setPosition(latlng);
                });
            }, 10000);

            var infowindow = new google.maps.InfoWindow();

            markerMiPosicion.addListener('click', function () {
                infowindow.setContent(markerMiPosicion.title);
                infowindow.open(map, markerMiPosicion);
            });
            geocodeLatLng(geocoder, map, markerMiPosicion.getPosition().lat(), markerMiPosicion.getPosition().lng());

            geocoder.geocode({'address': direccion}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var posicion = ParseLocation(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        position: {lat: parseFloat(posicion.lat), lng: parseFloat(posicion.lng)},
                        map: map,
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
                    alert('error: ' + status);
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
                    provideRouteAlternatives: true
                };

                directionsDisplay.setMap(map);

                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        directionsDisplay.setDirections(response);
                    } else {
                        alert("No existen rutas entre ambos puntos");
                    }
                });
            }
        }
    }
})();