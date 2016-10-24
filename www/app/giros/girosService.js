(function () {
    'use strict';

    angular
        .module('giros')
        .service('GirosService', GirosService);

    function GirosService($http, $window) {

        var uri = $window.localStorage['uri'];

        this.getAll = function (conductorId) {
            var pet = {
                method: 'GET',
                url: uri + '/centrales/' + conductorId + '/giros',
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                }
            };
            return $http(pet);
        }
    }
})();