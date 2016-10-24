/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('conductor', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('imagen-conductor', {
                url: '/imagen-conductor',
                templateUrl: 'templates/imagen-conductor.html',
                controller: 'ImagenCtrl'
            })

            .state('app.reportarAusencia', {
                url: '/reportar-ausencia',
                views: {
                    'menuContent': {
                        controller: 'IncidenciaCtrl',
                        templateUrl: 'templates/reportar-ausencia.html',
                    }
                }
            })

    }
})();
