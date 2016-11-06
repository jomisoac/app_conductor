(function () {
    'use strict';

    angular
        .module('conductor')
        .service("ConductorService", ConductorService);

    function ConductorService($http, api) {

        this.getAll = function (id) {
            var pet = {
                method: 'GET',
                url: api + '/empresas/' + id + '/conductores',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        }

        this.getById = function (id) {
            var pet = {
                method: 'GET',
                url: api + '/conductores/' + id,
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        }

        this.registrar = function (conductor) {
            var url = api + '/usuarios/conductores';
            return $http.post(url, conductor);
        }

        this.updateEstado = function (conductor) {
            var pet = {
                method: 'PUT',
                url: api + '/conductores/' + conductor.id + '/cambioEstado',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: conductor
            };
            return $http(pet);
        }

        this.updateRegId = function (conductor_id, reg_id) {
            var pet = {
                method: 'PUT',
                url: api + '/user/' + conductor_id + '/updateRegId',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: {
                    reg_id: reg_id
                }
            };
            return $http(pet);
        }

        this.updateContrasena = function (id, pass) {
            var pet = {
                method: 'PUT',
                url: api + '/user/' + id + '/updateContrasena',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: pass
            };
            return $http(pet);
        }

        this.getPrestaciones = function (id) {
            var pet = {
                method: 'GET',
                url: api + '/conductores/' + id + '/pagos_prestaciones',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                }
            };
            return $http(pet);
        }
    }

})();