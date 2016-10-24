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
                templateUrl: 'app/auth/login.html',
                controller: 'LoginCtrl as vm'
            })
            .state('registrar', {
                url: '/registrar',
                templateUrl: 'app/auth/registrar-conductor.html',
                controller: 'ConductorCtrl as vm'
            })

    }
})();
