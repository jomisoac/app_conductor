/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('configuracion', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
            })

            .state('app.configuracion', {
                url: '/configuracion',
                views: {
                    'menuContent': {
                        //controller: 'HomeCtrl',
                        templateUrl: 'templates/configuracion.html',
                    }
                }
            })

            .state('cambiar-contrasena', {
                url: '/cambiar-contrasena',
                templateUrl: 'templates/cambiar-contrasena.html',
                controller: 'ContrasenaCtrl'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/principal.html',
                        controller: 'HomeCtrl'
                    }
                }
            })
    }
})();
