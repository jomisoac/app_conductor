(function () {
    'use strict';

    angular
        .module('configuracion')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($scope, $ionicPopup, $rootScope, $window, ConductorService, $location, $timeout, $ionicLoading, $ionicHistory, $ionicPlatform, $cordovaGeolocation, GeolocalizacionService, socketCh) {
        var vm = this;

        $scope.orientacionVertical = true;
        $scope.orientacionHorizontal;


        $ionicPlatform.ready(function () {
            cordova.plugins.backgroundMode.setDefaults({
                title: 'Viaja Seguro',
                text: 'Enviando su ubicación.'
            });
            // Enable background mode
            cordova.plugins.backgroundMode.enable();

            if (!cordova.plugins.backgroundMode.isActive()) {
                // setInterval(function () {
                //     var posOptions = {timeout: 10000, enableHighAccuracy: true};
                //     $cordovaGeolocation
                //         .getCurrentPosition(posOptions)
                //         .then(function (position) {
                //             var lat = position.coords.latitude
                //             var long = position.coords.longitude
                //
                //             var posicion = {
                //                 conductor_id: sessionStorage.getItem('idConductor'),
                //                 lat: lat,
                //                 lng: long,
                //                 ruta_id: sessionStorage.getItem('idRuta')
                //             };
                //             if (posicion.conductor_id) {
                //                 socketCh.emit("posConductor", posicion);
                //             }
                //
                //         }, function (err) {
                //             console.log(err);
                //         });
                // }, 3000);
            }
            // Called when background mode has been activated
            cordova.plugins.backgroundMode.onactivate = function () {
                // Set an interval of 3 seconds (3000 milliseconds)
                // setInterval(function () {
                //     var posOptions = {timeout: 10000, enableHighAccuracy: true};
                //     $cordovaGeolocation
                //         .getCurrentPosition(posOptions)
                //         .then(function (position) {
                //             var lat = position.coords.latitude
                //             var long = position.coords.longitude
                //
                //             var posicion = {
                //                 conductor_id: sessionStorage.getItem('idConductor'),
                //                 lat: lat,
                //                 lng: long,
                //                 ruta_id: sessionStorage.getItem('idRuta')
                //             };
                //             if (posicion.conductor_id) {
                //                 socketCh.emit("posConductor", posicion);
                //             }
                //
                //         }, function (err) {
                //             console.log(err);
                //         });
                // }, 3000);
            }


            window.addEventListener("orientationchange", function () {
                if (window.orientation == 0) {
                    $scope.orientacionVertical = true;
                    $scope.orientacionHorizontal = false;
                }
                else if (window.orientation == 90 || window.orientation == -90) {
                    $scope.orientacionHorizontal = true;
                    $scope.orientacionVertical = false;
                }
            }, false);
        });


        $scope.$on('$ionicView.enter', function () {

            if (window.orientation == 0) {
                $scope.orientacionVertical = true;
                $scope.orientacionHorizontal = false;
            }
            else if (window.orientation == 90 || window.orientation == -90) {
                $scope.orientacionHorizontal = true;
                $scope.orientacionVertical = false;
            }

            $ionicLoading.show();
            $rootScope.id = null;
            $rootScope.gremio = null;
            $scope.conductor = {};
            var user = JSON.parse(sessionStorage['usuario']);
            ConductorService.getById(user.conductor.id).then(
                function (respuesta) {
                    vm.conductor = respuesta.data.data;
                    sessionStorage.setItem('idUsuario', JSON.stringify(vm.conductor.user));
                    sessionStorage.setItem('idGremio', JSON.stringify(vm.conductor.empresa));
                    $rootScope.id = $scope.conductor.id;
                    sessionStorage.setItem('idConductor', JSON.stringify(vm.conductor.id));
                    $ionicLoading.hide();
                    // ConductorService.updateRegId(vm.conductor.id, sessionStorage['regid']);
                    // socketCh.connect();
                }
                , function (error) {
                    $ionicLoading.hide();
                }
            );
        });

        socketCh.on('connect', function () {
            alert('conectado a websocket')
        })

        $scope.logout = function () {
            $location.path("/login");
        }

        function mostarAlert(titulo, contenido) {
            var alertPopup = $ionicPopup.alert({
                title: titulo,
                template: contenido
            });
            alertPopup.then(function (res) {
                vm.conductor = {};
            });
        }
    }

})();