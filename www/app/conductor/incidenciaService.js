(function () {
    'use strict';

    angular
        .module('conductor')
        .service("IncidenciaService", IncidenciaService);

    function IncidenciaService($http, api) {

        this.registrarIncidencia = function (id, incidencia) {
            var pet = {
                method: 'POST',
                url: api + '/conductores/' + id + '/reportar_incidencia',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: incidencia
            };
            return $http(pet);
        }
    }
})();