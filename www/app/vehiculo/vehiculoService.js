(function () {
    'use strict';

    angular
        .module('vehiculo')
        .service('VehiculoService', VehiculoService);

    function VehiculoService($http, api) {

        this.getById = function (id) {
            var pet = {
                method: 'GET',
                url: api + '/conductores/' + id + '/vehiculo',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        }

        this.actualizarDocumentacion = function (doc) {
            var pet = {
                method: 'PUT',
                url: api + '/vehiculos/' + doc.vehiculo_id,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: doc
            };
            return $http(pet);
        }

        this.actualizar = function (vehiculo) {
            var pet = {
                method: 'PUT',
                url: api + '/vehiculos/' + vehiculo.id,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: vehiculo
            };
            return $http(pet);
        }

        this.registrar = function (vehiculo) {
            id = sessionStorage.getItem('idConductor');
            var pet = {
                method: 'POST',
                url: uri + '/conductores/' + id + '/vehiculo',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: vehiculo
            };
            return $http(pet);
        }
    }

})();