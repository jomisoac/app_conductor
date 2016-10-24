(function () {
    'use strict';

    angular
        .module('giros')
        .service('GirosService', GirosService);

    function GirosService($http, api) {

        this.getAll = function (conductorId) {
            var pet = {
                method: 'GET',
                url: api + '/centrales/' + conductorId + '/giros',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        }
    }
})();