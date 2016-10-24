(function () {
    'use strict';

    angular
        .module('giros')
        .controller('GiroCtrl', GiroCtrl);

    function GiroCtrl($scope, $location, GirosService, $rootScope, $ionicLoading, NotificacionService) {

        $scope.$on('$ionicView.enter', function () {
            $scope.mostrarAdvertencia = false;
            $ionicLoading.show();
            $scope.listaGiros = [];
            $scope.giro = {};

            GirosService.getAll($rootScope.placa).then(
                function (respuesta) {
                    $scope.listaGiros = respuesta.data;
                    if ($scope.listaGiros.length == 0)
                        $scope.mostrarAdvertencia = true;
                    else
                        $scope.mostrarAdvertencia = false;
                    $ionicLoading.hide();
                }, function (error) {
                    $scope.mostrarAdvertencia = false;
                    console.log(error);
                    $ionicLoading.hide();
                }
            );
        });

        $scope.recogerGiros = function (giro) {
            $rootScope.infoPasajeroEncomienda = giro;
            $rootScope.bandera = "giro";
            var data = {
                "identificacion": giro.ide_remitente,
                "tipo": "giro"
            };
            NotificacionService.EnviarNotificacionGiro(data).then(
                function (respuesta) {
                    console.log(respuesta)
                }, function (error) {
                    console.log(error);
                }
            );
            $location.path("ubicacion-pasajeros");
        }

        $scope.volver = function () {
            $location.path("app/home");
        }
    }

})();