/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('giros', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('giro', {
                url: '/giro',
                templateUrl: 'templates/giros.html',
                controller: 'GiroCtrl'
            })


    }
})();
