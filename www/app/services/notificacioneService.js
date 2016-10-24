(function () {
    'use strict';

    angular
        .module('notificaciones', [])
        .service("NotificacionService", function ($http, $window) {
            var uri = $window.localStorage['uri'];

            this.EnviarNotificacionPasajero = function (identificacion) {
                var pet = {
                    method: 'POST',
                    url: uri + '/conductores/notificar/busqueda/cliente',
                    headers: {
                        'Authorization': 'Bearer ' + $window.localStorage['token']
                    },
                    data: {'identificacion': identificacion}
                };
                return $http(pet);
            }

            this.EnviarNotificacionGiro = function (data) {
                var pet = {
                    method: 'POST',
                    url: uri + '/conductores/notificar/busqueda/encomienda/cliente',
                    headers: {
                        'Authorization': 'Bearer ' + $window.localStorage['token']
                    },
                    data: data
                };
                return $http(pet);
            }

            this.FinalizarBusqueda = function (data) {
                var pet = {
                    method: 'POST',
                    url: uri + '/conductores/finalizar/busqueda/pgp',
                    headers: {
                        'Authorization': 'Bearer ' + $window.localStorage['token']
                    },
                    data: data
                };
                return $http(pet);
            }

        });
})();