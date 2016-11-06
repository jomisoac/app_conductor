(function () {
    'use strict';

    angular
        .module('auth')
        .service('LoginService', authService);

    /* @ngInject */
    function authService($http, api, jwtHelper, $state, $window, $q, $ionicHistory, $ionicLoading) {
        var local = {
            setCredenciales: setCredenciales,
            getCredenciales: getCredenciales,
            destroyCredenciales: destroyCredenciales
        };

        var service = {
            login: login,
            logout: logout,
            autologin: autologin,
            updateRegId: updateRegId,
            storeUser: storeUser,
            currentUser: currentUser,
            local: local
        };
        return service;

        function login(usuario, matenerSesion) {
            matenerSesion || (matenerSesion = false);
            var defered = $q.defer();
            var promise = defered.promise;
            $http.post(api + '/user/authentication', usuario).then(success, error);
            return promise;

            function success(p) {
                if (matenerSesion == true) {
                    setCredenciales(usuario);
                }
                storeUser(p.data.data.token, p.data.data.user);
                // pushService.register();
                defered.resolve(currentUser());
            }

            function error(error) {
                destroyCredenciales();
                defered.reject(error)
            }
        };

        function autologin() {
            var defered = $q.defer();
            var promise = defered.promise;
            var usuario = getCredenciales();
            if (usuario) {
                login(usuario).then(function (u) {
                    defered.resolve(u);
                });
            } else {
                defered.resolve(false);
            }
            return promise;
        }

        function updateRegId(regid) {
            var usuario_id = JSON.parse(sessionStorage.getItem('usuario')).id;
            sessionStorage.setItem('regid', regid);
            var pet = {
                method: 'PUT',
                url: api + '/user/' + usuario_id + '/updateRegId',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
                },
                data: {
                    reg_id: regid
                }
            };
            return $http(pet);
        };

        function logout() {
            $ionicLoading.show();
            updateRegId().then(function (res) {
                sessionStorage.clear();
                $ionicHistory.clearHistory();
                $window.localStorage.removeItem('credenciales');
                $ionicLoading.hide();
                $state.go('login');
            });
        };

        function storeUser(jwt, user) {
            sessionStorage.setItem('jwt', jwt);
            var usuario = user;
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
            return usuario;
        };

        function currentUser() {
            return JSON.parse(sessionStorage.getItem('usuario'));
        };

        function setCredenciales(credenciales) {
            $window.localStorage['credenciales'] = JSON.stringify(credenciales);
        }

        function getCredenciales() {
            return JSON.parse($window.localStorage['credenciales'] || false);
        }

        function destroyCredenciales() {
            $window.localStorage.removeItem('credenciales');
        }

    }
})();