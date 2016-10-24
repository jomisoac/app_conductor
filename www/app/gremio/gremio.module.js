/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('gremio', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('app.gremioConductores', {
                url: '/gremio-conductores',
                views: {
                    'menuContent': {
                        controller: 'GremioCtrl',
                        templateUrl: 'templates/gremio-conductores.html',
                    }
                }
            })
    }
})();
