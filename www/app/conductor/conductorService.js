(function () {
    'use strict';

    angular
        .module('conductor')
        .service("ConductorService", ConductorService);

    function ConductorService($http, $window) {
        var uri = $window.localStorage['uri'];

        this.getAll = function (id) {
            var pet = {
                method: 'GET',
                url: uri + '/empresas/' + id + '/conductores',
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                }
            };
            return $http(pet);
        }

        this.getById = function (id) {
            var pet = {
                method: 'GET',
                url: uri + '/conductores/' + id,
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                }
            };
            return $http(pet);
        }

        this.registrar = function (conductor) {
            var url = uri + '/usuarios/conductores';
            return $http.post(url, conductor);
        }

        this.update = function (conductor) {
            var pet = {
                method: 'PUT',
                url: uri + '/conductor/' + conductor.id,
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                },
                data: conductor
            };
            return $http(pet);
        }

        this.updateRegId = function (conductor_id, reg_id) {
            var pet = {
                method: 'PUT',
                url: uri + '/conductores/' + conductor_id + '/reg_id/' + reg_id,
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                }
            };
            return $http(pet);
        }

        this.updateContrasena = function (id, pass) {
            var pet = {
                method: 'POST',
                url: uri + '/usuarios/' + id + '/change_pass',
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                },
                data: pass
            };
            return $http(pet);
        }

        this.getPrestaciones = function (id) {
            var pet = {
                method: 'GET',
                url: uri + '/conductores/' + id + '/pagos_prestaciones',
                headers: {
                    'Authorization': 'Bearer ' + $window.localStorage['token']
                }
            };
            return $http(pet);
        }
    }

})();