/**
 * Created by jose on 4/11/16.
 */
(function () {
    'use strict';

    angular
        .module('auth')
        .factory('authInterceptor', factory);

    function factory($rootScope, $timeout, $q, $location) {
        return {
            request: function (config) {
                var currentRequests = [];
                delete $rootScope.errorKey;

                config.headers = config.headers || {};
                config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('jwt');

                if (!/\.html/.test(config.url)) {
                    var defer = $q.defer();
                    currentRequests.push(defer);
                    config.timeout = defer.promise;
                }

                return config;
            },
            responseError: function (response) {
                var status = response.status;

                // unauthorized -> redirect
                if (status === 401) {

                    $rootScope.error = 'global.server_errors.unauthorized';
                    $timeout(function () {
                        $location.path('/login');
                    }, 3000);

                } else if (status !== 0) {
                    $rootScope.showErrorMsg = true; // general error message
                    $timeout(function () {
                        $rootScope.showErrorMsg = false;
                    }, 10000);
                }
                return $q.reject(response);
            }
        };
    }
})();
