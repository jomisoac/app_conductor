(function () {
    'use strict';

    angular
        .module('geolocalizacion', [])
        .service('GeolocalizacionService', function ($http, $window) {
            var uri = $window.localStorage['uri'];

            this.guardar = function (posicion) {
                var pet = {
                    method: 'POST',
                    url: uri + '/conductores/' + posicion.conductor_id + '/ubicacion',
                    headers: {
                        'Authorization': 'Bearer ' + $window.localStorage['token']
                    },
                    data: posicion
                };
                return $http(pet);
            }

            this.deletePosicion = function (id) {
                var pet = {
                    method: 'DELETE',
                    url: uri + '/conductores/' + id + '/ubicacion',
                    headers: {
                        'Authorization': 'Bearer ' + $window.localStorage['token']
                    }
                };
                return $http(pet);
            }
        });
})();