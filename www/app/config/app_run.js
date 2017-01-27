/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .run(appRun);

    function appRun($ionicPlatform, $rootScope,
                    $location, jwtHelper, $http, $ionicPopup, api, $cordovaSplashscreen) {
        setTimeout(function() {
            $cordovaSplashscreen.hide()
        }, 3000);
        $ionicPlatform.ready(function () {
            // Enable to debug issues.
            // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
            
            var notificationOpenedCallback = function(jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                console.log(jsonData);
            };

            window.plugins.OneSignal
                .startInit("82e0b3fe-0075-4603-826b-3e9a7a9eb8d6", "AIzaSyDTUQ3R3HShSm4L8UbtiUnTbFBWkXOW0HI")
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();
                
            // Sync hashed email if you have a login system or collect it.
            //   Will be used to reach the user at the most optimal time of day.
            // window.plugins.OneSignal.syncHashedEmail(userEmail);

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
                        // console.log("No ha expirado");
                    }
                }
            }, 100000);

            var push = PushNotification.init({ "android": {"senderID": "984044898845"},
                "ios": {}, "windows": {} } );

            push.on('registration', function(data) {
                localStorage.setItem('regid', data.registrationId);
                sessionStorage.setItem('regid', data.registrationId);
                $rootScope.reg_id = localStorage.getItem('regid');
            });

            push.on('notification', function(data) {
                console.log(data);
                if(data.additionalData.foreground){
                    if(data.additionalData.type == 'newPasajero')
                        mostarAlert(data.title, data.message, 'pasajeros')
                    if(data.additionalData.type == 'updateTurno')
                        mostarAlert(data.title, 'Se ha actualizado tu turno al '+data.additionalData.pos+', hacia '+data.additionalData.ruta)
                    if(data.additionalData.type == 'removeTurno')
                        mostarAlert(data.title, data.message)
                }
                if(data.additionalData.type == 'newPasajero'){

                }
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData
            });

            push.on('error', function(e) {
                // e.message
            });

            function mostarAlert(titulo, contenido, path) {
                var alertPopup = $ionicPopup.alert({
                    title: titulo,
                    template: contenido
                });
                alertPopup.then(function (res) {
                    if(path)
                        $location.path("/"+path);
                });
            }

            // $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
            //     switch (notification.event) {
            //         case 'registered':
            //             if (notification.regid.length > 0) {
            //                 localStorage.setItem('regid', notification.regid);
            //                 sessionStorage.setItem('regid', notification.regid);
            //                 $rootScope.reg_id = localStorage.getItem('regid')
            //             }
            //             break;

            //         case 'message':
            //             console.log(notification)
            //             if (notification.payload.tipo == "pasajeros") {
            //                 //alert(notification.payload.message);
            //                 $location.path("/pasajeros");
            //             } else if (notification.payload.tipo == "Desepacho") {
            //                 //alert(notification.payload.message);
            //             } else if (notification.payload.tipo == "Actualizacion turno") {
            //                 //alert(notification.payload.message);
            //                 sessionStorage.setItem('idRuta', notification.payload.datos);
            //             }

            //             break;

            //         case 'error':
            //             alert('GCM error = ' + notification.msg);
            //             break;

            //         default:
            //             alert('An unknown GCM event has occurred');
            //             break;
            //     }
            // });

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
