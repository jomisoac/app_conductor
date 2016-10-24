(function () {
    'use strict';

    angular
        .module('notificaciones', [])
        .service("NotificacionService", function ($http, api) {

            this.EnviarNotificacionPasajero = function (identificacion) {
                var pet = {
                    method: 'POST',
                    url: api + '/conductores/notificar/busqueda/cliente',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    },
                    data: {'identificacion': identificacion}
                };
                return $http(pet);
            }

            this.EnviarNotificacionGiro = function (data) {
                var pet = {
                    method: 'POST',
                    url: api + '/conductores/notificar/busqueda/encomienda/cliente',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    },
                    data: data
                };
                return $http(pet);
            }

            this.FinalizarBusqueda = function (data) {
                var pet = {
                    method: 'POST',
                    url: api + '/conductores/finalizar/busqueda/pgp',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    },
                    data: data
                };
                return $http(pet);
            }

        });
})();