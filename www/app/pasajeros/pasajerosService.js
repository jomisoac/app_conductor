(function () {
    'use strict';

    angular
        .module('pasajeros')
        .service('PasajerosService', PasajerosService);

    function PasajerosService($http, api) {

        this.getAll = function (conductorId) {
            var pet = {
                method: 'GET',
                url: api + '/centrales/' + conductorId + '/pasajeros',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        }


        this.getById = function (id) {
            var pet = {
                method: 'GET',
                url: uri + '/pasajeros/' + id,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        };
    }

})();