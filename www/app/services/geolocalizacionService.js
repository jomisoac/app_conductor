(function () {
    'use strict';

    angular
        .module('geolocalizacion', [])
        .service('GeolocalizacionService', function ($http, $q, $ionicPopup) {
            var service = {
                checkLocation: checkLocation,
            };

            return service;

            function checkLocation(){
                var defered = $q.defer();
                var promise = defered.promise;
                // defered.resolve(true); //TODO: quitar
                // return promise; //TODO: quitar
                cordova.plugins.diagnostic.isLocationEnabled(
                    function(enabled) {
                        if (enabled){
                            defered.resolve(true);
                        } else {
                            defered.resolve(false);
                            console.log('asd')
                            $ionicPopup.show({
                                title: 'Debe habilitar los servicios de ubicación',
                                buttons: [
                                    { text: 'Omitir' },
                                    {
                                        text: '<b>Ajustes</b>',
                                        type: 'button-positive',
                                        onTap: function(e) {
                                            cordova.plugins.diagnostic.switchToLocationSettings();
                                        }
                                    }
                                ]
                            }).then(function(res) {
                            });
                        }
                    },
                    function(e)     {
                        defered.reject(e)
                    }
                );
                return promise;
            }
        });
})();