(function(){
    'use strict';

    angular
    .module('localNotificaciton', [])
    .factory('localNotificaciton', factory);

    function factory($ionicPopup){
        return {
            'checkPermission': checkPermission,
            'showNotificationLocal' : showNotificationLocal 
        };

        function checkPermission(){
            cordova.plugins.notification.local.hasPermission(function (granted) {      
                if(granted === true){
                    // $ionicPopup.alert({
                    //     title: 'Felicidades !',
                    //     template: 'Ahora puedes recibir notificaciones de tu empresa.'
                    // });
                }else{
                    cordova.plugins.notification.local.registerPermission(function(granted) {
                        if(granted == true){
                            $ionicPopup.alert({
                                title: 'Felicidades !',
                                template: 'Ahora puedes recibir notificaciones de tu empresa.'
                            });
                        } else {
                            navigator.notification.alert("No podras recibir notificaciones desde tu empresa porque no tienes activadas las notificaciones.");
                        }
                    });
                }
            });
        }

        function showNotificationLocal(title, message){
            cordova.plugins.notification.local.schedule({
                title: title,
                message: message,
                icon: "http://api.viajaseguro.co/images/icono.png",
            });
        }
    }
})();