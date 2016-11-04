/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';
    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

            $httpProvider.interceptors.push('authInterceptor');
            // Enable cross domain calls
            $httpProvider.defaults.useXDomain = true;

            // Remove the header used to identify ajax call  that would prevent CORS from working
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $ionicConfigProvider.navBar.alignTitle('center');

            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/login');

            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        })
})();
