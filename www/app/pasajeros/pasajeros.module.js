/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('pasajeros', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('pasajeros', {
                url: '/pasajeros',
                templateUrl: 'templates/pasajeros.html',
                controller: 'PasajerosCtrl'
            })
            .state('ubicacion-pasajeros', {
                url: '/ubicacion-pasajeros',
                templateUrl: 'templates/ubicacion-pasajeros.html',
                controller: 'UbicacionPasajeroCtrl'
            })

    }
})();

