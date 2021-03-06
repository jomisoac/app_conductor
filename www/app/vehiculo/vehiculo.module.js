/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('vehiculo', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('imagen-vehiculo', {
                url: '/imagen-vehiculo',
                templateUrl: 'app/vehiculo/imagen-vehiculo.html',
                controller: 'ImagenCtrl'
            })
            .state('app.registrarVehiculo', {
                url: '/registrar-vehiculo',
                views: {
                    'menuContent': {
                        controller: 'VehiculoCtrl',
                        templateUrl: 'app/vehiculo/registrar-vehiculo.html'
                    }
                }
            })
            .state('app.documentosVehiculo', {
                url: '/documentos-vehiculo',
                views: {
                    'menuContent': {
                        controller: 'VehiculoCtrl',
                        templateUrl: 'app/vehiculo/documentacion-vehiculo.html'
                    }
                }
            })
    }
})();
