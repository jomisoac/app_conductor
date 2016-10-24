/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('paquetes', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('encomienda', {
                url: '/encomienda',
                templateUrl: 'app/paquetes/paquetes.html',
                controller: 'EncomiendaCtrl'
            })
    }
})();
