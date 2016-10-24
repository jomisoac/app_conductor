(function () {
    'use strict';

    angular
        .module('paquetes')
        .service('EncomiendaService', EncomiendaService);

    function EncomiendaService($http, api) {

        this.getAll = function (conductorId) {
            var pet = {
                method: 'GET',
                url: api + '/centrales/' + conductorId + '/paquetes',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        }
    }
})();