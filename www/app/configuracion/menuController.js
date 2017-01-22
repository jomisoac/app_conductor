(function () {
    'use strict';

    angular
        .module('configuracion')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl(LoginService, $scope, $ionicPopup, $rootScope, ConductorService, $ionicLoading, $ionicPlatform, $cordovaGeolocation, UbicacionesRepository, GeolocalizacionService, localNotificaciton, $ionicHistory) {
        var vm = this;

        $scope.orientacionVertical = true;
        $scope.orientacionHorizontal;
        $rootScope.MiGeolocation = {};

        var no_direction = false;

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;

        });

        $ionicPlatform.ready(function () {
            $ionicLoading.show();
            GeolocalizacionService.checkLocation().then(function (res) {
                if (res) {
                    no_direction = true;
                    $ionicLoading.hide();
                }
            })
            localNotificaciton.checkPermission();
            cordova.plugins.backgroundMode.enable();
            cordova.plugins.backgroundMode.configure({
                silent: true
            })
            var callbackFn = function (location) {
                var posicion = {
                    id: sessionStorage.getItem('idConductor'),
                    lat: location.latitude,
                    lng: location.longitude,
                    empresa: sessionStorage.getItem('idGremio'),
                    estado: $rootScope.estado,
                    estacion: sessionStorage.getItem('estacion'),
                    codigo_vial: sessionStorage.getItem('codigo_vial')
                };
                $rootScope.MiGeolocation = {
                    lat: location.latitude,
                    long: location.longitude
                }
                if (posicion.id) {
                    UbicacionesRepository.emit(posicion);
                }
                // console.log($rootScope.MiGeolocation)
                // backgroundGeolocation.finish();
            };

            var failureFn = function (error) {
                console.log(error)
                console.log('BackgroundGeolocation error');
            };

            backgroundGeolocation.configure(callbackFn, failureFn, {
                desiredAccuracy: 10,
                stationaryRadius: 20,
                distanceFilter: 30,
                // Android only section
                locationProvider: backgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
                interval: 6000,
                fastestInterval: 3000,
                activitiesInterval: 10000,
                notificationTitle: 'ViajaSeguro conductor',
                notificationText: 'Enviando su ubicacion',
                pauseLocationUpdates: true
            });

            // backgroundGeolocation.watchLocationMode(
            //     function (enabled) {
            //         if (enabled) {
            //             backgroundGeolocation.start(function (response) {
            //             });
            //             // location service are now enabled
            //             // call backgroundGeolocation.start
            //             // only if user already has expressed intent to start service
            //         } else {
            //             // location service are now disabled or we don't have permission
            //             // time to change UI to reflect that
            //         }
            //     },
            //     function (error) {
            //         console.log('Error watching location mode. Error:' + error);
            //     }
            // );

            backgroundGeolocation.isLocationEnabled(function (enabled) {
                if (enabled) {
                    backgroundGeolocation.start(
                        function (response) {
                            // service started successfully
                            // you should adjust your app UI for example change switch element to indicate
                            // that service is running
                        },
                        function (error) {
                            // Tracking has not started because of error
                            // you should adjust your app UI for example change switch element to indicate
                            // that service is not running
                            if (error.code === 2) {
                                // if (window.confirm('No ha habilitacion las opciones de ubicacion, desea abrir los ajustes?')) {
                                //     backgroundGeolocation.showAppSettings();
                                // }
                            } else {
                                window.alert('Error de inicio: ' + error.message);
                            }
                        }
                    );
                } else {
                    // Location services are disabled
                    // if (window.confirm('Location is disabled. Would you like to open location settings?')) {
                    //     backgroundGeolocation.showLocationSettings();
                    // }
                }
            });

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
            $ionicHistory.clearCache();
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
                    sessionStorage.setItem('idUsuario', vm.conductor.user);
                    sessionStorage.setItem('idGremio', vm.conductor.empresa);
                    sessionStorage.setItem('idConductor', vm.conductor.id);
                    sessionStorage.setItem('idVehiculo', vm.conductor.vehiculo);
                    sessionStorage.setItem('estado', vm.conductor.estado);
                    sessionStorage.setItem('estacion', vm.conductor.estacion);
                    sessionStorage.setItem('codigo_vial', vm.conductor.codigo_vial);
                    $rootScope.estado = vm.conductor.estado;
                    $rootScope.id = $scope.conductor.id;
                    $ionicLoading.hide();
                    ConductorService.updateRegId(sessionStorage.getItem('idUsuario'), localStorage.getItem('regid'));
                    UbicacionesRepository.connect();
                }
                , function (error) {
                    $ionicLoading.hide();
                }
            );
        });

        $scope.logout = function () {
            cordova.plugins.backgroundMode.disable();
            backgroundGeolocation.stop();
            LoginService.logout();
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