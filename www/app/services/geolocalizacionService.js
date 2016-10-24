(function () {
    'use strict';

    angular
        .module('geolocalizacion', [])
        .service('GeolocalizacionService', function ($http, api) {

            this.guardar = function (posicion) {
                var pet = {
                    method: 'POST',
                    url: api + '/conductores/' + posicion.conductor_id + '/ubicacion',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    },
                    data: posicion
                };
                return $http(pet);
            }

            this.deletePosicion = function (id) {
                var pet = {
                    method: 'DELETE',
                    url: api + '/conductores/' + id + '/ubicacion',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                    }
                };
                return $http(pet);
            }
        });
})();