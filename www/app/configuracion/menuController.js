(function () {
    'use strict';

    angular
        .module('configuracion')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl(LoginService, $scope, $ionicPopup, $rootScope, ConductorService,  $ionicLoading, $ionicPlatform, $cordovaGeolocation, UbicacionesRepository, GeolocalizacionService, localNotificaciton, $ionicHistory) {
        var vm = this;

        $scope.orientacionVertical = true;
        $scope.orientacionHorizontal;
        $rootScope.MiGeolocation= {};

        var no_direction = false;

        $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
            viewData.enableBack = true;

        });

        $ionicPlatform.ready(function () {
            $ionicLoading.show();
            GeolocalizacionService.checkLocation().then(function (res) {
                if(res){
                    no_direction = true;
                    $ionicLoading.hide();
                }
            })
            localNotificaciton.checkPermission();

            var bgGeo = window.BackgroundGeolocation;

            var callbackFn = function(location, taskId) {
                console.log('[js] BackgroundGeolocation callback:  ' + location.latitude + ',' + location.longitude);

                // backgroundGeolocation.finish();
            };

            var failureFn = function(error) {
                console.log(error)
                console.log('BackgroundGeolocation error');
            };

            bgGeo.configure({
                locationAuthorizationAlert: {
                    titleWhenNotEnabled: "El servicio de localizacion no esta habilitado",
                    titleWhenOff: "Localizacion apagada",
                    instructions: "Debes tener los servicios de localizacion encendidos/",
                    cancelButton: "Cancelar",
                    settingsButton: "Ajustes"
                },
                // Geolocation config
                desiredAccuracy: 0,
                stationaryRadius: 50,
                distanceFilter: 50,

                // Activity recognition config
                activityRecognitionInterval: 10000,
                stopTimeout: 5,  // Stop-detection timeout minutes (wait x minutes to turn off tracking)

                // Application config
                debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
                logLevel: 5,    // Verbose logging.  0: NONE
                stopOnTerminate: false,              // <-- Don't stop tracking when user closes app.
                startOnBoot: true,                   // <-- [Android] Auto start background-service in headless mode when device is powered-up.
                notificationTitle : 'ViajaSeguro',
                notificationText : 'Enviando su ubicación',
                notificationIcon: 'mipmap-hdpi/icon.png'
            }, function(state) {
                // Plugin is configured and ready to use.
                if (!state.enabled) {
                    bgGeo.start();  // <-- start-tracking
                }
            });

            // backgroundGeolocation.configure(callbackFn, failureFn, {
            //     desiredAccuracy: 10,
            //     stationaryRadius: 20,
            //     distanceFilter: 30,
            //     // Android only section
            //     locationProvider: backgroundGeolocation.provider.ANDROID_ACTIVITY_PROVIDER,
            //     interval: 60000,
            //     fastestInterval: 5000,
            //     activitiesInterval: 10000,
            //     startForeground: true,
            //     stopOnStillActivity: true,
            //     saveBatteryOnBackground: true,
            //     activityType: 'AutomotiveNavigation',
            //     notificationTitle: 'Enviando su ubicacion',
            //     notificationText: 'Habilitada'
            // });
            //
            // backgroundGeolocation.start();

            // Enable background mode
            // cordova.plugins.backgroundMode.enable();

            // cordova.plugins.backgroundMode.setDefaults({
            //     title: 'Viaja Seguro',
            //     text: 'Enviando su ubicación.'
            // });

            // if (!cordova.plugins.backgroundMode.isActive()) {
            //     setInterval(function () {
            //         var posOptions = {timeout: 10000, enableHighAccuracy: true};
            //         $cordovaGeolocation
            //             .getCurrentPosition(posOptions)
            //             .then(function (position) {
            //                 var lat = position.coords.latitude
            //                 var long = position.coords.longitude
            //
            //                 var posicion = {
            //                     id: sessionStorage.getItem('idConductor'),
            //                     lat: lat,
            //                     lng: long,
            //                     empresa: sessionStorage.getItem('idGremio'),
            //                     estado: $rootScope.estado,
            //                     estacion: sessionStorage.getItem('estacion'),
            //                     codigo_vial: sessionStorage.getItem('codigo_vial')
            //                 };
            //                 $rootScope.MiGeolocation ={
            //                     lat : lat,
            //                     long : long
            //                 }
            //                 if (posicion.id) {
            //                     UbicacionesRepository.emit(posicion);
            //                 }
            //                 console.log($rootScope.MiGeolocation)
            //             }, function (err) {
            //                 // console.log(err);
            //             });
            //     }, 3000);
            // }
            // Called when background mode has been activated
            // cordova.plugins.backgroundMode.onactivate = function () {
            //     // Set an interval of 3 seconds (3000 milliseconds)
            //     setInterval(function () {
            //         var posOptions = {timeout: 10000, enableHighAccuracy: true};
            //         $cordovaGeolocation
            //             .getCurrentPosition(posOptions)
            //             .then(function (position) {
            //                 var lat = position.coords.latitude
            //                 var long = position.coords.longitude
            //
            //                 var posicion = {
            //                     id: sessionStorage.getItem('idConductor'),
            //                     lat: lat,
            //                     lng: long,
            //                     empresa: sessionStorage.getItem('idGremio'),
            //                     estado: $rootScope.estado,
            //                     estacion: sessionStorage.getItem('estacion'),
            //                     codigo_vial: sessionStorage.getItem('codigo_vial')
            //                 };
            //                 $rootScope.MiGeolocation ={
            //                     lat : lat,
            //                     long : long
            //                 }
            //                 console.log($rootScope.MiGeolocation)
            //                 if (posicion.id) {
            //                     UbicacionesRepository.emit(posicion);
            //                 }
            //
            //             }, function (err) {
            //                 // console.log(err);
            //             });
            //     }, 3000);
            // }


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
            // cordova.plugins.backgroundMode.disable();
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