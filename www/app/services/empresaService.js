(function () {
    'use strict';

    angular
        .module('empresas', [])
        .service('EmpresaService', function ($http, $window) {
            var uri = $window.localStorage['uri'];

            this.getAll = function () {
                return $http.get(uri + '/empresas');
            }
        });

})();