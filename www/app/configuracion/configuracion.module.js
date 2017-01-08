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
                templateUrl: 'app/layout/menu.html',
                controller: 'MenuCtrl as vm'
            })

            .state('app.configuracion', {
                url: '/configuracion',
                views: {
                    'menuContent': {
                        //controller: 'HomeCtrl',
                        templateUrl: 'app/configuracion/configuracion.html',
                    }
                }
            })

            .state('cambiar-contrasena', {
                url: '/cambiar-contrasena',
                templateUrl: 'app/configuracion/cambiar-contrasena.html',
                controller: 'ContrasenaCtrl'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    'menuContent': {
                        templateUrl: 'app/layout/principal.html',
                        controller: 'HomeCtrl as vm'
                    }
                }
            })
            .state('mis-datos', {
                url: '/datos',
                templateUrl: 'app/perfil/perfil.html',
                controller: 'PerfilCtrl as vm'
            })
    }
})();
