/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .run(appRun);

    function appRun($ionicPlatform, $cordovaPush, $rootScope,
                    $location, jwtHelper, $http, $cordovaGeolocation, api) {
        $ionicPlatform.ready(function () {

            window.addEventListener("orientationchange", function () {
                if (window.orientation == 0) {
                    $rootScope.orientacionVertical = true;
                    $rootScope.orientacionHorizontal = false;
                }
                else if (window.orientation == 90 || window.orientation == -90) {
                    $rootScope.orientacionHorizontal = true;
                    $rootScope.orientacionVertical = false;
                } else {
                    $rootScope.orientacionVertical = true;
                    $rootScope.orientacionHorizontal = false;
                }
            }, false);


            // var posOptions = {timeout: 2000, enableHighAccuracy: false};
            // $cordovaGeolocation
            //     .getCurrentPosition(posOptions)
            //     .then(
            //         function (position) {
            //             var lat = position.coords.latitude
            //             var long = position.coords.longitude
            //         }, function (err) {
            //             alert("Por favor encender GPS del equipo");
            //         }
            //     );

            setInterval(function () {
                var jwt = sessionStorage.getItem('jwt');
                if (jwt) {
                    if (jwtHelper.isTokenExpired(jwt)) {
                        console.log("Expiro");
                        $http({
                            url: api + '/user/authentication/refresh',
                            skipAuthorization: true,
                            method: 'GET',
                            headers: {Authorization: 'Bearer ' + jwt}
                        }).then(
                            function (response) {
                                sessionStorage.setItem('jwt', response.data.data.token);
                            },
                            function (response) {
                            }
                        );
                    } else {
                        console.log("No ha expirado");
                    }
                }
            }, 10000);

            var config = null;

            if (ionic.Platform.isAndroid()) {
                config = {
                    'badge': 'true',
                    'sound': 'true',
                    'alert': 'true',
                    'ecb': 'onNotification',
                    'icon': 'img/logo.png',
                    'senderID': '984044898845'
                };
            } else if (ionic.Platform.isIOS()) {
                config = {
                    'badge': 'true',
                    'sound': 'true',
                    'alert': 'true',
                    'ecb': 'onNotification',
                    'icon': 'img/logo.png',
                    'senderID': '984044898845'
                };
            }
            window.onNotification = function(r){
                console.log('onNotification', r)
            }

            $cordovaPush.register(config).then(function (result) {
                if (ionic.Platform.isIOS()) {
                }

            }, function (err) {
                //alert("Register error " + err)
            });

            $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
                switch (notification.event) {
                    case 'registered':
                        if (notification.regid.length > 0) {
                            localStorage.setItem('regid', notification.regid);
                            sessionStorage.setItem('regid', notification.regid);
                            $rootScope.reg_id = localStorage.getItem('regid')
                        }
                        break;

                    case 'message':
                        console.log(notification)
                        if (notification.payload.tipo == "pasajeros") {
                            //alert(notification.payload.message);
                            $location.path("/pasajeros");
                        } else if (notification.payload.tipo == "Desepacho") {
                            //alert(notification.payload.message);
                        } else if (notification.payload.tipo == "Actualizacion turno") {
                            //alert(notification.payload.message);
                            sessionStorage.setItem('idRuta', notification.payload.datos);
                        }

                        break;

                    case 'error':
                        alert('GCM error = ' + notification.msg);
                        break;

                    default:
                        alert('An unknown GCM event has occurred');
                        break;
                }
            });

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

    }
})();
