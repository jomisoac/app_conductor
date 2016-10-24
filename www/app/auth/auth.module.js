/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('auth', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('registrar', {
                url: '/registrar',
                templateUrl: 'templates/registrar-conductor.html',
                controller: 'ConductorCtrl'
            })

    }
})();
