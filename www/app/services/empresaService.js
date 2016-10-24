(function () {
    'use strict';

    angular
        .module('empresas', [])
        .service('EmpresaService', function ($http, api) {

            this.getAll = function () {
                return $http.get(api + '/empresas');
            }
        });

})();