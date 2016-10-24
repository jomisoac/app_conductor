(function () {
    'use strict';

    angular
        .module('paquetes')
        .service('EncomiendaService', EncomiendaService);

    function EncomiendaService($http, $window) {
        var uri = $window.localStorage['uri'];

        this.getAll = function (conductorId) {
            var pet = {
                method: 'GET',
                url: uri + '/centrales/' + conductorId + '/paquetes',
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                }
            };
            return $http(pet);
        }
    }
})();