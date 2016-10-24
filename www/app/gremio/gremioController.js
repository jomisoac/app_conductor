(function () {
    'use strict';

    angular
        .module('gremio')
        .controller('GremioCtrl', GremioCtrl);

    function GremioCtrl($scope, $rootScope, ConductorService, $ionicLoading, $window) {
        $ionicLoading.show();
        $scope.listaConductores = [];

        $scope.$on('$ionicView.enter', function () {
            ConductorService.getAll(sessionStorage.getItem('idGremio')).then(
                function (respuesta) {
                    $scope.listaConductores = respuesta.data.data[0].conductores;
                    $ionicLoading.hide();
                }, function (error) {
                    console.log(error);
                    $ionicLoading.hide();
                }
            );
        });
    }

})();