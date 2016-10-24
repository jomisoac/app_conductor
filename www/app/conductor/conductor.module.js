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
                templateUrl: 'app/conductor/imagen-conductor.html',
                controller: 'ImagenCtrl as vm'
            })

            .state('app.reportarAusencia', {
                url: '/reportar-ausencia',
                views: {
                    'menuContent': {
                        controller: 'IncidenciaCtrl as vm',
                        templateUrl: 'app/conductor/reportar-ausencia.html',
                    }
                }
            })

    }
})();
