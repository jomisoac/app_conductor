(function () {
    'use strict';

    angular
        .module('conductor')
        .service("IncidenciaService", IncidenciaService);

    function IncidenciaService($http, api) {

        this.registrarAusencia = function (id, incidencia) {
            var pet = {
                method: 'POST',
                url: api + '/conductores/' + id + '/incidencias',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: incidencia
            };
            return $http(pet);
        }
    }
})();