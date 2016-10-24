/**
 * Created by jose on 24/10/16.
 */
(function () {
    'use strict';

    angular
        .module('pagos', [])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state('pagos-realizados', {
                url: '/pagos-realizados',
                templateUrl: 'app/pagos/pagos-realizados.html',
                controller: 'PagosCtrl'
            })
    }
})();
