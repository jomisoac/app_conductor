(function () {
    'use strict';

    angular
        .module('conductor')
        .service("IncidenciaService", IncidenciaService);

    function IncidenciaService($http, $window) {
        var uri = $window.localStorage['uri'];

        this.registrarAusencia = function (id, incidencia) {
            var pet = {
                method: 'POST',
                url: uri + '/conductores/' + id + '/incidencias',
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                },
                data: incidencia
            };
            return $http(pet);
        }
    }
})();